/**
 * Drops the first n elements from an array
 * 
 * @param n - Number of elements to drop from the start (negative values drop nothing)
 * @returns Function that takes an array and returns a new array with first n elements removed
 * @example
 * ```typescript
 * drop(2)([1, 2, 3, 4, 5]) // [3, 4, 5]
 * drop(0)([1, 2, 3]) // [1, 2, 3]
 * drop(-1)([1, 2, 3]) // [1, 2, 3]
 * ```
 */
const drop = <T>(n: number) =>
(
	arr: Array<T>,
): Array<T> => (n >= 0 ? arr.slice(n) : arr.slice(0))

export default drop
