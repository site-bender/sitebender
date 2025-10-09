import { assertEquals } from "@std/assert"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"
import type { AstNode } from "../types/index.ts"

import parsePrimary, { setExpressionParser } from "./index.ts"

Deno.test("parsePrimary - parses number token", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "number", value: "123", position: 0 }),
	]

	const result = parsePrimary(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "numberLiteral")

		if (astNode._tag === "numberLiteral") {
			assertEquals(astNode.value, 123)
			assertEquals(astNode.position, 0)
		}

		assertEquals(consumedPosition, 1)
	}
})

Deno.test("parsePrimary - returns error when position out of bounds", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "number", value: "123", position: 0 }),
	]

	const result = parsePrimary(tokens)(1)

	assertEquals(result._tag, "Error")

	if (result._tag === "Error") {
		assertEquals(result.error, "Unexpected end of input at position 1")
	}
})

Deno.test("parsePrimary - propagates token error", () => {
	const tokens = [
		error("Invalid token"),
	]

	const result = parsePrimary(tokens)(0)

	assertEquals(result._tag, "Error")

	if (result._tag === "Error") {
		assertEquals(result.error, "Invalid token")
	}
})

Deno.test("parsePrimary - parses variable token", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "identifier", value: "x", position: 0 }),
	]

	const result = parsePrimary(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "variable")

		if (astNode._tag === "variable") {
			assertEquals(astNode.name, "x")
			assertEquals(astNode.position, 0)
		}

		assertEquals(consumedPosition, 1)
	}
})

Deno.test("parsePrimary - parses grouped expression", () => {
	const mockExpressionParser = (tokens: Array<Result<string, Token>>) => {
		return (
			position: number,
			_minPrecedence?: number,
		): Result<string, [AstNode, number]> => {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok" && tokenResult.value.type === "number") {
				const astNode: AstNode = Object.freeze({
					_tag: "numberLiteral",
					value: Number.parseFloat(tokenResult.value.value),
					position: tokenResult.value.position,
				})
				return ok([astNode, position + 1])
			}

			return error("Mock parser failed")
		}
	}

	setExpressionParser(mockExpressionParser)

	const tokens: Array<Result<string, Token>> = [
		ok({ type: "leftParen", value: "(", position: 0 }),
		ok({ type: "number", value: "42", position: 1 }),
		ok({ type: "rightParen", value: ")", position: 3 }),
	]

	const result = parsePrimary(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "group")
		assertEquals(consumedPosition, 3)
	}
})
