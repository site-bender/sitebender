/**
 * Returns a slice of an array starting from an index with specified length
 *
 * Extracts a specific number of elements starting from the given index.
 * Returns fewer elements if length extends beyond array bounds.
 * Negative indices count from the end.
 *
 * @param startIndex - Starting index for extraction
 * @param length - Number of elements to extract
 * @param array - The array to extract from
 * @returns New array containing the extracted elements
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * sliceFrom(1)(2)([1, 2, 3, 4, 5]) // [2, 3]
 * sliceFrom(0)(3)(["a", "b", "c", "d"]) // ["a", "b", "c"]
 * 
 * // Negative indices
 * sliceFrom(-3)(2)([1, 2, 3, 4, 5]) // [3, 4]
 * 
 * // Edge cases
 * sliceFrom(2)(10)([1, 2, 3, 4]) // [3, 4] (length exceeds bounds)
 * sliceFrom(5)(3)([1, 2, 3]) // []
 * sliceFrom(0)(0)([1, 2, 3]) // []
 * ```
 */
const sliceFrom = (startIndex: number) =>
(length: number) =>
<T>(
	array: Array<T>,
): Array<T> => {
	if (length <= 0) return []

	// Normalize negative index
	const normalizedStart = startIndex < 0
		? Math.max(0, array.length + startIndex)
		: startIndex

	return array.slice(normalizedStart, normalizedStart + length)
}

export default sliceFrom
