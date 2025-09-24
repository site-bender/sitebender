import { assertEquals } from "@std/assert"

import type { Token } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import execState from "../../../../../toolsmith/src/monads/state/execState/index.ts"
import expect from "./index.ts"

Deno.test("expect - returns success and advances when token matches", () => {
	const tokens: Token[] = [
		{ type: "LEFT_PAREN", value: "(", position: 0 },
		{ type: "NUMBER", value: "42", position: 1 },
		{ type: "RIGHT_PAREN", value: ")", position: 2 },
	]

	const state: ParserState = {
		tokens,
		position: 0,
	}

	const result = evalState(expect("LEFT_PAREN"))(state)
	assertEquals(result, {
		_tag: "Right",
		right: { type: "LEFT_PAREN", value: "(", position: 0 },
	})

	// Check that position advanced
	const newState = execState(expect("LEFT_PAREN"))(state)
	assertEquals(newState.position, 1)
})

Deno.test("expect - returns error and does not advance when token doesn't match", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "5", position: 0 },
		{ type: "PLUS", value: "+", position: 1 },
	]

	const state: ParserState = {
		tokens,
		position: 0,
	}

	const result = evalState(expect("LEFT_PAREN"))(state)
	assertEquals(result, {
		_tag: "Left",
		left: {
			message: "Expected LEFT_PAREN but found NUMBER",
			position: 0,
			expected: "LEFT_PAREN",
			found: "NUMBER",
		},
	})

	// Position should not advance on error
	const newState = execState(expect("LEFT_PAREN"))(state)
	assertEquals(newState.position, 0)
})

Deno.test("expect - can expect multiple tokens in sequence", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "x", position: 0 },
		{ type: "PLUS", value: "+", position: 2 },
		{ type: "NUMBER", value: "1", position: 4 },
	]

	const initialState: ParserState = {
		tokens,
		position: 0,
	}

	// Expect VARIABLE
	const result1 = evalState(expect("IDENTIFIER"))(initialState)
	assertEquals(result1._tag, "Right")
	if (result1._tag === "Right") {
		assertEquals(result1.right.type, "IDENTIFIER")
	}
	const state1 = execState(expect("IDENTIFIER"))(initialState)

	// Expect PLUS
	const result2 = evalState(expect("PLUS"))(state1)
	assertEquals(result2._tag, "Right")
	if (result2._tag === "Right") {
		assertEquals(result2.right.type, "PLUS")
	}
	const state2 = execState(expect("PLUS"))(state1)

	// Expect NUMBER
	const result3 = evalState(expect("NUMBER"))(state2)
	assertEquals(result3._tag, "Right")
	if (result3._tag === "Right") {
		assertEquals(result3.right.type, "NUMBER")
	}
})

Deno.test("expect - returns error when expecting past end of tokens", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "42", position: 0 },
	]

	const state: ParserState = {
		tokens,
		position: 1, // Past last token
	}

	const result = evalState(expect("PLUS"))(state)
	assertEquals(result, {
		_tag: "Left",
		left: {
			message: "Expected PLUS but reached end of input",
			position: 1,
			expected: "PLUS",
			found: "EOF",
		},
	})
})

Deno.test("expect - can expect EOF token", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "EOF", value: "", position: 1 },
	]

	const state: ParserState = {
		tokens,
		position: 1,
	}

	const result = evalState(expect("EOF"))(state)
	assertEquals(result, {
		_tag: "Right",
		right: { type: "EOF", value: "", position: 1 },
	})

	// EOF should not advance position further
	const newState = execState(expect("EOF"))(state)
	assertEquals(newState.position, 1)
})

Deno.test("expect - handles empty token array", () => {
	const state: ParserState = {
		tokens: [],
		position: 0,
	}

	const result = evalState(expect("NUMBER"))(state)
	assertEquals(result, {
		_tag: "Left",
		left: {
			message: "Expected NUMBER but reached end of input",
			position: 0,
			expected: "NUMBER",
			found: "EOF",
		},
	})

	// Position remains unchanged
	const newState = execState(expect("NUMBER"))(state)
	assertEquals(newState.position, 0)
})

Deno.test("expect - provides detailed error information", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "x", position: 5 },
		{ type: "MULTIPLY", value: "*", position: 7 },
	]

	const state: ParserState = {
		tokens,
		position: 1, // At MULTIPLY
	}

	const result = evalState(expect("DIVIDE"))(state)
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.message, "Expected DIVIDE but found MULTIPLY")
		assertEquals(result.left.position, 7)
		assertEquals(result.left.expected, "DIVIDE")
		assertEquals(result.left.found, "MULTIPLY")
	}
})
