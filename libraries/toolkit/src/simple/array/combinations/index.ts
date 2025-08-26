/**
 * Generates all combinations of specified size from an array
 *
 * Returns all possible selections of k elements from an array of n elements,
 * where order doesn't matter. This generates "n choose k" combinations.
 * Unlike permutations, [1,2] and [2,1] are considered the same combination.
 *
 * @param k - Number of elements to select
 * @param array - Array to select elements from
 * @returns Array of all k-element combinations
 * @example
 * ```typescript
 * // Basic usage
 * combinations(2)([1, 2, 3, 4])
 * // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
 *
 * combinations(3)(["a", "b", "c", "d"])
 * // [["a", "b", "c"], ["a", "b", "d"], ["a", "c", "d"], ["b", "c", "d"]]
 *
 * // Special cases
 * combinations(1)([1, 2, 3])  // [[1], [2], [3]]
 * combinations(3)([1, 2, 3])  // [[1, 2, 3]]
 * combinations(0)([1, 2, 3])  // [[]]
 * combinations(5)([1, 2, 3])  // []
 *
 * // Team selection
 * const players = ["Alice", "Bob", "Charlie", "Dave"]
 * combinations(2)(players)
 * // [["Alice", "Bob"], ["Alice", "Charlie"], ["Alice", "Dave"], ["Bob", "Charlie"], ["Bob", "Dave"], ["Charlie", "Dave"]]
 *
 * // Partial application
 * const pickTwo = combinations(2)
 * pickTwo([1, 2, 3])        // [[1, 2], [1, 3], [2, 3]]
 * pickTwo(["x", "y", "z"])   // [["x", "y"], ["x", "z"], ["y", "z"]]
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const combinations = <T>(
	k: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	if (k < 0 || !Number.isInteger(k)) {
		return []
	}

	if (k === 0) {
		return [[]]
	}

	if (k > array.length) {
		return []
	}

	if (k === array.length) {
		return [[...array]]
	}

	// Build combinations recursively
	const buildCombinations = (
		elements: ReadonlyArray<T>,
		size: number,
		start: number,
	): Array<Array<T>> => {
		if (size === 0) {
			return [[]]
		}

		if (start >= elements.length) {
			return []
		}

		if (elements.length - start < size) {
			return []
		}

		// For each element, we have two choices:
		// 1. Include it in the combination (and pick size-1 more from remaining)
		// 2. Skip it (and pick size from remaining)

		const element = elements[start]

		// Include current element
		const withCurrent = buildCombinations(elements, size - 1, start + 1)
			.map((combo) => [element, ...combo])

		// Skip current element
		const withoutCurrent = buildCombinations(elements, size, start + 1)

		return [...withCurrent, ...withoutCurrent]
	}

	return buildCombinations(array, k, 0)
}

export default combinations
