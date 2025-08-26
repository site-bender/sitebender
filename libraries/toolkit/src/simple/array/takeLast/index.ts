/**
 * Takes the last n elements from an array
 *
 * Returns a new array with at most n elements from the end.
 * Returns fewer elements if n exceeds array length. Zero or negative
 * n returns empty array.
 *
 * @param count - Number of elements to take from the end
 * @param array - The array to take from
 * @returns New array with last n elements
 * @example
 * ```typescript
 * // Basic usage
 * takeLast(3)([1, 2, 3, 4, 5])  // [3, 4, 5]
 * takeLast(2)(["a", "b", "c"])  // ["b", "c"]
 *
 * // Edge cases
 * takeLast(0)([1, 2, 3])   // []
 * takeLast(10)([1, 2, 3])  // [1, 2, 3]
 * takeLast(-1)([1, 2, 3])  // []
 *
 * // Get recent items
 * const getRecent = takeLast(5)
 * getRecent(allMessages)  // last 5 messages
 *
 * // Null/undefined handling
 * takeLast(3)(null)       // []
 * takeLast(3)(undefined)  // []
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 * @idempotent
 */
const takeLast = (count: number) =>
<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || count <= 0) {
		return []
	}
	return array.slice(-count)
}

export default takeLast
