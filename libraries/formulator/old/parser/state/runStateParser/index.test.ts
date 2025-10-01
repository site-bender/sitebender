import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts"
import { assertObjectMatch } from "https://deno.land/std@0.224.0/assert/assert_object_match.ts"

import type { Token } from "../../../types/index.ts"

import runStateParser from "./index.ts"

Deno.test("runStateParser - parses a simple number", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "42", position: 0 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
			type: "Number",
			value: 42,
		})
	}
})

Deno.test("runStateParser - parses a simple variable", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "x", position: 0 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
			type: "Variable",
			name: "x",
		})
	}
})

Deno.test("runStateParser - parses binary addition", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "PLUS", value: "+", position: 1 },
		{ type: "NUMBER", value: "2", position: 3 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
			type: "BinaryOp",
			operator: "+",
			left: { type: "Number", value: 1 },
			right: { type: "Number", value: 2 },
		})
	}
})

Deno.test("runStateParser - parses multiplication with higher precedence", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "2", position: 0 },
		{ type: "PLUS", value: "+", position: 2 },
		{ type: "NUMBER", value: "3", position: 4 },
		{ type: "MULTIPLY", value: "*", position: 6 },
		{ type: "NUMBER", value: "4", position: 8 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
			type: "BinaryOp",
			operator: "+",
			left: { type: "Number", value: 2 },
			right: {
				type: "BinaryOp",
				operator: "*",
				left: { type: "Number", value: 3 },
				right: { type: "Number", value: 4 },
			},
		})
	}
})

Deno.test("runStateParser - parses parenthesized expressions", () => {
	const tokens: Token[] = [
		{ type: "LEFT_PAREN", value: "(", position: 0 },
		{ type: "NUMBER", value: "2", position: 1 },
		{ type: "PLUS", value: "+", position: 3 },
		{ type: "NUMBER", value: "3", position: 5 },
		{ type: "RIGHT_PAREN", value: ")", position: 6 },
		{ type: "MULTIPLY", value: "*", position: 8 },
		{ type: "NUMBER", value: "4", position: 10 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
			type: "BinaryOp",
			operator: "*",
			left: {
				type: "BinaryOp",
				operator: "+",
				left: { type: "Number", value: 2 },
				right: { type: "Number", value: 3 },
			},
			right: { type: "Number", value: 4 },
		})
	}
})

Deno.test("runStateParser - parses unary negation", () => {
	const tokens: Token[] = [
		{ type: "MINUS", value: "-", position: 0 },
		{ type: "NUMBER", value: "42", position: 1 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
			type: "UnaryOp",
			operator: "-",
			operand: { type: "Number", value: 42 },
		})
	}
})

Deno.test("runStateParser - parses conditional expressions", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "x", position: 0 },
		{ type: "GREATER_THAN", value: ">", position: 2 },
		{ type: "NUMBER", value: "0", position: 4 },
		{ type: "QUESTION", value: "?", position: 6 },
		{ type: "NUMBER", value: "1", position: 8 },
		{ type: "COLON", value: ":", position: 10 },
		{ type: "MINUS", value: "-", position: 12 },
		{ type: "NUMBER", value: "1", position: 13 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
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
		})
	}
})

Deno.test("runStateParser - parses complex nested expressions", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "a", position: 0 },
		{ type: "PLUS", value: "+", position: 2 },
		{ type: "IDENTIFIER", value: "b", position: 4 },
		{ type: "MULTIPLY", value: "*", position: 6 },
		{ type: "LEFT_PAREN", value: "(", position: 8 },
		{ type: "IDENTIFIER", value: "c", position: 9 },
		{ type: "MINUS", value: "-", position: 11 },
		{ type: "IDENTIFIER", value: "d", position: 13 },
		{ type: "RIGHT_PAREN", value: ")", position: 14 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Right")
	if (result._tag === "Right") {
		assertObjectMatch(result.right, {
			type: "BinaryOp",
			operator: "+",
			left: { type: "Variable", name: "a" },
			right: {
				type: "BinaryOp",
				operator: "*",
				left: { type: "Variable", name: "b" },
				right: {
					type: "BinaryOp",
					operator: "-",
					left: { type: "Variable", name: "c" },
					right: { type: "Variable", name: "d" },
				},
			},
		})
	}
})

Deno.test("runStateParser - returns error for empty token array", () => {
	const tokens: Token[] = []

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.message.includes("Unexpected"), true)
	}
})

Deno.test("runStateParser - returns error for invalid token", () => {
	const tokens: Token[] = [
		{ type: "UNKNOWN", value: "§", position: 0 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.message.includes("Unexpected token"), true)
	}
})

Deno.test("runStateParser - returns error for missing closing parenthesis", () => {
	const tokens: Token[] = [
		{ type: "LEFT_PAREN", value: "(", position: 0 },
		{ type: "NUMBER", value: "42", position: 1 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(
			result.left.message.includes("closing parenthesis") ||
				result.left.message.includes("Missing"),
			true,
		)
	}
})

Deno.test("runStateParser - returns error for incomplete binary expression", () => {
	const tokens: Token[] = [
		{ type: "NUMBER", value: "1", position: 0 },
		{ type: "PLUS", value: "+", position: 2 },
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(
			result.left.message.includes("Unexpected") ||
				result.left.message.includes("Expected"),
			true,
		)
	}
})

Deno.test("runStateParser - returns error for incomplete conditional", () => {
	const tokens: Token[] = [
		{ type: "IDENTIFIER", value: "x", position: 0 },
		{ type: "QUESTION", value: "?", position: 2 },
		{ type: "NUMBER", value: "1", position: 4 },
		// Missing COLON and false branch
	]

	const result = runStateParser(tokens)

	assertEquals(result._tag, "Left")
	if (result._tag === "Left") {
		assertEquals(result.left.message.includes("Expected"), true)
		assertEquals(
			result.left.message.includes(":") ||
				result.left.message.includes("colon"),
			true,
		)
	}
})
