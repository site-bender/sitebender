import { assertEquals } from "@std/assert"

import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import parseUnaryExpressionState from "./index.ts"

Deno.test("parseUnaryExpressionState - parses negative numbers", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "NUMBER", value: "5", position: 1 },
			{ type: "EOF", value: "", position: 2 },
		],
		position: 0,
	}

	const result = evalState(parseUnaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "UnaryOp",
			operator: "-",
			operand: {
				type: "Number",
				value: 5,
			},
		},
	})
})

Deno.test("parseUnaryExpressionState - parses positive variables", () => {
	const state: ParserState = {
		tokens: [
			{ type: "PLUS", value: "+", position: 0 },
			{ type: "IDENTIFIER", value: "x", position: 1 },
			{ type: "EOF", value: "", position: 2 },
		],
		position: 0,
	}

	const result = evalState(parseUnaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "UnaryOp",
			operator: "+",
			operand: {
				type: "Variable",
				name: "x",
			},
		},
	})
})

Deno.test("parseUnaryExpressionState - parses double negatives", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "MINUS", value: "-", position: 1 },
			{ type: "IDENTIFIER", value: "x", position: 2 },
			{ type: "EOF", value: "", position: 3 },
		],
		position: 0,
	}

	const result = evalState(parseUnaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "UnaryOp",
			operator: "-",
			operand: {
				type: "UnaryOp",
				operator: "-",
				operand: {
					type: "Variable",
					name: "x",
				},
			},
		},
	})
})

Deno.test("parseUnaryExpressionState - parses mixed unary operators", () => {
	const state: ParserState = {
		tokens: [
			{ type: "PLUS", value: "+", position: 0 },
			{ type: "MINUS", value: "-", position: 1 },
			{ type: "NUMBER", value: "3", position: 2 },
			{ type: "EOF", value: "", position: 3 },
		],
		position: 0,
	}

	const result = evalState(parseUnaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "UnaryOp",
			operator: "+",
			operand: {
				type: "UnaryOp",
				operator: "-",
				operand: {
					type: "Number",
					value: 3,
				},
			},
		},
	})
})

Deno.test("parseUnaryExpressionState - passes through primary expressions without unary operators", () => {
	const state: ParserState = {
		tokens: [
			{ type: "NUMBER", value: "42", position: 0 },
			{ type: "EOF", value: "", position: 2 },
		],
		position: 0,
	}

	const result = evalState(parseUnaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Number",
			value: 42,
		},
	})
})

Deno.test("parseUnaryExpressionState - handles unary on parenthesized expressions", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "LEFT_PAREN", value: "(", position: 1 },
			{ type: "IDENTIFIER", value: "a", position: 2 },
			{ type: "RIGHT_PAREN", value: ")", position: 3 },
			{ type: "EOF", value: "", position: 4 },
		],
		position: 0,
	}

	// Mock parseExpression for handling parentheses
	const parseExpression = (_minPrecedence: number) =>
		parseUnaryExpressionState(parseExpression)

	const result = evalState(parseUnaryExpressionState(parseExpression))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "UnaryOp",
			operator: "-",
			operand: {
				type: "Variable",
				name: "a",
			},
		},
	})
})

Deno.test("parseUnaryExpressionState - returns error for invalid operand", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "RIGHT_PAREN", value: ")", position: 1 },
			{ type: "EOF", value: "", position: 2 },
		],
		position: 0,
	}

	const result = evalState(parseUnaryExpressionState())(state) as Result<
		AstNode,
		ParseError
	>
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.message.includes("Unexpected token"), true)
	}
})

Deno.test("parseUnaryExpressionState - handles triple nested unary operators", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "PLUS", value: "+", position: 1 },
			{ type: "MINUS", value: "-", position: 2 },
			{ type: "NUMBER", value: "7", position: 3 },
			{ type: "EOF", value: "", position: 4 },
		],
		position: 0,
	}

	const result = evalState(parseUnaryExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "UnaryOp",
			operator: "-",
			operand: {
				type: "UnaryOp",
				operator: "+",
				operand: {
					type: "UnaryOp",
					operator: "-",
					operand: {
						type: "Number",
						value: 7,
					},
				},
			},
		},
	})
})
