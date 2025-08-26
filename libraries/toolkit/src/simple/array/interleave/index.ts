/**
 * Alternate elements from multiple arrays
 *
 * Takes multiple arrays and interleaves their elements, taking one element
 * from each array in turn until all arrays are exhausted. Shorter arrays
 * are exhausted first, and the remaining elements from longer arrays continue
 * to be interleaved. Useful for merging data streams, creating alternating
 * patterns, and combining parallel sequences.
 *
 * @param arrays - Arrays to interleave
 * @returns New array with interleaved elements
 * 
 * @pure
 * @immutable
 * @variadic
 * 
 * @example
 * ```typescript
 * // Basic interleaving
 * interleave([1, 2, 3], ["a", "b", "c"])
 * // [1, "a", 2, "b", 3, "c"]
 *
 * // Different lengths
 * interleave([1, 2, 3, 4], ["a", "b"])
 * // [1, "a", 2, "b", 3, 4]
 *
 * // Three arrays
 * interleave([1, 2], ["a", "b"], [true, false])
 * // [1, "a", true, 2, "b", false]
 * 
 * // Creating alternating pattern
 * const odds = [1, 3, 5, 7]
 * const evens = [2, 4, 6, 8]
 * interleave(odds, evens)
 * // [1, 2, 3, 4, 5, 6, 7, 8]
 * 
 * // Edge cases
 * interleave([1, 2, 3])   // [1, 2, 3] (single array)
 * interleave()            // [] (no arrays)
 * interleave([], [1], []) // [1] (empty arrays)
 * ```
 */
const interleave = <T>(...arrays: Array<Array<T>>): Array<T> => {
	if (arrays.length === 0) return []

	const maxLength = Math.max(...arrays.map((arr) => arr.length))
	
	return Array.from({ length: maxLength }, (_, i) =>
		arrays
			.filter(arr => i < arr.length)
			.map(arr => arr[i])
	).flat()
}

export default interleave
