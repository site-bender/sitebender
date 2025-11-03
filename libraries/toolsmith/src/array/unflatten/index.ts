//++ Reconstructs nested arrays from flat structure
const unflatten = (depths: Array<number>) =>
<T>(
	array: Array<T>,
): Array<T | Array<unknown>> => {
	if (array.length === 0) return []
	if (depths.length === 0) return []

	// Recursive helper function for pure FP approach
	const buildNested = (
		index: number,
		currentDepth: number,
	): { result: Array<T | Array<unknown>>; nextIndex: number } => {
		// deno-coverage-ignore-start Defensive guard: unreachable because callers validate index < array.length && index < depths.length before recursion
		if (index >= array.length || index >= depths.length) {
			return { result: [], nextIndex: index }
		}
		// deno-coverage-ignore-stop

		const result: Array<T | Array<unknown>> = []
		let i = index

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
				const nested = buildNested(i, depth)
				result.push(nested.result)
				i = nested.nextIndex
			}
		}

		return { result, nextIndex: i }
	}

	const { result } = buildNested(0, 0)

	return result
}

export default unflatten
