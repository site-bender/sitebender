import { assertEquals } from "@std/assert"

import type { Token } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import execState from "../../../../../toolsmith/src/monads/state/execState/index.ts"
import advance from "./index.ts"

Deno.test("advance - returns current token and advances position", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "PLUS", value: "+", position: 1 },
		{ type: "NUMBER", value: "2", position: 2 },
	]

	const state: ParserState = {
		tokens,
		position: 0,
	}

	const result = evalState(advance())(state)
	assertEquals(result, { type: "NUMBER", value: "1", position: 0 })

	// Check that position was advanced
	const newState = execState(advance())(state)
	assertEquals(newState.position, 1)
})

Deno.test("advance - advances through multiple tokens", () => {
	const tokens: Token[] = [
		{ type: "LEFT_PAREN", value: "(", position: 0 },
		{ type: "IDENTIFIER", value: "x", position: 1 },
		{ type: "RIGHT_PAREN", value: ")", position: 2 },
	]

	const initialState: ParserState = {
		tokens,
		position: 0,
	}

	// First advance
	const token1 = evalState(advance())(initialState)
	assertEquals(token1, { type: "LEFT_PAREN", value: "(", position: 0 })
	const state1 = execState(advance())(initialState)
	assertEquals(state1.position, 1)

	// Second advance
	const token2 = evalState(advance())(state1)
	assertEquals(token2, { type: "IDENTIFIER", value: "x", position: 1 })
	const state2 = execState(advance())(state1)
	assertEquals(state2.position, 2)

	// Third advance
	const token3 = evalState(advance())(state2)
	assertEquals(token3, { type: "RIGHT_PAREN", value: ")", position: 2 })
	const state3 = execState(advance())(state2)
	assertEquals(state3.position, 3)
})

Deno.test("advance - returns EOF when advancing past last token", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "42", position: 0 },
	]

	const state: ParserState = {
		tokens,
		position: 1, // Already past last token
	}

	const result = evalState(advance())(state)
	assertEquals(result, { type: "EOF", value: "", position: 0 })

	// Position should not advance further
	const newState = execState(advance())(state)
	assertEquals(newState.position, 1) // Unchanged
})

Deno.test("advance - does not advance when token is EOF", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "EOF", value: "", position: 1 },
	]

	const state: ParserState = {
		tokens,
		position: 1, // At EOF
	}

	const result = evalState(advance())(state)
	assertEquals(result, { type: "EOF", value: "", position: 1 })

	// Should not advance past EOF
	const newState = execState(advance())(state)
	assertEquals(newState.position, 1) // Unchanged
})

Deno.test("advance - handles empty token array", () => {
	const state: ParserState = {
		tokens: [],
		position: 0,
	}

	const result = evalState(advance())(state)
	assertEquals(result, { type: "EOF", value: "", position: 0 })

	const newState = execState(advance())(state)
	assertEquals(newState.position, 0) // No advancement possible
})
