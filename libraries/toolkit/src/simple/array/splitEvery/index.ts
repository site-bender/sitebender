/**
 * Splits an array into chunks of specified size
 *
 * Divides array into subarrays of at most n elements. Last chunk may
 * have fewer elements if array doesn't divide evenly. Returns empty
 * array for chunk sizes <= 0.
 *
 * @param chunkSize - Size of each chunk (must be positive)
 * @param array - The array to split
 * @returns Array of chunks (subarrays)
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * splitEvery(2)([1, 2, 3, 4, 5]) // [[1, 2], [3, 4], [5]]
 * splitEvery(3)(["a", "b", "c", "d"]) // [["a", "b", "c"], ["d"]]
 *
 * // Edge cases
 * splitEvery(1)([1, 2, 3]) // [[1], [2], [3]]
 * splitEvery(0)([1, 2, 3]) // []
 * splitEvery(10)([1, 2, 3]) // [[1, 2, 3]]
 * ```
 */
const splitEvery =
	(chunkSize: number) => <T>(array: Array<T>): Array<Array<T>> =>
		array.length && chunkSize > 0
			? [
				array.slice(0, chunkSize),
				...splitEvery(chunkSize)(array.slice(chunkSize)),
			]
			: []

export default splitEvery
