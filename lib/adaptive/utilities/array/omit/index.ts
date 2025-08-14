/**
 * Removes elements at specified indices from an array
 * 
 * @param indices - Array of indices to remove
 * @returns Function that takes an array and returns a new array with specified indices omitted
 * @example
 * ```typescript
 * omit([1, 3])([1, 2, 3, 4, 5]) // [1, 3, 5]
 * omit([0])(["a", "b", "c"]) // ["b", "c"]
 * ```
 */
const omit = <T>(indices: Array<number>) => (arr: Array<T>): Array<T> =>
	arr.filter((_, index) => !indices.includes(index))

export default omit
