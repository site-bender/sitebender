import { assertEquals } from "@std/assert"

import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import parseExpressionState from "./index.ts"

Deno.test("parseExpressionState - parses simple number", () => {
	const state: ParserState = {
		tokens: [
			{ type: "NUMBER", value: "42", position: 0 },
			{ type: "EOF", value: "", position: 2 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Number",
			value: 42,
		},
	})
})

Deno.test("parseExpressionState - parses simple variable", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "x", position: 0 },
			{ type: "EOF", value: "", position: 1 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Variable",
			name: "x",
		},
	})
})

Deno.test("parseExpressionState - parses binary addition", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "EOF", value: "", position: 5 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
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

Deno.test("parseExpressionState - parses unary negation", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "NUMBER", value: "5", position: 1 },
			{ type: "EOF", value: "", position: 2 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
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

Deno.test("parseExpressionState - handles operator precedence", () => {
	const state: ParserState = {
		tokens: [
			{ type: "NUMBER", value: "2", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "NUMBER", value: "3", position: 4 },
			{ type: "MULTIPLY", value: "*", position: 6 },
			{ type: "NUMBER", value: "4", position: 8 },
			{ type: "EOF", value: "", position: 9 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "+",
			left: { type: "Number", value: 2 },
			right: {
				type: "BinaryOp",
				operator: "*",
				left: { type: "Number", value: 3 },
				right: { type: "Number", value: 4 },
			},
		},
	})
})

Deno.test("parseExpressionState - parses parenthesized expressions", () => {
	const state: ParserState = {
		tokens: [
			{ type: "LEFT_PAREN", value: "(", position: 0 },
			{ type: "IDENTIFIER", value: "a", position: 1 },
			{ type: "PLUS", value: "+", position: 3 },
			{ type: "IDENTIFIER", value: "b", position: 5 },
			{ type: "RIGHT_PAREN", value: ")", position: 6 },
			{ type: "MULTIPLY", value: "*", position: 8 },
			{ type: "IDENTIFIER", value: "c", position: 10 },
			{ type: "EOF", value: "", position: 11 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "*",
			left: {
				type: "BinaryOp",
				operator: "+",
				left: { type: "Variable", name: "a" },
				right: { type: "Variable", name: "b" },
			},
			right: { type: "Variable", name: "c" },
		},
	})
})

Deno.test("parseExpressionState - respects minimum precedence parameter", () => {
	const state: ParserState = {
		tokens: [
			{ type: "NUMBER", value: "1", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "NUMBER", value: "2", position: 4 },
			{ type: "MULTIPLY", value: "*", position: 6 },
			{ type: "NUMBER", value: "3", position: 8 },
			{ type: "EOF", value: "", position: 9 },
		],
		position: 0,
	}

	// With minPrecedence = 20 (higher than multiplication's 15)
	// Should only parse the first number
	const result = evalState(parseExpressionState(20))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Number",
			value: 1,
		},
	})
})

Deno.test("parseExpressionState - handles complex nested expressions", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "LEFT_PAREN", value: "(", position: 1 },
			{ type: "NUMBER", value: "2", position: 2 },
			{ type: "PLUS", value: "+", position: 4 },
			{ type: "NUMBER", value: "3", position: 6 },
			{ type: "RIGHT_PAREN", value: ")", position: 7 },
			{ type: "MULTIPLY", value: "*", position: 9 },
			{ type: "NUMBER", value: "4", position: 11 },
			{ type: "EOF", value: "", position: 12 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "*",
			left: {
				type: "UnaryOp",
				operator: "-",
				operand: {
					type: "BinaryOp",
					operator: "+",
					left: { type: "Number", value: 2 },
					right: { type: "Number", value: 3 },
				},
			},
			right: { type: "Number", value: 4 },
		},
	})
})

Deno.test("parseExpressionState - returns error for invalid tokens", () => {
	const state: ParserState = {
		tokens: [
			{ type: "RIGHT_PAREN", value: ")", position: 0 },
			{ type: "EOF", value: "", position: 1 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.expected, "number, variable, or '('")
	}
})

Deno.test("parseExpressionState - returns error for missing closing parenthesis", () => {
	const state: ParserState = {
		tokens: [
			{ type: "LEFT_PAREN", value: "(", position: 0 },
			{ type: "NUMBER", value: "42", position: 1 },
			{ type: "EOF", value: "", position: 3 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.expected, ")")
	}
})

Deno.test("parseExpressionState - parses conditional expressions", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "x", position: 0 },
			{ type: "GREATER_THAN", value: ">", position: 2 },
			{ type: "NUMBER", value: "0", position: 4 },
			{ type: "QUESTION", value: "?", position: 6 },
			{ type: "NUMBER", value: "1", position: 8 },
			{ type: "COLON", value: ":", position: 10 },
			{ type: "MINUS", value: "-", position: 12 },
			{ type: "NUMBER", value: "1", position: 13 },
			{ type: "EOF", value: "", position: 15 },
		],
		position: 0,
	}

	const result = evalState(parseExpressionState())(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Conditional",
			condition: {
				type: "Comparison",
				operator: ">",
				left: { type: "Variable", name: "x" },
				right: { type: "Number", value: 0 },
			},
			ifTrue: { type: "Number", value: 1 },
			ifFalse: {
				type: "UnaryOp",
				operator: "-",
				operand: { type: "Number", value: 1 },
			},
		},
	})
})
