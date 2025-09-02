import isNullish from "../../validation/isNullish/index.ts"
import not from "../../logic/not/index.ts"

/**
 * Splits an array into chunks of specified size
 *
 * Divides an array into smaller arrays of a maximum size. The last chunk
 * may be smaller than the specified size if the array length is not evenly
 * divisible. Similar to splitEvery but specifically for arrays.
 *
 * @param size - Maximum size of each chunk (must be positive)
 * @param array - Array to split into chunks
 * @returns Array of arrays, each of maximum size
 * @example
 * ```typescript
 * // Basic usage
 * chunk(2)([1, 2, 3, 4, 5])
 * // [[1, 2], [3, 4], [5]]
 *
 * chunk(3)([1, 2, 3, 4, 5, 6, 7, 8])
 * // [[1, 2, 3], [4, 5, 6], [7, 8]]
 *
 * // Edge cases
 * chunk(10)([1, 2, 3])  // [[1, 2, 3]]
 * chunk(1)([1, 2, 3])   // [[1], [2], [3]]
 * chunk(0)([1, 2, 3])   // []
 * chunk(3)([])          // []
 *
 * // Batch processing
 * const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * chunk(3)(ids)
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
 *
 * // Partial application
 * const pairwise = chunk(2)
 * pairwise([1, 2, 3, 4])     // [[1, 2], [3, 4]]
 * pairwise(["a", "b", "c"])   // [["a", "b"], ["c"]]
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const chunk = <T>(
	size: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	if (size <= 0 || not(Number.isInteger(size))) {
		return []
	}

	// Build chunks using recursion
	const chunkRecursive = (remaining: ReadonlyArray<T>): Array<Array<T>> => {
		if (remaining.length === 0) {
			return []
		}

		const currentChunk = remaining.slice(0, size)
		const rest = remaining.slice(size)

		return [currentChunk, ...chunkRecursive(rest)]
	}

	return chunkRecursive(array)
}

export default chunk
