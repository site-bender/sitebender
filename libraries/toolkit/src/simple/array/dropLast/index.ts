/**
 * Drops the last n elements from an array
 *
 * Returns a new array without the last n elements. If n is greater than
 * array length, returns empty array. Negative n values are treated as 0.
 *
 * @param n - Number of elements to drop from the end
 * @param array - The array to drop elements from
 * @returns New array with last n elements removed
 * @example
 * ```typescript
 * dropLast(2)([1, 2, 3, 4, 5]) // [1, 2, 3]
 * dropLast(0)([1, 2, 3])       // [1, 2, 3]
 * dropLast(10)([1, 2, 3])      // []
 * dropLast(-1)([1, 2, 3])      // [1, 2, 3] (negative treated as 0)
 *
 * // Useful for removing trailing items
 * const removeFooter = dropLast(1)
 * removeFooter(["data1", "data2", "footer"]) // ["data1", "data2"]
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const dropLast = <T>(n: number) => (array: Array<T>): Array<T> =>
	n <= 0 ? array : array.slice(0, Math.max(0, array.length - n))

export default dropLast
