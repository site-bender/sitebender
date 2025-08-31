import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns a new array of consecutive n-tuples (sliding window)
 *
 * Creates a sliding window of specified size over an array, returning
 * an array of consecutive n-tuples. Each tuple contains n consecutive
 * elements from the original array. The window moves one position at
 * a time, creating overlapping groups. Returns empty array if the
 * window size is larger than the array length.
 *
 * @param n - Size of each tuple (window size)
 * @param array - Array to create sliding window over
 * @returns Array of n-tuples from consecutive elements
 * @example
 * ```typescript
 * // Basic usage - pairs
 * aperture(2)([1, 2, 3, 4, 5])
 * // [[1, 2], [2, 3], [3, 4], [4, 5]]
 *
 * // Triples
 * aperture(3)([1, 2, 3, 4, 5])
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * // Edge cases
 * aperture(5)([1, 2, 3])  // []
 * aperture(0)([1, 2, 3])  // []
 * aperture(2)([])         // []
 *
 * // Moving averages
 * const windows = aperture(3)([10, 20, 30, 40, 50])
 * windows.map(w => w.reduce((a, b) => a + b, 0) / w.length)
 * // [20, 30, 40]
 *
 * // Text bigrams
 * aperture(2)(["the", "quick", "brown", "fox"])
 * // [["the", "quick"], ["quick", "brown"], ["brown", "fox"]]
 *
 * // Partial application
 * const pairwise = aperture(2)
 * pairwise([1, 2, 3, 4])
 * // [[1, 2], [2, 3], [3, 4]]
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const aperture = <T>(
	n: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	if (n <= 0 || n > array.length) {
		return []
	}

	// Create sliding window of size n using functional approach
	return Array.from(
		{ length: array.length - n + 1 },
		(_, i) => array.slice(i, i + n)
	)
}

export default aperture
