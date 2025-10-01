import { assertEquals } from "@std/assert"

import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import parseExpressionState from "../parseExpressionState/index.ts"
import parseConditionalExpressionState from "./index.ts"

Deno.test("parseConditionalExpressionState - parses simple conditional", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "GREATER_THAN", value: ">", position: 2 },
			{ type: "NUMBER", value: "5", position: 4 },
			{ type: "QUESTION", value: "?", position: 6 },
			{ type: "IDENTIFIER", value: "x", position: 8 },
			{ type: "COLON", value: ":", position: 10 },
			{ type: "IDENTIFIER", value: "y", position: 12 },
			{ type: "EOF", value: "", position: 13 },
		],
		position: 0,
	}

	const result = evalState(
		parseConditionalExpressionState(parseExpressionState),
	)(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Conditional",
			condition: {
				type: "Comparison",
				operator: ">",
				left: { type: "Variable", name: "a" },
				right: { type: "Number", value: 5 },
			},
			ifTrue: { type: "Variable", name: "x" },
			ifFalse: { type: "Variable", name: "y" },
		},
	})
})

Deno.test("parseConditionalExpressionState - handles nested conditionals (right-associative)", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "GREATER_THAN", value: ">", position: 2 },
			{ type: "NUMBER", value: "0", position: 4 },
			{ type: "QUESTION", value: "?", position: 6 },
			{ type: "IDENTIFIER", value: "x", position: 8 },
			{ type: "COLON", value: ":", position: 10 },
			{ type: "IDENTIFIER", value: "b", position: 12 },
			{ type: "GREATER_THAN", value: ">", position: 14 },
			{ type: "NUMBER", value: "0", position: 16 },
			{ type: "QUESTION", value: "?", position: 18 },
			{ type: "IDENTIFIER", value: "y", position: 20 },
			{ type: "COLON", value: ":", position: 22 },
			{ type: "IDENTIFIER", value: "z", position: 24 },
			{ type: "EOF", value: "", position: 25 },
		],
		position: 0,
	}

	const result = evalState(
		parseConditionalExpressionState(parseExpressionState),
	)(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Conditional",
			condition: {
				type: "Comparison",
				operator: ">",
				left: { type: "Variable", name: "a" },
				right: { type: "Number", value: 0 },
			},
			ifTrue: { type: "Variable", name: "x" },
			ifFalse: {
				type: "Conditional",
				condition: {
					type: "Comparison",
					operator: ">",
					left: { type: "Variable", name: "b" },
					right: { type: "Number", value: 0 },
				},
				ifTrue: { type: "Variable", name: "y" },
				ifFalse: { type: "Variable", name: "z" },
			},
		},
	})
})

Deno.test("parseConditionalExpressionState - complex expressions in branches", () => {
	const state: ParserState = {
		tokens: [
			{ type: "LEFT_PAREN", value: "(", position: 0 },
			{ type: "IDENTIFIER", value: "a", position: 1 },
			{ type: "PLUS", value: "+", position: 3 },
			{ type: "IDENTIFIER", value: "b", position: 5 },
			{ type: "RIGHT_PAREN", value: ")", position: 6 },
			{ type: "GREATER_THAN", value: ">", position: 8 },
			{ type: "LEFT_PAREN", value: "(", position: 10 },
			{ type: "IDENTIFIER", value: "c", position: 11 },
			{ type: "PLUS", value: "+", position: 13 },
			{ type: "IDENTIFIER", value: "d", position: 15 },
			{ type: "RIGHT_PAREN", value: ")", position: 16 },
			{ type: "QUESTION", value: "?", position: 18 },
			{ type: "IDENTIFIER", value: "x", position: 20 },
			{ type: "MULTIPLY", value: "*", position: 22 },
			{ type: "NUMBER", value: "2", position: 24 },
			{ type: "COLON", value: ":", position: 26 },
			{ type: "IDENTIFIER", value: "y", position: 28 },
			{ type: "DIVIDE", value: "/", position: 30 },
			{ type: "NUMBER", value: "2", position: 32 },
			{ type: "EOF", value: "", position: 33 },
		],
		position: 0,
	}

	const result = evalState(
		parseConditionalExpressionState(parseExpressionState),
	)(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Conditional",
			condition: {
				type: "Comparison",
				operator: ">",
				left: {
					type: "BinaryOp",
					operator: "+",
					left: { type: "Variable", name: "a" },
					right: { type: "Variable", name: "b" },
				},
				right: {
					type: "BinaryOp",
					operator: "+",
					left: { type: "Variable", name: "c" },
					right: { type: "Variable", name: "d" },
				},
			},
			ifTrue: {
				type: "BinaryOp",
				operator: "*",
				left: { type: "Variable", name: "x" },
				right: { type: "Number", value: 2 },
			},
			ifFalse: {
				type: "BinaryOp",
				operator: "/",
				left: { type: "Variable", name: "y" },
				right: { type: "Number", value: 2 },
			},
		},
	})
})

Deno.test("parseConditionalExpressionState - falls through when no ternary operator", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "EOF", value: "", position: 5 },
		],
		position: 0,
	}

	const result = evalState(
		parseConditionalExpressionState(parseExpressionState),
	)(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "+",
			left: { type: "Variable", name: "a" },
			right: { type: "Variable", name: "b" },
		},
	})
})

Deno.test("parseConditionalExpressionState - returns error for missing colon", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "GREATER_THAN", value: ">", position: 2 },
			{ type: "NUMBER", value: "5", position: 4 },
			{ type: "QUESTION", value: "?", position: 6 },
			{ type: "IDENTIFIER", value: "x", position: 8 },
			{ type: "EOF", value: "", position: 9 },
		],
		position: 0,
	}

	const result = evalState(
		parseConditionalExpressionState(parseExpressionState),
	)(state)
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(
			result.left.message,
			"Expected ':' in conditional expression, found ''",
		)
		assertEquals(result.left.expected, ":")
	}
})

Deno.test("parseConditionalExpressionState - returns error for invalid condition", () => {
	const state: ParserState = {
		tokens: [
			{ type: "RIGHT_PAREN", value: ")", position: 0 },
			{ type: "QUESTION", value: "?", position: 1 },
			{ type: "IDENTIFIER", value: "x", position: 3 },
			{ type: "COLON", value: ":", position: 5 },
			{ type: "IDENTIFIER", value: "y", position: 7 },
			{ type: "EOF", value: "", position: 8 },
		],
		position: 0,
	}

	const result = evalState(
		parseConditionalExpressionState(parseExpressionState),
	)(state)
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.expected, "number, variable, or '('")
	}
})
