import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the most frequent value(s) in an Array<number>; returns [] on invalid input
/**
 * Finds the most frequent value(s) in an array of numbers
 *
 * Returns an array containing the value(s) that appear most frequently
 * in the input array. If multiple values share the highest frequency,
 * all are returned in ascending order. Returns an empty array for
 * empty input or arrays containing non-numeric values.
 *
 * @param numbers - Array of numbers to find the mode(s) of
 * @returns Array of most frequent value(s), or empty array if invalid
 * @example
 * ```typescript
 * mode([1, 2, 2, 3, 4])
 * // [2]
 *
 * mode([1, 1, 2, 2, 3])
 * // [1, 2]
 *
 * mode([1, 2, 3, 4, 5])
 * // [1, 2, 3, 4, 5] (all equally frequent)
 *
 * mode([-1, -1, -2, -2, -3])
 * // [-2, -1]
 *
 * mode([1.5, 2.5, 1.5, 3.5])
 * // [1.5]
 *
 * mode([Infinity, Infinity, 1, 2])
 * // [Infinity]
 *
 * mode([])
 * // []
 * ```
 * @pure Always returns same result for same input
 * @safe Returns empty array for invalid inputs
 * @deterministic Results are always sorted in ascending order
 * @complete Returns all values with highest frequency
 */
export default function mode(
	numbers: Array<number> | null | undefined,
): Array<number> {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return []
	}

	if (numbers.length === 0) {
		return []
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(function checkInvalidNumber(num) {
		return isNullish(num) || typeof num !== "number" || isNaN(num)
	})

	if (hasInvalidValue) {
		return []
	}

	// Count frequencies using reduce
	const frequency = numbers.reduce(function countFrequencies(acc, num) {
		acc.set(num, (acc.get(num) || 0) + 1)
		return acc
	}, new Map<number, number>())

	// Find maximum frequency using reduce
	const maxFrequency = Array.from(frequency.values()).reduce(
		function findMaximumFrequency(max, count) {
			return count > max ? count : max
		},
		0,
	)

	// Collect all values with maximum frequency and sort
	return Array.from(frequency.entries())
		.filter(function hasMaxFrequency([_, count]) {
			return count === maxFrequency
		})
		.map(function extractValue([value, _]) {
			return value
		})
		.sort(function sortAscending(a, b) {
			return a - b
		})
}

//?? [EXAMPLE] mode([1, 2, 2, 3, 4]) // [2]
//?? [EXAMPLE] mode([1, 1, 2, 2, 3]) // [1, 2]
//?? [EXAMPLE] mode([]) // []
