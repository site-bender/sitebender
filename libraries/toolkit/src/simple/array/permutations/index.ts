import isNullish from "../../validation/isNullish/index.ts"

/**
 * Generates all permutations of an array
 *
 * Returns all possible orderings of the array elements. For an array of
 * length n, this generates n! (n factorial) permutations. Each permutation
 * contains all the original elements in a different order.
 * Warning: Factorial growth! Be careful with arrays > 10 elements.
 *
 * @param array - Array to generate permutations from
 * @returns Array of all possible permutations
 *
 * @pure
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // All orderings of 3 elements
 * permutations([1, 2, 3])
 * // [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
 *
 * // String permutations
 * permutations(["a", "b", "c"])
 * // [["a", "b", "c"], ["a", "c", "b"], ["b", "a", "c"],
 * //  ["b", "c", "a"], ["c", "a", "b"], ["c", "b", "a"]]
 *
 * // Two elements
 * permutations([1, 2]) // [[1, 2], [2, 1]]
 *
 * // Edge cases
 * permutations([])  // [[]]
 * permutations([1]) // [[1]]
 * permutations(null) // [[]]
 *
 * // Warning: 5 elements = 120 permutations
 * permutations([1,2,3,4,5]).length // 120
 * ```
 */
const permutations = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array)) {
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
