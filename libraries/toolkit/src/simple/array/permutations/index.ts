/**
 * Generates all permutations of an array
 *
 * Returns all possible orderings of the array elements. For an array of
 * length n, this generates n! (n factorial) permutations. Each permutation
 * contains all the original elements in a different order.
 *
 * @param array - Array to generate permutations from
 * @returns Array of all possible permutations
 * @example
 * ```typescript
 * // All orderings of 3 elements
 * permutations([1, 2, 3])
 * // [
 * //   [1, 2, 3], [1, 3, 2],
 * //   [2, 1, 3], [2, 3, 1],
 * //   [3, 1, 2], [3, 2, 1]
 * // ]
 *
 * // String permutations
 * permutations(["a", "b", "c"])
 * // [
 * //   ["a", "b", "c"], ["a", "c", "b"],
 * //   ["b", "a", "c"], ["b", "c", "a"],
 * //   ["c", "a", "b"], ["c", "b", "a"]
 * // ]
 *
 * // Task scheduling - all possible orderings
 * const tasks = ["wash", "dry", "fold"]
 * permutations(tasks)
 * // [
 * //   ["wash", "dry", "fold"],
 * //   ["wash", "fold", "dry"],
 * //   ["dry", "wash", "fold"],
 * //   ["dry", "fold", "wash"],
 * //   ["fold", "wash", "dry"],
 * //   ["fold", "dry", "wash"]
 * // ]
 *
 * // Edge cases
 * permutations([])     // [[]]
 * permutations([1])    // [[1]]
 * permutations([1, 2]) // [[1, 2], [2, 1]]
 *
 * // Anagram generation
 * permutations(["c", "a", "t"])
 * // [["c", "a", "t"], ["c", "t", "a"], ["a", "c", "t"], ["a", "t", "c"], ["t", "c", "a"], ["t", "a", "c"]]
 * // Can join to get: ["cat", "cta", "act", "atc", "tca", "tac"]
 *
 * // Handle null/undefined gracefully
 * permutations(null)      // [[]]
 * permutations(undefined) // [[]]
 *
 * // Warning: Factorial growth! Be careful with arrays > 10 elements
 * // permutations([1,2,3,4,5]).length = 120 (5!)
 * // permutations(Array(10)).length = 3,628,800 (10!)
 * ```
 * @pure Function has no side effects
 * @immutable Does not modify input array
 * @safe Handles null/undefined inputs gracefully
 */
const permutations = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array)) {
		return [[]]
	}

	if (array.length === 0) {
		return [[]]
	}

	if (array.length === 1) {
		return [[...array]]
	}

	// Build permutations recursively
	// For each element, make it the first element and permute the rest
	const buildPermutations = (
		elements: ReadonlyArray<T>,
	): Array<Array<T>> => {
		if (elements.length <= 1) {
			return [[...elements]]
		}

		// Use reduce to build all permutations
		return elements.reduce<Array<Array<T>>>((acc, element, index) => {
			// Remove current element from array
			const remaining = [
				...elements.slice(0, index),
				...elements.slice(index + 1),
			]

			// Get all permutations of remaining elements
			const remainingPerms = buildPermutations(remaining)

			// Add current element to front of each permutation
			const currentPerms = remainingPerms.map((perm) => [element, ...perm])

			return [...acc, ...currentPerms]
		}, [])
	}

	return buildPermutations(array)
}

export default permutations
