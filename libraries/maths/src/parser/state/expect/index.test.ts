import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import evalState from "../../../../../toolkit/src/monads/state/evalState/index.ts"
import execState from "../../../../../toolkit/src/monads/state/execState/index.ts"
import type { Result, Token } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"
import expect from "./index.ts"

describe("expect", () => {
	it("returns success and advances when token matches", () => {
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
			ok: true,
			value: { type: "LEFT_PAREN", value: "(", position: 0 }
		})
		
		// Check that position advanced
		const newState = execState(expect("LEFT_PAREN"))(state)
		assertEquals(newState.position, 1)
	})
	
	it("returns error and does not advance when token doesn't match", () => {
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
			ok: false,
			error: {
				message: "Expected LEFT_PAREN but found NUMBER",
				position: 0,
				expected: "LEFT_PAREN",
				found: "NUMBER"
			}
		})
		
		// Position should not advance on error
		const newState = execState(expect("LEFT_PAREN"))(state)
		assertEquals(newState.position, 0)
	})
	
	it("can expect multiple tokens in sequence", () => {
		const tokens: Token[] = [
			{ type: "IDENTIFIER", value: "x", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "NUMBER", value: "1", position: 4 },
		]
		
		let state: ParserState = {
			tokens,
			position: 0,
		}
		
		// Expect VARIABLE
		const result1 = evalState(expect("IDENTIFIER"))(state) as Result<Token, never>
		assertEquals(result1.ok, true)
		assertEquals(result1.value.type, "IDENTIFIER")
		state = execState(expect("IDENTIFIER"))(state)
		
		// Expect PLUS
		const result2 = evalState(expect("PLUS"))(state) as Result<Token, never>
		assertEquals(result2.ok, true)
		assertEquals(result2.value.type, "PLUS")
		state = execState(expect("PLUS"))(state)
		
		// Expect NUMBER
		const result3 = evalState(expect("NUMBER"))(state) as Result<Token, never>
		assertEquals(result3.ok, true)
		assertEquals(result3.value.type, "NUMBER")
	})
	
	it("returns error when expecting past end of tokens", () => {
		const tokens: Token[] = [
			{ type: "NUMBER", value: "42", position: 0 },
		]
		
		const state: ParserState = {
			tokens,
			position: 1, // Past last token
		}
		
		const result = evalState(expect("PLUS"))(state)
		assertEquals(result, {
			ok: false,
			error: {
				message: "Expected PLUS but reached end of input",
				position: 1,
				expected: "PLUS",
				found: "EOF"
			}
		})
	})
	
	it("can expect EOF token", () => {
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
			ok: true,
			value: { type: "EOF", value: "", position: 1 }
		})
		
		// EOF should not advance position further
		const newState = execState(expect("EOF"))(state)
		assertEquals(newState.position, 1)
	})
	
	it("handles empty token array", () => {
		const state: ParserState = {
			tokens: [],
			position: 0,
		}
		
		const result = evalState(expect("NUMBER"))(state)
		assertEquals(result, {
			ok: false,
			error: {
				message: "Expected NUMBER but reached end of input",
				position: 0,
				expected: "NUMBER",
				found: "EOF"
			}
		})
		
		// Position remains unchanged
		const newState = execState(expect("NUMBER"))(state)
		assertEquals(newState.position, 0)
	})
	
	it("provides detailed error information", () => {
		const tokens: Token[] = [
			{ type: "IDENTIFIER", value: "x", position: 5 },
			{ type: "MULTIPLY", value: "*", position: 7 },
		]
		
		const state: ParserState = {
			tokens,
			position: 1, // At MULTIPLY
		}
		
		const result = evalState(expect("DIVIDE"))(state)
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error.message, "Expected DIVIDE but found MULTIPLY")
			assertEquals(result.error.position, 7)
			assertEquals(result.error.expected, "DIVIDE")
			assertEquals(result.error.found, "MULTIPLY")
		}
	})
})