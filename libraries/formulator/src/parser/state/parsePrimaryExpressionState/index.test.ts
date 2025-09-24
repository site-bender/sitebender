import { assertEquals } from "@std/assert"

import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import parsePrimaryExpressionState from "./index.ts"

Deno.test("parsePrimaryExpressionState - parses number literals", () => {
	const state: ParserState = {
		tokens: [
			{ type: "NUMBER", value: "42", position: 0 },
			{ type: "EOF", value: "", position: 2 },
		],
		position: 0,
	}

	const result = evalState(parsePrimaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Number",
			value: 42,
		},
	})
})

Deno.test("parsePrimaryExpressionState - parses decimal numbers", () => {
	const state: ParserState = {
		tokens: [
			{ type: "NUMBER", value: "3.14159", position: 0 },
			{ type: "EOF", value: "", position: 7 },
		],
		position: 0,
	}

	const result = evalState(parsePrimaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Number",
			value: 3.14159,
		},
	})
})

Deno.test("parsePrimaryExpressionState - parses variable identifiers", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "myVar", position: 0 },
			{ type: "EOF", value: "", position: 5 },
		],
		position: 0,
	}

	const result = evalState(parsePrimaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Variable",
			name: "myVar",
		},
	})
})

Deno.test("parsePrimaryExpressionState - parses parenthesized expressions", () => {
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

	const result = evalState(parsePrimaryExpressionState(mockParseExpression))(
		state,
	)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Variable",
			name: "x",
		},
	})
})

Deno.test("parsePrimaryExpressionState - returns error for missing closing parenthesis", () => {
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

	const result = evalState(parsePrimaryExpressionState(mockParseExpression))(
		state,
	) as Result<AstNode, ParseError>
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(
			result.left.message.includes("Missing closing parenthesis"),
			true,
		)
		assertEquals(result.left.expected, ")")
	}
})

Deno.test("parsePrimaryExpressionState - returns error for unexpected tokens", () => {
	const state: ParserState = {
		tokens: [
			{ type: "PLUS", value: "+", position: 0 },
			{ type: "EOF", value: "", position: 1 },
		],
		position: 0,
	}

	const result = evalState(parsePrimaryExpressionState())(state) as Result<
		AstNode,
		ParseError
	>
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.message.includes("Unexpected token"), true)
		assertEquals(result.left.position, 0)
	}
})

Deno.test("parsePrimaryExpressionState - handles EOF tokens", () => {
	const state: ParserState = {
		tokens: [
			{ type: "EOF", value: "", position: 0 },
		],
		position: 0,
	}

	const result = evalState(parsePrimaryExpressionState())(state) as Result<
		AstNode,
		ParseError
	>
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.message.includes("Unexpected token"), true)
	}
})

Deno.test("parsePrimaryExpressionState - handles nested parentheses", () => {
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
	const parseExpression = (_minPrecedence: number) =>
		parsePrimaryExpressionState(parseExpression)

	const result = evalState(parsePrimaryExpressionState(parseExpression))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Number",
			value: 5,
		},
	})
})
