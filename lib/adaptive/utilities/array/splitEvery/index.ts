/**
 * Splits an array into chunks of specified size
 * 
 * @param n - Size of each chunk (must be positive)
 * @returns Function that takes an array and returns array of chunks
 * @example
 * ```typescript
 * splitEvery(2)([1, 2, 3, 4, 5]) // [[1, 2], [3, 4], [5]]
 * splitEvery(3)(["a", "b", "c", "d"]) // [["a", "b", "c"], ["d"]]
 * splitEvery(0)([1, 2, 3]) // []
 * ```
 */
const splitEvery = (n: number) => <T>(array: Array<T>): Array<Array<T>> =>
	array.length && n > 0
		? [array.slice(0, n), ...splitEvery(n)(array.slice(n))]
		: []

export default splitEvery
