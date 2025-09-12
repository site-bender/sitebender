import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the arithmetic mean of an array of numbers
 *
 * Computes the average value by summing all numbers and dividing by
 * the count. Returns NaN for empty arrays or arrays containing
 * non-numeric values, enabling safe error handling in functional
 * pipelines. Also available as the `mean` alias.
 *
 * @param numbers - Array of numbers to average
 * @returns Arithmetic mean of the numbers, or NaN if invalid
 * @example
 * ```typescript
 * // Basic usage
 * average([1, 2, 3, 4, 5])   // 3
 * average([10, 20, 30])      // 20
 * average([42])              // 42
 *
 * // Mixed values
 * average([-5, 0, 5])        // 0
 * average([0.1, 0.2, 0.3])   // 0.2
 *
 * // Edge cases
 * average([])                // NaN
 * average(null)              // NaN
 * average([1, NaN, 3])       // NaN
 *
 * // Special values
 * average([Infinity, 1, 2])  // Infinity
 *
 * // Practical use - grade calculation
 * const calculateGrade = (scores: Array<number>): string => {
 *   const avg = average(scores)
 *   return avg >= 90 ? 'A' : avg >= 80 ? 'B' : avg >= 70 ? 'C' : 'F'
 * }
 * calculateGrade([92, 88, 95, 90])  // 'A'
 *
 * // Composition with other functions
 * const scores = [85, 92, 78, 95, 88]
 * const rounded = Math.round(average(scores))  // 88
 * ```
 * @pure
 */
const average = (
	numbers: Array<number> | null | undefined,
): number => {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (numbers.length === 0) {
		return NaN
	}

	// Check for non-numeric values
	const hasInvalid = numbers.some((num) => typeof num !== "number")
	if (hasInvalid) {
		return NaN
	}

	const sum = numbers.reduce((acc, num) => acc + num, 0)
	return sum / numbers.length
}

export default average
