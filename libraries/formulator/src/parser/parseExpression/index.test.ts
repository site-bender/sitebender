import { assertEquals } from "@std/assert"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

import type { Token } from "../../tokenizer/types/index.ts"

import parseExpression from "./index.ts"

Deno.test("parseExpression - parses simple addition", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "number", value: "2", position: 0 }),
		ok({ type: "plus", value: "+", position: 2 }),
		ok({ type: "number", value: "3", position: 4 }),
	]

	const result = parseExpression(tokens)(0, 0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "binaryOperator")

		if (astNode._tag === "binaryOperator") {
			assertEquals(astNode.operator, "plus")
			assertEquals(consumedPosition, 3)
		}
	}
})

Deno.test("parseExpression - respects precedence (multiplication before addition)", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "number", value: "2", position: 0 }),
		ok({ type: "plus", value: "+", position: 2 }),
		ok({ type: "number", value: "3", position: 4 }),
		ok({ type: "multiply", value: "*", position: 6 }),
		ok({ type: "number", value: "4", position: 8 }),
	]

	const result = parseExpression(tokens)(0, 0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, _consumedPosition] = result.value

		assertEquals(astNode._tag, "binaryOperator")

		if (astNode._tag === "binaryOperator") {
			assertEquals(astNode.operator, "plus")
			assertEquals(astNode.left._tag, "numberLiteral")
			assertEquals(astNode.right._tag, "binaryOperator")

			if (astNode.right._tag === "binaryOperator") {
				assertEquals(astNode.right.operator, "multiply")
			}
		}
	}
})

Deno.test("parseExpression - handles right-associativity for power operator", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "number", value: "2", position: 0 }),
		ok({ type: "power", value: "^", position: 2 }),
		ok({ type: "number", value: "3", position: 4 }),
		ok({ type: "power", value: "^", position: 6 }),
		ok({ type: "number", value: "4", position: 8 }),
	]

	const result = parseExpression(tokens)(0, 0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, _consumedPosition] = result.value

		assertEquals(astNode._tag, "binaryOperator")

		if (astNode._tag === "binaryOperator") {
			assertEquals(astNode.operator, "power")
			assertEquals(astNode.left._tag, "numberLiteral")
			assertEquals(astNode.right._tag, "binaryOperator")

			if (astNode.right._tag === "binaryOperator") {
				assertEquals(astNode.right.operator, "power")
			}
		}
	}
})

Deno.test("parseExpression - parses variable reference", () => {
	const tokens: Array<Result<string, Token>> = [
		ok({ type: "identifier", value: "x", position: 0 }),
	]

	const result = parseExpression(tokens)(0, 0)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const [astNode, consumedPosition] = result.value

		assertEquals(astNode._tag, "variable")

		if (astNode._tag === "variable") {
			assertEquals(astNode.name, "x")
			assertEquals(consumedPosition, 1)
		}
	}
})
