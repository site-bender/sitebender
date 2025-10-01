import { assertEquals } from "@std/assert"

import type { AstNode, ParseError, Result } from "../../../types/index.ts"
import type { ParserState } from "../../types/state/index.ts"

import evalState from "../../../../../toolsmith/src/monads/state/evalState/index.ts"
import parseBinaryExpressionState from "./index.ts"

Deno.test("parseBinaryExpressionState - parses simple addition", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "EOF", value: "", position: 5 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
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

Deno.test("parseBinaryExpressionState - handles precedence - multiplication before addition", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "MULTIPLY", value: "*", position: 6 },
			{ type: "IDENTIFIER", value: "c", position: 8 },
			{ type: "EOF", value: "", position: 9 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "+",
			left: { type: "Variable", name: "a" },
			right: {
				type: "BinaryOp",
				operator: "*",
				left: { type: "Variable", name: "b" },
				right: { type: "Variable", name: "c" },
			},
		},
	})
})

Deno.test("parseBinaryExpressionState - handles left-associative operators", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "MINUS", value: "-", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "MINUS", value: "-", position: 6 },
			{ type: "IDENTIFIER", value: "c", position: 8 },
			{ type: "EOF", value: "", position: 9 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "-",
			left: {
				type: "BinaryOp",
				operator: "-",
				left: { type: "Variable", name: "a" },
				right: { type: "Variable", name: "b" },
			},
			right: { type: "Variable", name: "c" },
		},
	})
})

Deno.test("parseBinaryExpressionState - handles right-associative power operator", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "POWER", value: "^", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "POWER", value: "^", position: 6 },
			{ type: "IDENTIFIER", value: "c", position: 8 },
			{ type: "EOF", value: "", position: 9 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "^",
			left: { type: "Variable", name: "a" },
			right: {
				type: "BinaryOp",
				operator: "^",
				left: { type: "Variable", name: "b" },
				right: { type: "Variable", name: "c" },
			},
		},
	})
})

Deno.test("parseBinaryExpressionState - handles comparison operators", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "x", position: 0 },
			{ type: "GREATER_THAN", value: ">", position: 2 },
			{ type: "NUMBER", value: "5", position: 4 },
			{ type: "EOF", value: "", position: 5 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "Comparison",
			operator: ">",
			left: { type: "Variable", name: "x" },
			right: { type: "Number", value: 5 },
		},
	})
})

Deno.test("parseBinaryExpressionState - respects minimum precedence parameter", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "EOF", value: "", position: 5 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	// With minPrecedence 20, skip addition (precedence 10)
	const result = evalState(parser(20))(state)
	assertEquals(result, {
		_tag: "Right",
		right: { type: "Variable", name: "a" },
	})
})

Deno.test("parseBinaryExpressionState - handles complex mixed precedence expression", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "a", position: 0 },
			{ type: "MULTIPLY", value: "*", position: 2 },
			{ type: "IDENTIFIER", value: "b", position: 4 },
			{ type: "PLUS", value: "+", position: 6 },
			{ type: "IDENTIFIER", value: "c", position: 8 },
			{ type: "MULTIPLY", value: "*", position: 10 },
			{ type: "IDENTIFIER", value: "d", position: 12 },
			{ type: "EOF", value: "", position: 13 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "+",
			left: {
				type: "BinaryOp",
				operator: "*",
				left: { type: "Variable", name: "a" },
				right: { type: "Variable", name: "b" },
			},
			right: {
				type: "BinaryOp",
				operator: "*",
				left: { type: "Variable", name: "c" },
				right: { type: "Variable", name: "d" },
			},
		},
	})
})

Deno.test("parseBinaryExpressionState - returns error for ambiguous operator sequences", () => {
	const state: ParserState = {
		tokens: [
			{ type: "NUMBER", value: "5", position: 0 },
			{ type: "PLUS", value: "+", position: 2 },
			{ type: "PLUS", value: "+", position: 4 },
			{ type: "NUMBER", value: "3", position: 6 },
			{ type: "EOF", value: "", position: 7 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state) as Result<AstNode, ParseError>
	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(
			result.left.message.includes("Ambiguous operator sequence"),
			true,
		)
	}
})

Deno.test("parseBinaryExpressionState - handles unary operators in binary expressions", () => {
	const state: ParserState = {
		tokens: [
			{ type: "MINUS", value: "-", position: 0 },
			{ type: "IDENTIFIER", value: "a", position: 1 },
			{ type: "PLUS", value: "+", position: 3 },
			{ type: "IDENTIFIER", value: "b", position: 5 },
			{ type: "EOF", value: "", position: 6 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "+",
			left: {
				type: "UnaryOp",
				operator: "-",
				operand: { type: "Variable", name: "a" },
			},
			right: { type: "Variable", name: "b" },
		},
	})
})

Deno.test("parseBinaryExpressionState - handles division operator", () => {
	const state: ParserState = {
		tokens: [
			{ type: "IDENTIFIER", value: "x", position: 0 },
			{ type: "DIVIDE", value: "/", position: 2 },
			{ type: "NUMBER", value: "2", position: 4 },
			{ type: "EOF", value: "", position: 5 },
		],
		position: 0,
	}

	const parser = parseBinaryExpressionState()
	const result = evalState(parser(0))(state)
	assertEquals(result, {
		_tag: "Right",
		right: {
			type: "BinaryOp",
			operator: "/",
			left: { type: "Variable", name: "x" },
			right: { type: "Number", value: 2 },
		},
	})
})
