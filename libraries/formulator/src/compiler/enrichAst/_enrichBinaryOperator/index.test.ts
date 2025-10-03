import { assertEquals } from "@std/assert"

import type { BinaryOperatorNode } from "../../../parser/types/index.ts"

import enrichBinaryOperator from "./index.ts"

Deno.test("enrichBinaryOperator - enriches addition with Number datatype", () => {
	const node: BinaryOperatorNode = {
		_tag: "binaryOperator",
		operator: "plus",
		left: { _tag: "numberLiteral", value: 2, position: 0 },
		right: { _tag: "numberLiteral", value: 3, position: 4 },
		position: 0,
	}

	const enriched = enrichBinaryOperator(node)

	assertEquals(enriched._tag, "binaryOperator")
	assertEquals(enriched.operator, "add")
	assertEquals(enriched.datatype, "Number")
	assertEquals(enriched.left._tag, "numberLiteral")
	assertEquals(enriched.right._tag, "numberLiteral")

	if (enriched.left._tag === "numberLiteral") {
		assertEquals(enriched.left.datatype, "Number")
	}
})

Deno.test("enrichBinaryOperator - maps operators to semantic names", () => {
	const testCases: Array<[string, string]> = [
		["plus", "add"],
		["minus", "subtract"],
		["multiply", "multiply"],
		["divide", "divide"],
		["power", "power"],
	]

	testCases.forEach(([parserOp, semanticOp]) => {
		const node: BinaryOperatorNode = {
			_tag: "binaryOperator",
			operator: parserOp as "plus" | "minus" | "multiply" | "divide" | "power",
			left: { _tag: "numberLiteral", value: 1, position: 0 },
			right: { _tag: "numberLiteral", value: 2, position: 2 },
			position: 0,
		}

		const enriched = enrichBinaryOperator(node)
		assertEquals(enriched.operator, semanticOp)
	})
})

Deno.test("enrichBinaryOperator - recursively enriches nested operators", () => {
	const node: BinaryOperatorNode = {
		_tag: "binaryOperator",
		operator: "plus",
		left: {
			_tag: "binaryOperator",
			operator: "multiply",
			left: { _tag: "numberLiteral", value: 2, position: 0 },
			right: { _tag: "numberLiteral", value: 3, position: 4 },
			position: 0,
		},
		right: { _tag: "numberLiteral", value: 4, position: 8 },
		position: 0,
	}

	const enriched = enrichBinaryOperator(node)

	assertEquals(enriched.operator, "add")
	assertEquals(enriched.left._tag, "binaryOperator")

	if (enriched.left._tag === "binaryOperator") {
		assertEquals(enriched.left.operator, "multiply")
		assertEquals(enriched.left.datatype, "Number")
	}
})

Deno.test("enrichBinaryOperator - enriches operators with variables", () => {
	const node: BinaryOperatorNode = {
		_tag: "binaryOperator",
		operator: "minus",
		left: { _tag: "variable", name: "a", position: 0 },
		right: { _tag: "variable", name: "b", position: 4 },
		position: 0,
	}

	const enriched = enrichBinaryOperator(node)

	assertEquals(enriched.operator, "subtract")
	assertEquals(enriched.datatype, "Number")
	assertEquals(enriched.left._tag, "variable")
	assertEquals(enriched.right._tag, "variable")
})
