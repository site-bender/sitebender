/**
 * Returns a new sorted array using an optional comparison function
 * 
 * @param compareFn - Optional function that defines sort order (a, b) => number
 * @returns Function that takes an array and returns a new sorted array
 * @example
 * ```typescript
 * sort()([3, 1, 2]) // [1, 2, 3]
 * sort((a, b) => b - a)([1, 2, 3]) // [3, 2, 1]
 * sort()(["c", "a", "b"]) // ["a", "b", "c"]
 * ```
 */
const sort = <T>(
	compareFn?: (a: T, b: T) => number,
) =>
(array: Array<T>): Array<T> => [...array].sort(compareFn)

export default sort
