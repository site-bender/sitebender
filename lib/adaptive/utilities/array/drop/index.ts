/**
 * Drops the first n elements from an array
 * 
 * Returns a new array without the first n elements. If n is greater than
 * array length, returns empty array. Negative n values are treated as 0.
 * 
 * @curried (n) => (array) => result
 * @param n - Number of elements to drop from the start
 * @param array - The array to drop elements from
 * @returns New array with first n elements removed
 * @example
 * ```typescript
 * drop(2)([1, 2, 3, 4, 5]) // [3, 4, 5]
 * drop(0)([1, 2, 3])       // [1, 2, 3]
 * drop(10)([1, 2, 3])      // []
 * drop(-1)([1, 2, 3])      // [1, 2, 3] (negative treated as 0)
 * 
 * // Useful for skipping headers
 * const skipHeader = drop(1)
 * skipHeader(["header", "data1", "data2"]) // ["data1", "data2"]
 * ```
 */
const drop = <T>(n: number) => (array: Array<T>): Array<T> => 
	n <= 0 ? array : array.slice(n)

export default drop
