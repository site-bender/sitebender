import { assertEquals } from "@std/assert"

import type { Token } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import execState from "../../../../../toolsmith/src/monads/state/execState/index.ts"
import peek from "./index.ts"

Deno.test("peek - looks ahead one token by default", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "PLUS", value: "+", position: 1 },
		{ type: "NUMBER", value: "2", position: 2 },
	]

	const state: ParserState = {
		tokens,
		position: 0,
	}

	const result = evalState(peek())(state)
	assertEquals(result, { type: "PLUS", value: "+", position: 1 })
})

Deno.test("peek - looks ahead multiple tokens with offset", () => {
	const tokens: Token[] = [
		{ type: "LEFT_PAREN", value: "(", position: 0 },
		{ type: "IDENTIFIER", value: "x", position: 1 },
		{ type: "PLUS", value: "+", position: 2 },
		{ type: "NUMBER", value: "3", position: 3 },
		{ type: "RIGHT_PAREN", value: ")", position: 4 },
	]

	const state: ParserState = {
		tokens,
		position: 1, // At 'x'
	}

	// Peek 1 ahead
	assertEquals(evalState(peek(1))(state), {
		type: "PLUS",
		value: "+",
		position: 2,
	})

	// Peek 2 ahead
	assertEquals(evalState(peek(2))(state), {
		type: "NUMBER",
		value: "3",
		position: 3,
	})

	// Peek 3 ahead
	assertEquals(evalState(peek(3))(state), {
		type: "RIGHT_PAREN",
		value: ")",
		position: 4,
	})
})

Deno.test("peek - returns EOF when peeking past end", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "42", position: 0 },
		{ type: "MULTIPLY", value: "*", position: 2 },
	]

	const state: ParserState = {
		tokens,
		position: 1, // At MULTIPLY
	}

	// Peek beyond array
	const result = evalState(peek(5))(state)
	assertEquals(result, { type: "EOF", value: "", position: 2 })
})

Deno.test("peek - does not modify state position", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "a", position: 0 },
		{ type: "DIVIDE", value: "/", position: 1 },
		{ type: "IDENTIFIER", value: "b", position: 2 },
	]

	const initialState: ParserState = {
		tokens,
		position: 0,
	}

	// Peek multiple times
	evalState(peek())(initialState)
	evalState(peek(2))(initialState)
	evalState(peek(10))(initialState)

	// State should remain unchanged
	const finalState = execState(peek())(initialState)
	assertEquals(finalState.position, 0)
	assertEquals(finalState.tokens, tokens)
})

Deno.test("peek - handles peeking from EOF position", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "EOF", value: "", position: 1 },
	]

	const state: ParserState = {
		tokens,
		position: 1, // At EOF
	}

	const result = evalState(peek())(state)
	assertEquals(result, { type: "EOF", value: "", position: 1 })
})

Deno.test("peek - handles empty token array", () => {
	const state: ParserState = {
		tokens: [],
		position: 0,
	}

	const result = evalState(peek())(state)
	assertEquals(result, { type: "EOF", value: "", position: 0 })

	const result2 = evalState(peek(10))(state)
	assertEquals(result2, { type: "EOF", value: "", position: 0 })
})

Deno.test("peek - can peek at current position with offset 0", () => {
	const tokens: Token[] = [
		{ type: "MINUS", value: "-", position: 0 },
		{ type: "NUMBER", value: "5", position: 1 },
	]

	const state: ParserState = {
		tokens,
		position: 0,
	}

	// Peek 0 should return current token
	const result = evalState(peek(0))(state)
	assertEquals(result, { type: "MINUS", value: "-", position: 0 })
})
