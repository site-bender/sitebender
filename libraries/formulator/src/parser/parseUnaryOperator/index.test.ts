import { assertEquals } from "@std/assert"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"
import type { AstNode } from "../types/index.ts"

import parseUnaryOperator, { setPrimaryParser } from "./index.ts"

Deno.test("parseUnaryOperator - parses negation (prefix minus)", () => {
	const mockPrimaryParser = (tokens: Array<Result<string, Token>>) => {
		return (position: number): Result<string, [AstNode, number]> => {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok" && tokenResult.value.type === "number") {
				const astNode: AstNode = Object.freeze({
					_tag: "numberLiteral",
					value: Number.parseFloat(tokenResult.value.value),
					position: tokenResult.value.position,
				})
				return ok([astNode, position + 1])
			}

			return ok([
				Object.freeze({ _tag: "numberLiteral" as const, value: 0, position: 0 }),
				position,
			])
		}
	}

	setPrimaryParser(mockPrimaryParser)

	const tokens: Array<Result<string, Token>> = [
		ok({ type: "minus", value: "-", position: 0 }),
		ok({ type: "number", value: "5", position: 1 }),
	]

	const result = parseUnaryOperator(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "unaryOperator")

		if (astNode._tag === "unaryOperator") {
			assertEquals(astNode.operator, "negate")
			assertEquals(consumedPosition, 2)
		}
	}
})

Deno.test("parseUnaryOperator - parses factorial (postfix exclamation)", () => {
	const mockPrimaryParser = (tokens: Array<Result<string, Token>>) => {
		return (position: number): Result<string, [AstNode, number]> => {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok" && tokenResult.value.type === "number") {
				const astNode: AstNode = Object.freeze({
					_tag: "numberLiteral",
					value: Number.parseFloat(tokenResult.value.value),
					position: tokenResult.value.position,
				})
				return ok([astNode, position + 1])
			}

			return ok([
				Object.freeze({ _tag: "numberLiteral" as const, value: 0, position: 0 }),
				position,
			])
		}
	}

	setPrimaryParser(mockPrimaryParser)

	const tokens: Array<Result<string, Token>> = [
		ok({ type: "number", value: "5", position: 0 }),
		ok({ type: "exclamation", value: "!", position: 1 }),
	]

	const result = parseUnaryOperator(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "unaryOperator")

		if (astNode._tag === "unaryOperator") {
			assertEquals(astNode.operator, "factorial")
			assertEquals(consumedPosition, 2)
		}
	}
})

Deno.test("parseUnaryOperator - returns primary when no unary operator", () => {
	const mockPrimaryParser = (tokens: Array<Result<string, Token>>) => {
		return (position: number): Result<string, [AstNode, number]> => {
			const tokenResult = tokens[position]

			if (tokenResult._tag === "Ok" && tokenResult.value.type === "number") {
				const astNode: AstNode = Object.freeze({
					_tag: "numberLiteral",
					value: Number.parseFloat(tokenResult.value.value),
					position: tokenResult.value.position,
				})
				return ok([astNode, position + 1])
			}

			return ok([
				Object.freeze({ _tag: "numberLiteral" as const, value: 0, position: 0 }),
				position,
			])
		}
	}

	setPrimaryParser(mockPrimaryParser)

	const tokens: Array<Result<string, Token>> = [
		ok({ type: "number", value: "42", position: 0 }),
	]

	const result = parseUnaryOperator(tokens)(0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "numberLiteral")
		assertEquals(consumedPosition, 1)
	}
})
