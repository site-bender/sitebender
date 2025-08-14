/**
 * Drops the last n elements from an array
 * 
 * @param n - Number of elements to drop from the end (zero or negative values drop nothing)
 * @returns Function that takes an array and returns a new array with last n elements removed
 * @example
 * ```typescript
 * dropLast(2)([1, 2, 3, 4, 5]) // [1, 2, 3]
 * dropLast(0)([1, 2, 3]) // [1, 2, 3]
 * dropLast(-1)([1, 2, 3]) // [1, 2, 3]
 * ```
 */
const dropLast = (n: number) => <T>(array: Array<T>): Array<T> =>
	n > 0 ? array.toSpliced(-n) : array.slice(0)

export default dropLast
