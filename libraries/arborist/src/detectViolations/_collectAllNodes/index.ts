//++ Recursively walks AST node and collects all child nodes
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"

export default function _collectAllNodes(node: unknown): ReadonlyArray<unknown> {
	if (!node || typeof node !== "object") {
		return []
	}

	const n = node as Record<string, unknown>
	const currentNode = [node]

	// Collect all property values
	const propertyValues = Object.values(n)

	// Process each property value
	const childNodesResult = reduce(
		function reducePropertyValues(accumulator: ReadonlyArray<unknown>) {
			return function reducePropertyValuesWithAccumulator(
				value: unknown,
			): ReadonlyArray<unknown> {
				if (Array.isArray(value)) {
					// Process array items
					const arrayResult = reduce(
						function reduceArrayItems(
							innerAccumulator: ReadonlyArray<unknown>,
						) {
							return function reduceArrayItemsWithAccumulator(
								item: unknown,
							): ReadonlyArray<unknown> {
								return [...innerAccumulator, ..._collectAllNodes(item)]
							}
						},
					)(accumulator)(value)
					return getOrElse(accumulator)(arrayResult)
				} else if (and(value)(isEqual(typeof value)("object"))) {
					return [...accumulator, ..._collectAllNodes(value)]
				}
				return accumulator
			}
		},
	)([] as ReadonlyArray<unknown>)(propertyValues)

	const childNodes = getOrElse([] as ReadonlyArray<unknown>)(childNodesResult)

	return [...currentNode, ...childNodes]
}
