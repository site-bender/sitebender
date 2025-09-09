import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import evalState from "../../../../../toolkit/src/monads/state/evalState/index.ts"
import type { Result, AstNode, ParseError } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"
import parsePrimaryExpressionState from "./index.ts"

describe("parsePrimaryExpressionState", () => {
	it("parses number literals", () => {
		const state: ParserState = {
			tokens: [
				{ type: "NUMBER", value: "42", position: 0 },
				{ type: "EOF", value: "", position: 2 },
			],
			position: 0,
		}
		
		const result = evalState(parsePrimaryExpressionState())(state)
		assertEquals(result, {
			ok: true,
			value: {
				type: "Number",
				value: 42,
			},
		})
	})
	
	it("parses decimal numbers", () => {
		const state: ParserState = {
			tokens: [
				{ type: "NUMBER", value: "3.14159", position: 0 },
				{ type: "EOF", value: "", position: 7 },
			],
			position: 0,
		}
		
		const result = evalState(parsePrimaryExpressionState())(state)
		assertEquals(result, {
			ok: true,
			value: {
				type: "Number",
				value: 3.14159,
			},
		})
	})
	
	it("parses variable identifiers", () => {
		const state: ParserState = {
			tokens: [
				{ type: "IDENTIFIER", value: "myVar", position: 0 },
				{ type: "EOF", value: "", position: 5 },
			],
			position: 0,
		}
		
		const result = evalState(parsePrimaryExpressionState())(state)
		assertEquals(result, {
			ok: true,
			value: {
				type: "Variable",
				name: "myVar",
			},
		})
	})
	
	it("parses parenthesized expressions", () => {
		const state: ParserState = {
			tokens: [
				{ type: "LEFT_PAREN", value: "(", position: 0 },
				{ type: "IDENTIFIER", value: "x", position: 1 },
				{ type: "RIGHT_PAREN", value: ")", position: 2 },
				{ type: "EOF", value: "", position: 3 },
			],
			position: 0,
		}
		
		// Mock parseExpression that returns the variable
		const mockParseExpression = (_minPrecedence: number) =>
			parsePrimaryExpressionState()
		
		const result = evalState(parsePrimaryExpressionState(mockParseExpression))(state)
		assertEquals(result, {
			ok: true,
			value: {
				type: "Variable",
				name: "x",
			},
		})
	})
	
	it("returns error for missing closing parenthesis", () => {
		const state: ParserState = {
			tokens: [
				{ type: "LEFT_PAREN", value: "(", position: 0 },
				{ type: "IDENTIFIER", value: "x", position: 1 },
				{ type: "EOF", value: "", position: 2 },
			],
			position: 0,
		}
		
		const mockParseExpression = (_minPrecedence: number) =>
			parsePrimaryExpressionState()
		
		const result = evalState(parsePrimaryExpressionState(mockParseExpression))(state) as Result<AstNode, ParseError>
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error.message.includes("Missing closing parenthesis"), true)
			assertEquals(result.error.expected, ")")
		}
	})
	
	it("returns error for unexpected tokens", () => {
		const state: ParserState = {
			tokens: [
				{ type: "PLUS", value: "+", position: 0 },
				{ type: "EOF", value: "", position: 1 },
			],
			position: 0,
		}
		
		const result = evalState(parsePrimaryExpressionState())(state) as Result<AstNode, ParseError>
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error.message.includes("Unexpected token"), true)
			assertEquals(result.error.position, 0)
		}
	})
	
	it("handles EOF tokens", () => {
		const state: ParserState = {
			tokens: [
				{ type: "EOF", value: "", position: 0 },
			],
			position: 0,
		}
		
		const result = evalState(parsePrimaryExpressionState())(state) as Result<AstNode, ParseError>
		assertEquals(result.ok, false)
		if (!result.ok) {
			assertEquals(result.error.message.includes("Unexpected token"), true)
		}
	})
	
	it("handles nested parentheses", () => {
		const state: ParserState = {
			tokens: [
				{ type: "LEFT_PAREN", value: "(", position: 0 },
				{ type: "LEFT_PAREN", value: "(", position: 1 },
				{ type: "NUMBER", value: "5", position: 2 },
				{ type: "RIGHT_PAREN", value: ")", position: 3 },
				{ type: "RIGHT_PAREN", value: ")", position: 4 },
				{ type: "EOF", value: "", position: 5 },
			],
			position: 0,
		}
		
		// Recursive parseExpression that handles nested parens
		const parseExpression = (minPrecedence: number) =>
			parsePrimaryExpressionState(parseExpression)
		
		const result = evalState(parsePrimaryExpressionState(parseExpression))(state)
		assertEquals(result, {
			ok: true,
			value: {
				type: "Number",
				value: 5,
			},
		})
	})
})