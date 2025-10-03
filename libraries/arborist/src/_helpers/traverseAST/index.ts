// @sitebender/arborist/src/_helpers/traverseAST
// Recursively traverses an AST node and collects matching nodes

//++ Traverses AST recursively without loops
//++ Uses recursion to visit all nodes in the tree
export default function traverseAST<T>(
	predicate: (node: unknown) => node is T,
) {
	return function traverseASTWithPredicate(
		accumulator: ReadonlyArray<T>,
	) {
		return function traverseASTWithPredicateAndAccumulator(
			node: unknown,
		): ReadonlyArray<T> {
			if (node === null || node === undefined) {
				return accumulator
			}

			// Check if current node matches predicate
			const newAccumulator = predicate(node)
				? [...accumulator, node]
				: accumulator

			// If node is an object, recursively traverse its properties
			if (typeof node === "object") {
				return Object.values(node).reduce(
					function reduceNodeValues(acc, value) {
						return traverseASTWithPredicate(acc)(value)
					},
					newAccumulator,
				)
			}

			return newAccumulator
		}
	}
}
