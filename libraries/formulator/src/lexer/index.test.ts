import { assertEquals } from "@std/assert"
import fc from "fast-check"

import lexer from "./index.ts"

Deno.test("lexer - yields tokens for simple string", () => {
	const tokens = Array.from(lexer("abc"))

	assertEquals(tokens.length, 3)
	assertEquals(tokens[0].character, "a")
	assertEquals(tokens[0].position, 0)
	assertEquals(tokens[1].character, "b")
	assertEquals(tokens[1].position, 1)
	assertEquals(tokens[2].character, "c")
	assertEquals(tokens[2].position, 2)
})

Deno.test("lexer - classifies digits correctly", () => {
	const tokens = Array.from(lexer("123"))

	assertEquals(tokens[0].characterClass._tag, "digit")
	assertEquals(tokens[1].characterClass._tag, "digit")
	assertEquals(tokens[2].characterClass._tag, "digit")
	tokens.forEach((token, i) => {
		assertEquals(token.position, i)
	})
})

Deno.test("lexer - classifies lowercase letters correctly", () => {
	const tokens = Array.from(lexer("abc"))

	tokens.forEach((token, i) => {
		assertEquals(token.characterClass._tag, "letter")
		assertEquals(token.position, i)
	})
})

Deno.test("lexer - classifies uppercase letters correctly", () => {
	const tokens = Array.from(lexer("ABC"))

	tokens.forEach((token, i) => {
		assertEquals(token.characterClass._tag, "Letter")
		assertEquals(token.position, i)
	})
})

Deno.test("lexer - classifies whitespace correctly", () => {
	const tokens = Array.from(lexer(" \t\n"))

	tokens.forEach((token) => {
		assertEquals(token.characterClass._tag, "whitespace")
	})
})

Deno.test("lexer - classifies operators correctly", () => {
	const tokens = Array.from(lexer("+*-/"))

	assertEquals(tokens[0].characterClass, { _tag: "plus", character: "+" })
	assertEquals(tokens[1].characterClass, { _tag: "multiply", character: "*" })
	assertEquals(tokens[2].characterClass, { _tag: "minus", character: "-" })
	assertEquals(tokens[3].characterClass, { _tag: "divide", character: "/" })
})

Deno.test("lexer - classifies parentheses correctly", () => {
	const tokens = Array.from(lexer("()"))

	assertEquals(tokens[0].characterClass, { _tag: "leftParen", character: "(" })
	assertEquals(tokens[1].characterClass, { _tag: "rightParen", character: ")" })
})

Deno.test("lexer - handles empty string", () => {
	const tokens = Array.from(lexer(""))

	assertEquals(tokens.length, 0)
})

Deno.test("lexer - handles mixed content", () => {
	const tokens = Array.from(lexer("a1+"))

	assertEquals(tokens.length, 3)
	assertEquals(tokens[0].characterClass._tag, "letter")
	assertEquals(tokens[1].characterClass._tag, "digit")
	assertEquals(tokens[2].characterClass._tag, "plus")
})

Deno.test("lexer - handles Greek lowercase letters", () => {
	const tokens = Array.from(lexer("αβγ"))

	assertEquals(tokens.length, 3)
	assertEquals(tokens[0].characterClass._tag, "alpha")
	assertEquals(tokens[1].characterClass._tag, "beta")
	assertEquals(tokens[2].characterClass._tag, "gamma")
})

Deno.test("lexer - handles Greek uppercase letters", () => {
	const tokens = Array.from(lexer("ΑΒΓ"))

	assertEquals(tokens.length, 3)
	assertEquals(tokens[0].characterClass._tag, "Alpha")
	assertEquals(tokens[1].characterClass._tag, "Beta")
	assertEquals(tokens[2].characterClass._tag, "Gamma")
})

Deno.test("lexer - handles Unicode operators", () => {
	const tokens = Array.from(lexer("×÷"))

	assertEquals(tokens.length, 2)
	assertEquals(tokens[0].characterClass, { _tag: "multiply", character: "×" })
	assertEquals(tokens[1].characterClass, { _tag: "divide", character: "÷" })
})

Deno.test("lexer - classifies unknown characters", () => {
	const tokens = Array.from(lexer("@#$"))

	tokens.forEach((token) => {
		assertEquals(token.characterClass._tag, "unknown")
	})
})

Deno.test("lexer - property: output length equals input length", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 0, maxLength: 100 }),
			(str: string) => {
				const tokens = Array.from(lexer(str))
				return tokens.length === str.length
			},
		),
	)
})

Deno.test("lexer - property: positions are sequential", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 1, maxLength: 100 }),
			(str: string) => {
				const tokens = Array.from(lexer(str))
				return tokens.every((token, i) => token.position === i)
			},
		),
	)
})

Deno.test("lexer - property: chars match input", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 0, maxLength: 100 }),
			(str: string) => {
				const tokens = Array.from(lexer(str))
				return tokens.every((token, i) => token.character === str[i])
			},
		),
	)
})

Deno.test("lexer - property: deterministic", () => {
	fc.assert(
		fc.property(
			fc.string({ minLength: 0, maxLength: 50 }),
			(str: string) => {
				const tokens1 = Array.from(lexer(str))
				const tokens2 = Array.from(lexer(str))

				if (tokens1.length !== tokens2.length) return false

				return tokens1.every((token, i) => {
					const other = tokens2[i]
					return token.character === other.character &&
						token.position === other.position &&
						token.characterClass._tag === other.characterClass._tag
				})
			},
		),
	)
})
