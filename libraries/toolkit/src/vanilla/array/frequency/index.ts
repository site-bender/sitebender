/**
 * Count occurrences of each unique element in an array
 *
 * Creates a frequency map that counts how many times each unique element
 * appears in the array. Returns a Map where keys are the unique elements
 * and values are their occurrence counts. Useful for statistical analysis,
 * duplicate detection, and data summarization.
 *
 * @pure
 * @immutable
 * @param array - The array to analyze
 * @returns Map with elements as keys and counts as values
 * @example
 * ```typescript
 * // Basic usage
 * frequency([1, 2, 2, 3, 3, 3])              // Map { 1 => 1, 2 => 2, 3 => 3 }
 * frequency(["a", "b", "a", "c", "b", "a"])  // Map { "a" => 3, "b" => 2, "c" => 1 }
 *
 * // Finding most common
 * const counts = frequency([1, 2, 2, 3, 3, 3, 4])
 * const mostCommon = [...counts.entries()].reduce((a, b) => b[1] > a[1] ? b : a)
 * // [3, 3] - element 3 appears 3 times
 *
 * // Edge cases
 * frequency([])                              // Map {}
 * frequency([1, 2, 3, 4, 5])                // Map { 1 => 1, 2 => 1, 3 => 1, 4 => 1, 5 => 1 }
 * ```
 */
const frequency = <T>(array: Array<T>): Map<T, number> => {
	return array.reduce((freq, item) => {
		freq.set(item, (freq.get(item) ?? 0) + 1)
		return freq
	}, new Map<T, number>())
}

export default frequency
