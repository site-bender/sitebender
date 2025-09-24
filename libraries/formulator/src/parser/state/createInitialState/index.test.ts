import { assertEquals } from "@std/assert"

import type { Token } from "../../../types/index.ts"

import createInitialState from "./index.ts"

Deno.test("createInitialState - creates state with empty token array", () => {
	const tokens: Token[] = []
	const result = createInitialState(tokens)

	assertEquals(result.tokens, [])
	assertEquals(result.position, 0)
})

Deno.test("createInitialState - creates state with single token", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "42", position: 0 },
	]
	const result = createInitialState(tokens)

	assertEquals(result.tokens, tokens)
	assertEquals(result.position, 0)
})

Deno.test("createInitialState - creates state with multiple tokens", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "x", position: 0 },
		{ type: "PLUS", value: "+", position: 2 },
		{ type: "NUMBER", value: "1", position: 4 },
	]
	const result = createInitialState(tokens)

	assertEquals(result.tokens, tokens)
	assertEquals(result.position, 0)
})

Deno.test("createInitialState - preserves token immutability", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "123", position: 0 },
		{ type: "EOF", value: "", position: 3 },
	]
	const result = createInitialState(tokens)

	// Result should reference same array (no copying needed for readonly)
	assertEquals(result.tokens, tokens)
	assertEquals(result.tokens === tokens, true)
})

Deno.test("createInitialState - always starts at position 0", () => {
	const tokens1: Token[] = [{ type: "NUMBER", value: "1", position: 0 }]
	const tokens2: Token[] = [
		{ type: "IDENTIFIER", value: "a", position: 5 },
		{ type: "MULTIPLY", value: "*", position: 10 },
		{ type: "IDENTIFIER", value: "b", position: 15 },
	]

	assertEquals(createInitialState(tokens1).position, 0)
	assertEquals(createInitialState(tokens2).position, 0)
})

Deno.test("createInitialState - handles various token types", () => {
	const tokens: Token[] = [
		{ type: "LEFT_PAREN", value: "(", position: 0 },
		{ type: "IDENTIFIER", value: "func", position: 1 },
		{ type: "RIGHT_PAREN", value: ")", position: 5 },
		{ type: "QUESTION", value: "?", position: 6 },
		{ type: "NUMBER", value: "3.14", position: 8 },
		{ type: "COLON", value: ":", position: 12 },
		{ type: "IDENTIFIER", value: "default", position: 14 },
	]

	const result = createInitialState(tokens)
	assertEquals(result.tokens.length, 7)
	assertEquals(result.position, 0)
})
