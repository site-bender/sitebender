import { assertEquals } from "@std/assert"
import fc from "fast-check"

import tokenizer from "./index.ts"

Deno.test("tokenizer - tokenizes simple addition", () => {
	const tokens = Array.from(tokenizer("2 + 3"))

	assertEquals(tokens.length, 3)

	assertEquals(tokens[0]._tag, "Ok")
	if (tokens[0]._tag === "Ok") {
		assertEquals(tokens[0].value.type, "number")
		assertEquals(tokens[0].value.value, "2")
	}

	assertEquals(tokens[1]._tag, "Ok")
	if (tokens[1]._tag === "Ok") {
		assertEquals(tokens[1].value.type, "plus")
	}

	assertEquals(tokens[2]._tag, "Ok")
	if (tokens[2]._tag === "Ok") {
		assertEquals(tokens[2].value.type, "number")
		assertEquals(tokens[2].value.value, "3")
	}
})

Deno.test("tokenizer - tokenizes multiplication", () => {
	const tokens = Array.from(tokenizer("α × 2"))

	assertEquals(tokens.length, 3)

	assertEquals(tokens[0]._tag, "Ok")
	if (tokens[0]._tag === "Ok") {
		assertEquals(tokens[0].value.type, "identifier")
		assertEquals(tokens[0].value.value, "α")
	}

	assertEquals(tokens[1]._tag, "Ok")
	if (tokens[1]._tag === "Ok") {
		assertEquals(tokens[1].value.type, "multiply")
	}

	assertEquals(tokens[2]._tag, "Ok")
	if (tokens[2]._tag === "Ok") {
		assertEquals(tokens[2].value.type, "number")
	}
})

Deno.test("tokenizer - tokenizes function call", () => {
	const tokens = Array.from(tokenizer("sin(x)"))

	assertEquals(tokens.length, 4)

	assertEquals(tokens[0]._tag, "Ok")
	if (tokens[0]._tag === "Ok") {
		assertEquals(tokens[0].value.type, "identifier")
		assertEquals(tokens[0].value.value, "sin")
	}

	assertEquals(tokens[1]._tag, "Ok")
	if (tokens[1]._tag === "Ok") {
		assertEquals(tokens[1].value.type, "leftParen")
	}

	assertEquals(tokens[2]._tag, "Ok")
	if (tokens[2]._tag === "Ok") {
		assertEquals(tokens[2].value.type, "identifier")
		assertEquals(tokens[2].value.value, "x")
	}

	assertEquals(tokens[3]._tag, "Ok")
	if (tokens[3]._tag === "Ok") {
		assertEquals(tokens[3].value.type, "rightParen")
	}
})

Deno.test("tokenizer - maps Greek letter names", () => {
	const tokens = Array.from(tokenizer("alpha + beta"))

	assertEquals(tokens.length, 3)

	assertEquals(tokens[0]._tag, "Ok")
	if (tokens[0]._tag === "Ok") {
		assertEquals(tokens[0].value.value, "α")
	}

	assertEquals(tokens[2]._tag, "Ok")
	if (tokens[2]._tag === "Ok") {
		assertEquals(tokens[2].value.value, "β")
	}
})

Deno.test("tokenizer - maps PI constant", () => {
	const tokens = Array.from(tokenizer("2 * PI"))

	assertEquals(tokens.length, 3)

	assertEquals(tokens[2]._tag, "Ok")
	if (tokens[2]._tag === "Ok") {
		assertEquals(tokens[2].value.type, "identifier")
		assertEquals(tokens[2].value.value, "π")
	}
})

Deno.test("tokenizer - handles decimals", () => {
	const tokens = Array.from(tokenizer("3.14 + 2.71"))

	assertEquals(tokens.length, 3)

	assertEquals(tokens[0]._tag, "Ok")
	if (tokens[0]._tag === "Ok") {
		assertEquals(tokens[0].value.value, "3.14")
	}

	assertEquals(tokens[2]._tag, "Ok")
	if (tokens[2]._tag === "Ok") {
		assertEquals(tokens[2].value.value, "2.71")
	}
})

Deno.test("tokenizer - handles empty input", () => {
	const tokens = Array.from(tokenizer(""))

	assertEquals(tokens.length, 0)
})

Deno.test("tokenizer - skips whitespace", () => {
	const tokens = Array.from(tokenizer("  1   +   2  "))

	assertEquals(tokens.length, 3)
	assertEquals(tokens[0]._tag, "Ok")
	assertEquals(tokens[1]._tag, "Ok")
	assertEquals(tokens[2]._tag, "Ok")
})

Deno.test("tokenizer - property: deterministic", () => {
	fc.assert(
		fc.property(
			fc.string(),
			(input: string) => {
				const tokens1 = Array.from(tokenizer(input))
				const tokens2 = Array.from(tokenizer(input))

				if (tokens1.length !== tokens2.length) return false

				return tokens1.every((token, i) => {
					const other = tokens2[i]
					if (token._tag !== other._tag) return false
					if (token._tag === "Ok" && other._tag === "Ok") {
						return token.value.type === other.value.type &&
							token.value.value === other.value.value &&
							token.value.position === other.value.position
					}
					return true
				})
			},
		),
	)
})
