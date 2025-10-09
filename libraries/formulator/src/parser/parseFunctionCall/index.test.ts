import { assertEquals } from "@std/assert"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"
import type { AstNode } from "../types/index.ts"

import parseFunctionCall, { setExpressionParser } from "./index.ts"

Deno.test("parseFunctionCall - parses function with single argument", () => {
	const mockExpressionParser = (tokens: Array<Result<string, Token>>) => {
		return (
			position: number,
			_minPrecedence?: number,
		): Result<string, [AstNode, number]> => {
			const tokenResult = tokens[position]

			if (
				tokenResult._tag === "Ok" && tokenResult.value.type === "identifier"
			) {
				const astNode: AstNode = Object.freeze({
					_tag: "variable",
					name: tokenResult.value.value,
					position: tokenResult.value.position,
				})
				return ok([astNode, position + 1])
			}

			return error("Mock parser failed")
		}
	}

	setExpressionParser(mockExpressionParser)

	const tokens: Array<Result<string, Token>> = [
		ok({ type: "identifier", value: "sin", position: 0 }),
		ok({ type: "leftParen", value: "(", position: 3 }),
		ok({ type: "identifier", value: "x", position: 4 }),
		ok({ type: "rightParen", value: ")", position: 5 }),
	]

	const result = parseFunctionCall(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "functionCall")

		if (astNode._tag === "functionCall") {
			assertEquals(astNode.name, "sin")
			assertEquals(astNode.arguments.length, 1)
			assertEquals(consumedPosition, 4)
		}
	}
})

Deno.test("parseFunctionCall - parses function with multiple arguments", () => {
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
		ok({ type: "identifier", value: "max", position: 0 }),
		ok({ type: "leftParen", value: "(", position: 3 }),
		ok({ type: "number", value: "1", position: 4 }),
		ok({ type: "comma", value: ",", position: 5 }),
		ok({ type: "number", value: "2", position: 7 }),
		ok({ type: "comma", value: ",", position: 8 }),
		ok({ type: "number", value: "3", position: 10 }),
		ok({ type: "rightParen", value: ")", position: 11 }),
	]

	const result = parseFunctionCall(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "functionCall")

		if (astNode._tag === "functionCall") {
			assertEquals(astNode.name, "max")
			assertEquals(astNode.arguments.length, 3)
			assertEquals(consumedPosition, 8)
		}
	}
})

Deno.test("parseFunctionCall - returns error when missing opening parenthesis", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "identifier", value: "sin", position: 0 }),
		ok({ type: "identifier", value: "x", position: 4 }),
	]

	const result = parseFunctionCall(tokens)(0)

	assertEquals(result._tag, "Error")
})

Deno.test("parseFunctionCall - returns error when missing closing parenthesis", () => {
	const mockExpressionParser = (tokens: Array<Result<string, Token>>) => {
		return (
			position: number,
			_minPrecedence?: number,
		): Result<string, [AstNode, number]> => {
			const tokenResult = tokens[position]

			if (
				tokenResult._tag === "Ok" && tokenResult.value.type === "identifier"
			) {
				const astNode: AstNode = Object.freeze({
					_tag: "variable",
					name: tokenResult.value.value,
					position: tokenResult.value.position,
				})
				return ok([astNode, position + 1])
			}

			return error("Mock parser failed")
		}
	}

	setExpressionParser(mockExpressionParser)

	const tokens: Array<Result<string, Token>> = [
		ok({ type: "identifier", value: "sin", position: 0 }),
		ok({ type: "leftParen", value: "(", position: 3 }),
		ok({ type: "identifier", value: "x", position: 4 }),
	]

	const result = parseFunctionCall(tokens)(0)

	assertEquals(result._tag, "Error")
})
