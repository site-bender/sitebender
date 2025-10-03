import { assertEquals } from "@std/assert"

import type { LexerToken } from "../../lexer/types/index.ts"

import parseOperator from "./index.ts"

Deno.test("parseOperator - maps plus", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "+",
		position: 0,
		characterClass: Object.freeze({ _tag: "plus", character: "+" }),
	})

	const result = parseOperator(lexerToken)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "plus")
		assertEquals(result.value.value, "+")
		assertEquals(result.value.position, 0)
	}
})

Deno.test("parseOperator - maps minus", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "-",
		position: 2,
		characterClass: Object.freeze({ _tag: "minus", character: "-" }),
	})

	const result = parseOperator(lexerToken)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "minus")
		assertEquals(result.value.value, "-")
		assertEquals(result.value.position, 2)
	}
})

Deno.test("parseOperator - maps multiply", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "×",
		position: 4,
		characterClass: Object.freeze({ _tag: "multiply", character: "×" }),
	})

	const result = parseOperator(lexerToken)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value.type, "multiply")
		assertEquals(result.value.value, "×")
	}
})

Deno.test("parseOperator - maps divide", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "/",
		position: 0,
		characterClass: Object.freeze({ _tag: "divide", character: "/" }),
	})

	const result = parseOperator(lexerToken)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		assertEquals(result.value.type, "divide")
	}
})

Deno.test("parseOperator - maps power", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "^",
		position: 0,
		characterClass: Object.freeze({ _tag: "power", character: "^" }),
	})

	const result = parseOperator(lexerToken)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		assertEquals(result.value.type, "power")
	}
})

Deno.test("parseOperator - returns error for non-operator", () => {
	const lexerToken: LexerToken = Object.freeze({
		character: "a",
		position: 0,
		characterClass: Object.freeze({ _tag: "letter", character: "a" }),
	})

	const result = parseOperator(lexerToken)

	assertEquals(result._tag, "Error")

	if (result._tag === "Error") {
		assertEquals(result.error.includes("not an operator"), true)
	}
})
