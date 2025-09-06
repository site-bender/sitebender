import { assertEquals } from "https://deno.land/std@0.218.0/assert/mod.ts"

import type {
	ASTNode,
	ParseError,
	Result,
	Token,
} from "../../../src/types/index.ts"

import compile from "../../../src/compiler/index.ts"
import parseFormula from "../../../src/parseFormula/index.ts"
import createParserContext from "../../../src/parser/parse/createParserContext/index.ts"
import getOperatorFromToken from "../../../src/parser/parseBinaryExpression/getOperatorFromToken/index.ts"

Deno.test("createParserContext - handles empty token array", () => {
	// This tests the fallback in line 74: tokens[position] || tokens[tokens.length - 1]
	const ctx = createParserContext([])

	// Should return undefined when no tokens
	const current = ctx.current()
	assertEquals(current, undefined)
})

Deno.test("createParserContext - handles position beyond array", () => {
	// Test the fallback when position exceeds array length
	const tokens: Array<Token> = [
		{ type: "EOF", value: "", position: 0 },
	]
	const ctx = createParserContext(tokens)

	// Manually set position to beyond array
	ctx.position = 10

	// Should return the last token (EOF)
	const current = ctx.current()
	assertEquals(current.type, "EOF")
})

Deno.test("getOperatorFromToken - handles all operator types", () => {
	// Test MINUS operator (ensure all branches covered)
	const minusToken: Token = { type: "MINUS", value: "-", position: 0 }
	assertEquals(getOperatorFromToken(minusToken), "-")

	// Test DIVIDE operator
	const divideToken: Token = { type: "DIVIDE", value: "/", position: 0 }
	assertEquals(getOperatorFromToken(divideToken), "/")

	// Test POWER operator
	const powerToken: Token = { type: "POWER", value: "^", position: 0 }
	assertEquals(getOperatorFromToken(powerToken), "^")
})

Deno.test("getOperatorFromToken - returns null for non-operator tokens", () => {
	// Test various non-operator token types
	const numberToken: Token = { type: "NUMBER", value: "42", position: 0 }
	assertEquals(getOperatorFromToken(numberToken), null)

	const identifierToken: Token = {
		type: "IDENTIFIER",
		value: "abc",
		position: 0,
	}
	assertEquals(getOperatorFromToken(identifierToken), null)

	const leftParenToken: Token = { type: "LEFT_PAREN", value: "(", position: 0 }
	assertEquals(getOperatorFromToken(leftParenToken), null)

	const rightParenToken: Token = {
		type: "RIGHT_PAREN",
		value: ")",
		position: 0,
	}
	assertEquals(getOperatorFromToken(rightParenToken), null)

	const eofToken: Token = { type: "EOF", value: "", position: 0 }
	assertEquals(getOperatorFromToken(eofToken), null)
})

Deno.test("compile - handles unknown AST node type (unreachable in practice)", () => {
	// This tests the default case in the compiler which should never be reached
	// due to TypeScript's exhaustiveness checking. We force it by casting.
	const unknownNode = { type: "UnknownType" } as unknown as ASTNode

	const result = compile(unknownNode, {})

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message, "Unknown AST node type")
	}
})

Deno.test("compile - handles unsupported operator in BinaryOp", () => {
	// Test the default case in BinaryOp operator switch
	// This is also unreachable in practice but we test it for completeness
	const invalidOp: ASTNode = {
		type: "BinaryOp",
		operator: "%" as any, // Force an invalid operator
		left: { type: "Number", value: 5 },
		right: { type: "Number", value: 3 },
	}

	const result = compile(invalidOp, {})

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message, "Unsupported operator")
	}
})

Deno.test("compile - handles non-numeric datatype fallback in UnaryOp", () => {
	// Test the datatype fallback for non-numeric types
	const ast: ASTNode = {
		type: "UnaryOp",
		operator: "-",
		operand: { type: "Variable", name: "x" },
	}

	const variables = {
		x: {
			tag: "Constant" as const,
			type: "injector" as const,
			datatype: "Text" as any, // Non-numeric datatype
			value: "hello",
		},
	}

	const result = compile(ast, variables)

	assertEquals(result.ok, true)
	if (result.ok && result.value.tag === "Negate") {
		// Should default to "Number" for non-numeric types
		assertEquals(result.value.datatype, "Number")
	}
})

Deno.test("parseFormula - returns tokenization errors", () => {
	// Test that tokenization errors are properly returned
	// The @ character is invalid in formulas
	const result = parseFormula("a @ b", {})

	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Unexpected character"), true)
	}
})
