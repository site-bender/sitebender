//++ [PRIVATE] Reconstructs nested arrays from flat structure using depth markers
//++ Uses recursion to build nested structure based on depth values
export default function _unflattenArray(
	depths: ReadonlyArray<number>,
) {
	return function _unflattenArrayWithDepths<T>(
		array: ReadonlyArray<T>,
	): Array<T | Array<unknown>> {
		//++ [EXCEPTION] Using array.length for bounds check
		if (array.length === 0) return []
		if (depths.length === 0) return []

		//++ Recursive helper function for pure FP approach
		function buildNested(
			index: number,
		) {
			return function buildNestedWithIndex(
				currentDepth: number,
			): { result: Array<T | Array<unknown>>; nextIndex: number } {
				//++ [EXCEPTION] Using array.length for bounds check
				// deno-coverage-ignore-start Defensive guard: unreachable because callers validate index < array.length && index < depths.length before recursion
				if (index >= array.length || index >= depths.length) {
					return { result: [], nextIndex: index }
				}
				// deno-coverage-ignore-stop

				const result: Array<T | Array<unknown>> = []
				let i = index

				//++ [EXCEPTION] Using while loop and let for recursion state
				//++ [EXCEPTION] Using array.length for bounds check
				while (i < array.length && i < depths.length) {
					const depth = depths[i]
					const value = array[i]

					if (depth < currentDepth) {
						// Return to parent level
						break
					} else if (depth === currentDepth) {
						// Add to current level
						result.push(value)
						i++
					} else {
						// Start a new nested level
						const nested = buildNested(i)(depth)
						result.push(nested.result)
						i = nested.nextIndex
					}
				}

				return { result, nextIndex: i }
			}
		}

		const { result } = buildNested(0)(0)

		return result
	}
}
