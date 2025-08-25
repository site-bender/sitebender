/**
 * Takes the first n elements from an array
 *
 * Returns a new array with at most n elements from the beginning.
 * Returns fewer elements if n exceeds array length. Zero or negative
 * n returns empty array.
 *
 * @property idempotent - When count >= array.length, returns same result if applied multiple times
 * @curried (count) => (array) => result
 * @param count - Number of elements to take from the start
 * @param array - The array to take from
 * @returns New array with first n elements
 * @example
 * ```typescript
 * take(3)([1, 2, 3, 4, 5]) // [1, 2, 3]
 * take(2)(["a", "b", "c"]) // ["a", "b"]
 * take(0)([1, 2, 3]) // []
 * take(10)([1, 2, 3]) // [1, 2, 3]
 * take(-1)([1, 2, 3]) // []
 *
 * // Pagination
 * const firstPage = take(20)
 * firstPage(allResults) // first 20 results
 * ```
 */
const take = (count: number) =>
<T>(
	array: Array<T>,
): Array<T> => (count > 0 ? array.slice(0, count) : [])

export default take
