import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import tokenize from "../../../src/tokenizer/index.ts"

Deno.test("tokenize - tokenizes integers", () => {
	const result = tokenize("42")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value
		assertEquals(tokens.length, 2) // number + EOF
		assertEquals(tokens[0], {
			type: "NUMBER",
			value: "42",
			position: 0,
		})
		assertEquals(tokens[1].type, "EOF")
	}
})

Deno.test("tokenize - tokenizes decimals", () => {
	const result = tokenize("3.14159")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value
		assertEquals(tokens[0], {
			type: "NUMBER",
			value: "3.14159",
			position: 0,
		})
	}
})

Deno.test("tokenize - tokenizes multiple numbers", () => {
	const result = tokenize("1 2 3")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens.length, 3)
		assertEquals(tokens[0].value, "1")
		assertEquals(tokens[1].value, "2")
		assertEquals(tokens[2].value, "3")
	}
})

Deno.test("tokenize - tokenizes simple variables", () => {
	const result = tokenize("x")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value
		assertEquals(tokens[0], {
			type: "IDENTIFIER",
			value: "x",
			position: 0,
		})
	}
})

Deno.test("tokenize - tokenizes multi-character variables", () => {
	const result = tokenize("radius")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value
		assertEquals(tokens[0], {
			type: "IDENTIFIER",
			value: "radius",
			position: 0,
		})
	}
})

Deno.test("tokenize - tokenizes variables with underscores and numbers", () => {
	const result = tokenize("var_1 test2 x_y_z")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens[0].value, "var_1")
		assertEquals(tokens[1].value, "test2")
		assertEquals(tokens[2].value, "x_y_z")
	}
})

Deno.test("tokenize - tokenizes arithmetic operators", () => {
	const result = tokenize("+ - * / ^")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens[0].type, "PLUS")
		assertEquals(tokens[1].type, "MINUS")
		assertEquals(tokens[2].type, "MULTIPLY")
		assertEquals(tokens[3].type, "DIVIDE")
		assertEquals(tokens[4].type, "POWER")
	}
})

Deno.test("tokenize - tokenizes operators without spaces", () => {
	const result = tokenize("+-*/^")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens.length, 5)
		assertEquals(tokens[0].type, "PLUS")
		assertEquals(tokens[1].type, "MINUS")
		assertEquals(tokens[2].type, "MULTIPLY")
		assertEquals(tokens[3].type, "DIVIDE")
		assertEquals(tokens[4].type, "POWER")
	}
})

Deno.test("tokenize - tokenizes parentheses", () => {
	const result = tokenize("()")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens[0].type, "LEFT_PAREN")
		assertEquals(tokens[1].type, "RIGHT_PAREN")
	}
})

Deno.test("tokenize - tokenizes nested parentheses", () => {
	const result = tokenize("((()))")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens.length, 6)
		assertEquals(tokens.filter((t) => t.type === "LEFT_PAREN").length, 3)
		assertEquals(tokens.filter((t) => t.type === "RIGHT_PAREN").length, 3)
	}
})

Deno.test("tokenize - tokenizes a simple expression", () => {
	const result = tokenize("a + b")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens.length, 3)
		assertEquals(tokens[0], {
			type: "IDENTIFIER",
			value: "a",
			position: 0,
		})
		assertEquals(tokens[1], {
			type: "PLUS",
			value: "+",
			position: 2,
		})
		assertEquals(tokens[2], {
			type: "IDENTIFIER",
			value: "b",
			position: 4,
		})
	}
})

Deno.test("tokenize - tokenizes a complex expression", () => {
	const result = tokenize("(a + b) * (c - d) / e")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		const types = tokens.map((t) => t.type)
		assertEquals(types, [
			"LEFT_PAREN",
			"IDENTIFIER",
			"PLUS",
			"IDENTIFIER",
			"RIGHT_PAREN",
			"MULTIPLY",
			"LEFT_PAREN",
			"IDENTIFIER",
			"MINUS",
			"IDENTIFIER",
			"RIGHT_PAREN",
			"DIVIDE",
			"IDENTIFIER",
		])
	}
})

Deno.test("tokenize - tokenizes the example formula", () => {
	const result = tokenize("(a / b) + (c / d)")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		const types = tokens.map((t) => t.type)
		assertEquals(types, [
			"LEFT_PAREN",
			"IDENTIFIER",
			"DIVIDE",
			"IDENTIFIER",
			"RIGHT_PAREN",
			"PLUS",
			"LEFT_PAREN",
			"IDENTIFIER",
			"DIVIDE",
			"IDENTIFIER",
			"RIGHT_PAREN",
		])
	}
})

Deno.test("tokenize - handles various whitespace", () => {
	const result = tokenize("  a   +   b  ")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens.length, 3)
		assertEquals(tokens[0].value, "a")
		assertEquals(tokens[1].value, "+")
		assertEquals(tokens[2].value, "b")
	}
})

Deno.test("tokenize - handles tabs and newlines", () => {
	const result = tokenize("a\t+\nb")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens.length, 3)
		assertEquals(tokens[0].value, "a")
		assertEquals(tokens[1].value, "+")
		assertEquals(tokens[2].value, "b")
	}
})

Deno.test("tokenize - tracks token positions correctly", () => {
	const result = tokenize("ab + cd")

	assertEquals(result.ok, true)
	if (result.ok) {
		const tokens = result.value.filter((t) => t.type !== "EOF")
		assertEquals(tokens[0].position, 0) // ab
		assertEquals(tokens[1].position, 3) // +
		assertEquals(tokens[2].position, 5) // cd
	}
})

Deno.test("tokenize - reports invalid characters", () => {
	const result = tokenize("a & b")

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("&"), true)
		assertEquals(result.error.position, 2)
	}
})

Deno.test("tokenize - reports invalid number formats", () => {
	const result = tokenize("3.14.159")

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes(".159"), true)
	}
})