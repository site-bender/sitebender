import { assertEquals } from "@std/assert"

import type { LexerToken } from "../../lexer/types/index.ts"

import parsePunctuation from "./index.ts"

Deno.test("parsePunctuation - maps left paren", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "(",
		position: 0,
		characterClass: Object.freeze({ _tag: "leftParen", character: "(" }),
	})

	const result = parsePunctuation(lexerToken)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "leftParen")
		assertEquals(result.value.value, "(")
		assertEquals(result.value.position, 0)
	}
})

Deno.test("parsePunctuation - maps right paren", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: ")",
		position: 5,
		characterClass: Object.freeze({ _tag: "rightParen", character: ")" }),
	})

	const result = parsePunctuation(lexerToken)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "rightParen")
		assertEquals(result.value.value, ")")
		assertEquals(result.value.position, 5)
	}
})

Deno.test("parsePunctuation - returns error for non-punctuation", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "a",
		position: 0,
		characterClass: Object.freeze({ _tag: "letter", character: "a" }),
	})

	const result = parsePunctuation(lexerToken)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.includes("not punctuation"), true)
	}
})
