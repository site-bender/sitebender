/**
 * Removes elements at specified indices from an array
 * 
 * Creates a new array excluding elements at the given indices.
 * Invalid indices are ignored. Preserves order of kept elements.
 * 
 * @curried (indices) => (array) => result
 * @param indices - Array of indices to exclude
 * @param array - The array to filter
 * @returns New array with specified indices omitted
 * @example
 * ```typescript
 * omit([1, 3])([1, 2, 3, 4, 5]) // [1, 3, 5]
 * omit([0])(["a", "b", "c"]) // ["b", "c"]
 * omit([0, 2, 4])(["a", "b", "c", "d", "e"]) // ["b", "d"]
 * 
 * // Remove headers and footers
 * const removeEnds = omit([0, -1])
 * removeEnds(["header", "data1", "data2", "footer"]) // ["data1", "data2"]
 * ```
 */
const omit = <T>(indices: Array<number>) => (array: Array<T>): Array<T> =>
	array.filter((_, index) => !indices.includes(index))

export default omit
