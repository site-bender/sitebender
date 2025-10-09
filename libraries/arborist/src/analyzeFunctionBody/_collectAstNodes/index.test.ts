// @sitebender/arborist/src/analyzeFunctionBody/_collectAstNodes/index.test.ts
// Tests for AST node collection helper

import { assertEquals } from "jsr:@std/assert@1"
import _collectAstNodes from "./index.ts"

Deno.test("_collectAstNodes returns empty array for null", () => {
	const result = _collectAstNodes(null)
	assertEquals(result, [])
})

Deno.test("_collectAstNodes returns empty array for undefined", () => {
	const result = _collectAstNodes(undefined)
	assertEquals(result, [])
})

Deno.test("_collectAstNodes returns empty array for primitive values", () => {
	assertEquals(_collectAstNodes(42), [])
	assertEquals(_collectAstNodes("string"), [])
	assertEquals(_collectAstNodes(true), [])
})

Deno.test("_collectAstNodes collects single object node", () => {
	const node = { type: "Identifier", name: "foo" }
	const result = _collectAstNodes(node)
	assertEquals(result.length, 1)
	assertEquals(result[0], node)
})

Deno.test("_collectAstNodes collects nested object nodes", () => {
	const child = { type: "Literal", value: 42 }
	const parent = { type: "BinaryExpression", left: child, operator: "+" }
	const result = _collectAstNodes(parent)

	// Should include parent and child
	assertEquals(result.length >= 2, true)
	assertEquals(result[0], parent)
})

Deno.test("_collectAstNodes collects nodes from arrays", () => {
	const node1 = { type: "Identifier", name: "a" }
	const node2 = { type: "Identifier", name: "b" }
	const parent = { type: "ArrayExpression", elements: [node1, node2] }
	const result = _collectAstNodes(parent)

	// Should include parent and both children
	assertEquals(result.length >= 3, true)
})

Deno.test("_collectAstNodes handles deeply nested structures", () => {
	const deepNode = {
		type: "Program",
		body: [
			{
				type: "FunctionDeclaration",
				params: [
					{ type: "Identifier", name: "x" },
				],
				body: {
					type: "BlockStatement",
					body: [
						{
							type: "ReturnStatement",
							argument: { type: "Identifier", name: "x" },
						},
					],
				},
			},
		],
	}
	const result = _collectAstNodes(deepNode)

	// Should collect all nodes in the tree
	assertEquals(result.length >= 6, true)
})

Deno.test("_collectAstNodes returns ReadonlyArray", () => {
	const node = { type: "Identifier", name: "test" }
	const result = _collectAstNodes(node)

	// Verify it's an array
	assertEquals(Array.isArray(result), true)

	// Verify it contains the node
	assertEquals(result.includes(node), true)
})
