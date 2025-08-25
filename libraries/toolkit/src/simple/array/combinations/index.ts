/**
 * Generates all combinations of specified size from an array
 *
 * Returns all possible selections of k elements from an array of n elements,
 * where order doesn't matter. This generates "n choose k" combinations.
 * Unlike permutations, [1,2] and [2,1] are considered the same combination.
 *
 * @curried (k) => (array) => result
 * @param k - Number of elements to select
 * @param array - Array to select elements from
 * @returns Array of all k-element combinations
 * @example
 * ```typescript
 * // Choose 2 from 4
 * combinations(2)([1, 2, 3, 4])
 * // [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
 *
 * // Choose 3 from 5
 * combinations(3)(["a", "b", "c", "d", "e"])
 * // [
 * //   ["a", "b", "c"], ["a", "b", "d"], ["a", "b", "e"],
 * //   ["a", "c", "d"], ["a", "c", "e"], ["a", "d", "e"],
 * //   ["b", "c", "d"], ["b", "c", "e"], ["b", "d", "e"],
 * //   ["c", "d", "e"]
 * // ]
 *
 * // Choose 1 (all individual elements)
 * combinations(1)([1, 2, 3])
 * // [[1], [2], [3]]
 *
 * // Choose all (only one way)
 * combinations(3)([1, 2, 3])
 * // [[1, 2, 3]]
 *
 * // Choose 0 (empty selection)
 * combinations(0)([1, 2, 3])
 * // [[]]
 *
 * // Choose more than available
 * combinations(5)([1, 2, 3])
 * // []
 *
 * // Team selection
 * const players = ["Alice", "Bob", "Charlie", "Dave", "Eve"]
 * combinations(3)(players)
 * // All possible 3-person teams
 *
 * // Menu combinations
 * const dishes = ["salad", "soup", "pasta", "pizza", "dessert"]
 * combinations(2)(dishes)
 * // All possible 2-dish combinations
 *
 * // Lottery numbers
 * const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * combinations(6)(numbers)
 * // All possible 6-number selections (210 combinations)
 *
 * // Feature flags
 * const features = ["A", "B", "C", "D"]
 * combinations(2)(features)
 * // All ways to enable exactly 2 features
 * // [["A","B"], ["A","C"], ["A","D"], ["B","C"], ["B","D"], ["C","D"]]
 *
 * // Card hands
 * const cards = ["A♠", "K♠", "Q♠", "J♠", "10♠"]
 * combinations(3)(cards)
 * // All possible 3-card hands
 *
 * // Partial application for reusable selectors
 * const pickTwo = combinations(2)
 * pickTwo([1, 2, 3])        // [[1,2], [1,3], [2,3]]
 * pickTwo(["x", "y", "z"])   // [["x","y"], ["x","z"], ["y","z"]]
 *
 * const pickThree = combinations(3)
 * pickThree([1, 2, 3, 4])   // [[1,2,3], [1,2,4], [1,3,4], [2,3,4]]
 *
 * // Edge cases
 * combinations(2)([1])       // []  (not enough elements)
 * combinations(2)([])        // []  (empty array)
 * combinations(-1)([1, 2])   // []  (invalid k)
 *
 * // Handle null/undefined gracefully
 * combinations(2)(null)       // []
 * combinations(2)(undefined)  // []
 *
 * // Binomial coefficient calculation
 * // C(n,k) = n! / (k! * (n-k)!)
 * // C(5,2) = 10
 * combinations(2)([1, 2, 3, 4, 5]).length  // 10
 *
 * // C(6,3) = 20
 * combinations(3)([1, 2, 3, 4, 5, 6]).length  // 20
 *
 * // Test case generation
 * const testInputs = ["input1", "input2", "input3", "input4"]
 * combinations(2)(testInputs)
 * // All pairs of inputs to test together
 *
 * // Color palette selection
 * const colors = ["red", "blue", "green", "yellow", "purple"]
 * combinations(3)(colors)
 * // All 3-color palettes
 * ```
 * @property Immutable - doesn't modify input array
 * @property Unordered - [1,2] and [2,1] are the same combination
 * @property Mathematical - generates exactly C(n,k) combinations
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
