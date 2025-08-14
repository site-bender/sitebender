/**
 * Returns a new array with duplicate elements removed
 * 
 * @param array - The array to remove duplicates from
 * @returns New array with only unique elements (first occurrence kept)
 * @example
 * ```typescript
 * unique([1, 2, 2, 3, 1, 4]) // [1, 2, 3, 4]
 * unique(["a", "b", "a", "c"]) // ["a", "b", "c"]
 * unique([]) // []
 * ```
 */
const unique = <T>(array: Array<T>): Array<T> =>
	Array.from(new Set(array))

export default unique
