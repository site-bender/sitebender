import isNullish from "../../validation/isNullish/index.ts"

/**
 * Takes the first n elements from an array
 *
 * Returns a new array with at most n elements from the beginning.
 * Returns fewer elements if n exceeds array length. Zero or negative
 * n returns empty array.
 *
 * @param count - Number of elements to take from the start
 * @param array - The array to take from
 * @returns New array with first n elements
 * @example
 * ```typescript
 * // Basic usage
 * take(3)([1, 2, 3, 4, 5])  // [1, 2, 3]
 * take(2)(["a", "b", "c"])  // ["a", "b"]
 *
 * // Edge cases
 * take(0)([1, 2, 3])   // []
 * take(10)([1, 2, 3])  // [1, 2, 3]
 * take(-1)([1, 2, 3])  // []
 *
 * // Pagination use case
 * const firstPage = take(20)
 * firstPage(allResults)  // first 20 results
 *
 * // Null/undefined handling
 * take(3)(null)       // []
 * take(3)(undefined)  // []
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 * @idempotent
 */
const take = (count: number) =>
<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || count <= 0) {
		return []
	}
	return array.slice(0, count)
}

export default take
