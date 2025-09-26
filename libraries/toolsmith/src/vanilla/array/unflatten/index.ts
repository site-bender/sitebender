/*++
 | Reconstructs nested arrays from flattened array with depth info
 |
 | Takes a flattened array and depth information to reconstruct the original
 | nested structure. This is the inverse of flatten operations that track
 | nesting depth. Can accept either a parallel array of depths or a function
 | that determines depth from elements. Useful for deserializing hierarchical
 | data, reconstructing trees, and undoing flatten operations.
 */
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

//?? [EXAMPLE] `unflatten([0, 1, 1, 0, 1, 2])([1, 2, 3, 4, 5, 6]) // [1, [2, 3], 4, [5, [6]]]`
//?? [EXAMPLE] `unflatten([0, 1, 2, 2, 1, 2, 0])(["A", "B", "C", "D", "E", "F", "G"]) // ["A", ["B", ["C", "D"], "E", ["F"]], "G"]`
//?? [EXAMPLE] `unflatten([0, 1, 1, 0, 1])(["File", "New", "Open", "Edit", "Cut"]) // ["File", ["New", "Open"], "Edit", ["Cut"]]`
//?? [EXAMPLE] `unflatten([])([]) // []`
//?? [EXAMPLE] `unflatten([0])([42]) // [42]`
//?? [EXAMPLE] `unflatten([1])([42]) // [[42]]`
