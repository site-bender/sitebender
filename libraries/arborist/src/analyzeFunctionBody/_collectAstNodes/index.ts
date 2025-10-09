// @sitebender/arborist/src/analyzeFunctionBody/_collectAstNodes
// Collects all nodes from an AST into a flat array

import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"

//++ Collects all AST nodes into a flat ReadonlyArray
//++ Uses recursion to traverse the tree without loops
export default function _collectAstNodes(
	node: unknown,
): ReadonlyArray<unknown> {
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
	const childNodesResult = reduce(
		function reduceChildNodes(accumulator: ReadonlyArray<unknown>) {
			return function reduceChildNodesWithAccumulator(
				value: unknown,
			): ReadonlyArray<unknown> {
				if (Array.isArray(value)) {
					const arrayResult = reduce(
						function reduceArrayValues(
							innerAccumulator: ReadonlyArray<unknown>,
						) {
							return function reduceArrayValuesWithAccumulator(
								item: unknown,
							): ReadonlyArray<unknown> {
								return [...innerAccumulator, ..._collectAstNodes(item)]
							}
						},
					)(accumulator)(value)
					return getOrElse([] as ReadonlyArray<unknown>)(arrayResult)
				} else if (typeof value === "object" && value !== null) {
					return [...accumulator, ..._collectAstNodes(value)]
				}
				return accumulator
			}
		},
	)([] as ReadonlyArray<unknown>)(Object.values(nodeObj))

	const childNodes = getOrElse([] as ReadonlyArray<unknown>)(childNodesResult)

	return [...currentNode, ...childNodes]
}
