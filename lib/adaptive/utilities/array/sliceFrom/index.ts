/**
 * Returns a slice of an array starting from index i with specified length
 * 
 * @param i - Starting index
 * @returns Function that takes length and returns function that slices array from index with length
 * @example
 * ```typescript
 * sliceFrom(1)(2)([1, 2, 3, 4, 5]) // [2, 3]
 * sliceFrom(0)(3)(["a", "b", "c", "d"]) // ["a", "b", "c"]
 * ```
 */
const sliceFrom =
	(i: number) => (len: number) => <T>(arr: Array<T>): Array<T> =>
		arr.slice(i, i + len)

export default sliceFrom
