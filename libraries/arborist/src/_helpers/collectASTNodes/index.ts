// @sitebender/arborist/src/_helpers/collectASTNodes
// Collects all nodes from an AST into a flat array

import reduce from "@sitebender/toolsmith/vanilla/array/reduce/index.ts"

//++ Collects all AST nodes into a flat ReadonlyArray
//++ Uses recursion to traverse the tree without loops
export default function collectASTNodes(node: unknown): ReadonlyArray<unknown> {
	if (node === null || node === undefined) {
		return []
	}

	if (typeof node !== "object") {
		return []
	}

	const nodeObj = node as Record<string, unknown>

	// Start with current node
	const currentNode = [node]

	// Recursively collect from all child properties using Toolsmith functions
	const childNodes = reduce(
		function reduceChildNodes(
			acc: ReadonlyArray<unknown>,
			value: unknown,
		): ReadonlyArray<unknown> {
			if (Array.isArray(value)) {
				return reduce(
					function reduceArrayValues(
						innerAcc: ReadonlyArray<unknown>,
						item: unknown,
					): ReadonlyArray<unknown> {
						return [...innerAcc, ...collectASTNodes(item)]
					},
				)(acc)(value)
			} else if (typeof value === "object" && value !== null) {
				return [...acc, ...collectASTNodes(value)]
			}
			return acc
		},
	)([] as ReadonlyArray<unknown>)(Object.values(nodeObj))

	return [...currentNode, ...childNodes]
}
