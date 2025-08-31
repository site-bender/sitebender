import isNullish from "../../validation/isNullish/index.ts"

/**
 * Finds the median value of an array of numbers
 *
 * Calculates the middle value when the array is sorted. For arrays with
 * an odd number of elements, returns the middle element. For arrays with
 * an even number of elements, returns the average of the two middle elements.
 * Returns NaN for empty arrays or arrays containing non-numeric values.
 *
 * @param numbers - Array of numbers to find the median of
 * @returns The median value, or NaN if invalid input
 * @example
 * ```typescript
 * // Odd number of elements
 * median([3, 1, 2])
 * // 2
 *
 * median([5, 2, 8, 1, 9])
 * // 5
 *
 * // Even number of elements
 * median([1, 2, 3, 4])
 * // 2.5
 *
 * median([10, 20])
 * // 15
 *
 * // Negative numbers
 * median([-5, -2, -8, -1, -3])
 * // -3
 *
 * // Duplicate values
 * median([5, 5, 5, 5, 5])
 * // 5
 *
 * // Invalid inputs
 * median([])
 * // NaN
 *
 * median([1, NaN, 3])
 * // NaN
 *
 * // Statistical examples
 * const testScores = [85, 92, 78, 95, 88, 73, 98]
 * median(testScores)
 * // 88
 *
 * // Outlier resistance
 * const dataset = [1, 2, 3, 4, 100]
 * median(dataset)
 * // 3 (not affected by outlier 100)
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const median = (
	numbers: Array<number> | null | undefined,
): number => {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (numbers.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		(num) => isNullish(num) || typeof num !== "number" || isNaN(num),
	)

	if (hasInvalidValue) {
		return NaN
	}

	// Create a sorted copy to avoid mutating the input
	const sorted = [...numbers].sort((a, b) => a - b)

	const middle = Math.floor(sorted.length / 2)

	// If odd number of elements, return the middle one
	if (sorted.length % 2 !== 0) {
		return sorted[middle]
	}

	// If even number of elements, return average of the two middle ones
	return (sorted[middle - 1] + sorted[middle]) / 2
}

export default median
