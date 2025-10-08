// @sitebender/arborist/src/_helpers/traverseASTNode
// Recursively traverses an AST node and calls a visitor function on each node

import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import values from "@sitebender/toolsmith/vanilla/object/values/index.ts"

//++ Traverses an AST node recursively without loops
//++ Calls the visitor function on each node in the tree
//++ Uses pure recursion with reduce for side effects
export default function traverseASTNode(
	visitor: (node: unknown) => void,
) {
	return function traverseWithVisitor(node: unknown): void {
		if (node === null || node === undefined) {
			return
		}

		if (typeof node !== "object") {
			return
		}

		// Call visitor on current node
		visitor(node)

		const nodeObj = node as Record<string, unknown>

		// Recursively traverse all properties using Toolsmith reduce for side effects
		reduce(
			function traverseValue(_acc: void, value: unknown): void {
				if (Array.isArray(value)) {
					reduce(
						function traverseArrayItem(_innerAcc: void, item: unknown): void {
							traverseWithVisitor(item)
						},
					)(undefined)(value)
				} else if (typeof value === "object" && value !== null) {
					traverseWithVisitor(value)
				}
			},
		)(undefined)(values(nodeObj))
	}
}
