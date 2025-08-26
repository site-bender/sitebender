/**
 * Generates all possible subsequences of an array
 *
 * Returns the power set of the array - all possible combinations of elements
 * while maintaining their original order. This includes the empty array and
 * the full array itself. The number of subsequences is 2^n where n is the
 * array length.
 *
 * @param array - Array to generate subsequences from
 * @returns Array of all possible subsequences
 * @example
 * ```typescript
 * // Basic usage
 * subsequences([1, 2, 3])
 * // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
 *
 * // Single element
 * subsequences([1])  // [[], [1]]
 * 
 * // Empty array
 * subsequences([])   // [[]]
 *
 * // Power set for set operations
 * subsequences(["a", "b"])  // [[], ["a"], ["b"], ["a", "b"]]
 *
 * // Practical use - feature flags
 * const features = ["bold", "italic"]
 * subsequences(features)  // All text formatting combinations
 *
 * // Filter by length
 * const allSubs = subsequences([1, 2, 3])
 * const pairs = allSubs.filter(sub => sub.length === 2)
 * // [[1, 2], [1, 3], [2, 3]]
 *
 * // Null handling
 * subsequences(null)       // [[]]
 * subsequences(undefined)  // [[]]
 * ```
 * @pure
 * @immutable
 * @safe
 * @warning Exponential complexity - 2^n subsequences for n elements
 */
const subsequences = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array)) {
		return [[]]
	}

	if (array.length === 0) {
		return [[]]
	}

	// Build subsequences recursively
	// For each element, we have two choices: include it or exclude it
	const buildSubsequences = (
		remaining: ReadonlyArray<T>,
	): Array<Array<T>> => {
		if (remaining.length === 0) {
			return [[]]
		}

		const [head, ...tail] = remaining
		const tailSubsequences = buildSubsequences(tail)

		// For each subsequence of the tail, create two versions:
		// one without the head, and one with the head
		return tailSubsequences.reduce<Array<Array<T>>>(
			(acc, subseq) => [
				...acc,
				subseq, // Without head
				[head, ...subseq], // With head
			],
			[],
		)
	}

	return buildSubsequences(array)
}

export default subsequences
