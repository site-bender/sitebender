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
 * // All subsequences of small array
 * subsequences([1, 2, 3])
 * // [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
 * 
 * // Binary representation
 * subsequences(["a", "b"])
 * // [[], ["a"], ["b"], ["a", "b"]]
 * 
 * // Single element
 * subsequences([1])
 * // [[], [1]]
 * 
 * // Empty array
 * subsequences([])
 * // [[]]
 * 
 * // Generate all subsets
 * subsequences(["x", "y", "z"])
 * // [
 * //   [],
 * //   ["x"],
 * //   ["y"],
 * //   ["x", "y"],
 * //   ["z"],
 * //   ["x", "z"],
 * //   ["y", "z"],
 * //   ["x", "y", "z"]
 * // ]
 * 
 * // Feature combinations
 * const features = ["bold", "italic", "underline"]
 * subsequences(features)
 * // All possible combinations of text formatting options
 * // [[], ["bold"], ["italic"], ["bold", "italic"], ...]
 * 
 * // Menu options
 * const toppings = ["cheese", "pepperoni", "mushrooms"]
 * subsequences(toppings)
 * // All possible pizza combinations
 * 
 * // Power set for set operations
 * subsequences([1, 2, 3, 4])
 * // 16 subsequences (2^4)
 * 
 * // String characters
 * subsequences(["a", "b", "c", "d"])
 * // All possible character selections maintaining order
 * 
 * // Filtering subsequences by length
 * const allSubs = subsequences([1, 2, 3, 4])
 * const length2 = allSubs.filter(sub => sub.length === 2)
 * // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
 * 
 * // Handle null/undefined gracefully
 * subsequences(null)       // [[]]
 * subsequences(undefined)  // [[]]
 * 
 * // Warning: Exponential growth!
 * // subsequences([1,2,3,4,5]).length     // 32 (2^5)
 * // subsequences([1,2,3,4,5,6]).length   // 64 (2^6)
 * // subsequences(Array(10)).length       // 1024 (2^10)
 * // subsequences(Array(20)).length       // 1048576 (2^20)
 * 
 * // Practical example: Test coverage
 * const testFlags = ["verbose", "debug", "strict"]
 * const allFlagCombos = subsequences(testFlags)
 * // Can test with all possible flag combinations
 * 
 * // Permission sets
 * const permissions = ["read", "write", "delete"]
 * subsequences(permissions)
 * // All possible permission combinations for role definitions
 * ```
 * @property Immutable - doesn't modify input array
 * @property Exhaustive - generates all 2^n subsequences
 * @property Order-preserving - maintains original element order
 * @warning Exponential complexity - be careful with large arrays
 */
const subsequences = <T>(
	array: ReadonlyArray<T> | null | undefined
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
		remaining: ReadonlyArray<T>
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
				subseq,                 // Without head
				[head, ...subseq]       // With head
			],
			[]
		)
	}
	
	return buildSubsequences(array)
}

export default subsequences