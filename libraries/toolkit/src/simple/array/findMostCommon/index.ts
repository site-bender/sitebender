/**
 * Finds the most frequently occurring element(s)
 *
 * Returns an array of the element(s) that appear most frequently
 * in the input array. When multiple elements have the same maximum
 * frequency, all are returned in order of first occurrence.
 *
 * @param array - Array to analyze for most common elements
 * @returns Array of the most frequently occurring element(s)
 * @example
 * ```typescript
 * // Single most common element
 * findMostCommon([1, 2, 3, 2, 4, 2, 5])
 * // [2]
 *
 * // Multiple elements with same frequency
 * findMostCommon([1, 1, 2, 2, 3, 3])
 * // [1, 2, 3]
 *
 * // String array
 * findMostCommon(["apple", "banana", "apple", "cherry", "banana", "apple"])
 * // ["apple"]
 *
 * // All unique elements (all equally common)
 * findMostCommon([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // Single element
 * findMostCommon([42])
 * // [42]
 *
 * // Multiple occurrences
 * findMostCommon([1, 1, 1, 2, 2, 3])
 * // [1]
 *
 * // Mixed types
 * findMostCommon([1, "1", 2, "2", 1, "1", 2])
 * // [1, "1", 2] (1 and "1" are different, both appear twice like 2)
 *
 * // Objects (by reference)
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * findMostCommon([obj1, obj2, obj1, obj2, obj1])
 * // [{ id: 1 }]
 *
 * // Find most common word
 * const text = "the quick brown fox jumps over the lazy dog the fox"
 * const words = text.split(" ")
 * findMostCommon(words)
 * // ["the", "fox"] (both appear twice)
 *
 * // Find most common rating
 * const ratings = [5, 4, 5, 3, 5, 4, 4, 5, 2, 5]
 * findMostCommon(ratings)
 * // [5]
 *
 * // Survey responses
 * const responses = ["yes", "no", "yes", "maybe", "yes", "no"]
 * findMostCommon(responses)
 * // ["yes"]
 *
 * // Vote counting
 * const votes = ["Alice", "Bob", "Alice", "Charlie", "Bob", "Alice"]
 * findMostCommon(votes)
 * // ["Alice"]
 *
 * // Most common character
 * const chars = "hello world".split("")
 * findMostCommon(chars)
 * // ["l"] (appears 3 times)
 *
 * // Boolean values
 * findMostCommon([true, false, true, true, false])
 * // [true]
 *
 * // Null and undefined
 * findMostCommon([null, undefined, null, 1, undefined, null])
 * // [null]
 *
 * // NaN handling (NaN !== NaN)
 * findMostCommon([NaN, NaN, 1, 1])
 * // [1] (NaN is never equal to itself)
 *
 * // Empty array
 * findMostCommon([])
 * // []
 *
 * // Handle null/undefined gracefully
 * findMostCommon(null)
 * // []
 * findMostCommon(undefined)
 * // []
 *
 * // Analyze error codes
 * const errorCodes = [404, 500, 404, 403, 404, 500, 200]
 * findMostCommon(errorCodes)
 * // [404]
 *
 * // Product categories
 * const purchases = ["electronics", "books", "electronics", "clothing", "electronics", "books"]
 * findMostCommon(purchases)
 * // ["electronics"]
 *
 * // Tie-breaking maintains order
 * findMostCommon([3, 1, 2, 1, 3, 2])
 * // [3, 1, 2] (all appear twice, returned in order of first occurrence)
 * ```
 * @property Immutable - doesn't modify input array
 * @property Order-preserving - maintains order of first occurrence when there are ties
 * @property Reference-based - uses === for comparison
 */
const findMostCommon = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Count frequencies while preserving order of first occurrence
	const frequencyMap = new Map<T, number>()
	const firstOccurrence = new Map<T, number>()

	array.forEach((item, index) => {
		if (!frequencyMap.has(item)) {
			firstOccurrence.set(item, index)
		}
		frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1)
	})

	// Find the maximum frequency
	let maxFrequency = 0
	for (const count of frequencyMap.values()) {
		if (count > maxFrequency) {
			maxFrequency = count
		}
	}

	// Collect all elements with maximum frequency
	const mostCommon: Array<T> = []
	for (const [item, count] of frequencyMap.entries()) {
		if (count === maxFrequency) {
			mostCommon.push(item)
		}
	}

	// Sort by first occurrence to maintain order
	mostCommon.sort((a, b) => {
		const indexA = firstOccurrence.get(a) ?? 0
		const indexB = firstOccurrence.get(b) ?? 0
		return indexA - indexB
	})

	return mostCommon
}

export default findMostCommon
