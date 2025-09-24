import { assertEquals } from "@std/assert"

import type { Token } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import currentToken from "./index.ts"

Deno.test("currentToken - returns the token at current position", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "PLUS", value: "+", position: 1 },
		{ type: "NUMBER", value: "2", position: 2 },
	]

	const state: ParserState = {
		tokens,
		position: 1,
	}

	const result = evalState(currentToken())(state)
	assertEquals(result, { type: "PLUS", value: "+", position: 1 })
})

Deno.test("currentToken - returns first token when position is 0", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "42", position: 0 },
		{ type: "EOF", value: "", position: 2 },
	]

	const state: ParserState = {
		tokens,
		position: 0,
	}

	const result = evalState(currentToken())(state)
	assertEquals(result, { type: "NUMBER", value: "42", position: 0 })
})

Deno.test("currentToken - returns EOF when position is beyond token array", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
	]

	const state: ParserState = {
		tokens,
		position: 5, // Beyond array
	}

	const result = evalState(currentToken())(state)
	assertEquals(result, { type: "EOF", value: "", position: 0 })
})

Deno.test("currentToken - returns EOF with position 0 for empty token array", () => {
	const state: ParserState = {
		tokens: [],
		position: 0,
	}

	const result = evalState(currentToken())(state)
	assertEquals(result, { type: "EOF", value: "", position: 0 })
})

Deno.test("currentToken - does not modify the state", async () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "x", position: 0 },
	]

	const initialState: ParserState = {
		tokens,
		position: 0,
	}

	// Use execState to check final state
	const { default: execState } = await import(
		"../../../../../toolsmith/src/monads/state/execState/index.ts"
	)
	const finalState = execState(currentToken())(initialState)

	assertEquals(finalState.position, 0) // Position unchanged
	assertEquals(finalState.tokens, tokens) // Tokens unchanged
})
