// @sitebender/arborist/src/analyzeFunctionBody/_collectAstNodes
// Collects all nodes from an AST into a flat array

import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"

import _reduceChildNodes from "./_reduceChildNodes/index.ts"

//++ Collects all AST nodes into a flat ReadonlyArray
//++ Uses recursion to traverse the tree without loops
export default function _collectAstNodes(
	node: unknown,
): ReadonlyArray<unknown> {
	if (isEqual(node)(null) || isEqual(node)(undefined)) {
		return []
	}

	if (typeof node !== "object") {
		return []
	}

	const nodeObj = node as Record<string, unknown>

	// Start with current node
	const currentNode = [node]

	// Recursively collect from all child properties using Toolsmith functions
	const childNodesResult = reduce(_reduceChildNodes)([] as ReadonlyArray<unknown>)(Object.values(nodeObj))

	const childNodes = getOrElse([] as ReadonlyArray<unknown>)(childNodesResult)

	return [...currentNode, ...childNodes]
}
