/**
 * Removes elements at specified indices from an array
 *
 * Creates a new array excluding elements at the given indices.
 * Supports negative indices which count from the end (-1 is last element).
 * Invalid indices are ignored. Preserves order of kept elements.
 *
 * @param indices - Array of indices to exclude (supports negative indices)
 * @param array - The array to filter
 * @returns New array with specified indices omitted
 * 
 * @pure
 * @curried
 * @immutable
 * @safe
 * 
 * @example
 * ```typescript
 * // Basic usage
 * omit([1, 3])([1, 2, 3, 4, 5]) // [1, 3, 5]
 * omit([0])(["a", "b", "c"]) // ["b", "c"]
 * omit([0, 2, 4])(["a", "b", "c", "d", "e"]) // ["b", "d"]
 *
 * // Negative indices
 * omit([-1, -2])([1, 2, 3, 4, 5]) // [1, 2, 3]
 * 
 * // Remove headers and footers
 * const removeEnds = omit([0, -1])
 * removeEnds(["header", "data1", "data2", "footer"]) // ["data1", "data2"]
 *
 * // Edge cases
 * omit([0])(null) // []
 * omit([0])(undefined) // []
 * omit([])([1, 2, 3]) // [1, 2, 3]
 * ```
 */
const omit = <T>(indices: Array<number>) =>
(
	array: Array<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	// Normalize negative indices to positive ones
	const normalizedIndices = indices.map((i) => i < 0 ? array.length + i : i)

	return array.filter((_, index) => !normalizedIndices.includes(index))
}

export default omit
