import isNullish from "../../validation/isNullish/index.ts"

import isEmpty from "../../array/isEmpty/index.ts"

/**
 * Sums all numbers in an array
 *
 * Calculates the total sum of all numbers in the array by adding
 * them together sequentially. Returns 0 for an empty array (additive
 * identity). Returns NaN if any element is not a valid number.
 *
 * @param numbers - Array of numbers to sum
 * @returns The sum of all numbers, or NaN if invalid input
 * @example
 * ```typescript
 * // Basic addition
 * sum([1, 2, 3, 4, 5])
 * // 15
 *
 * sum([10, 20, 30])
 * // 60
 *
 * // Empty array returns additive identity
 * sum([])
 * // 0
 *
 * // Mixed positive and negative
 * sum([10, -5, 3, -2])
 * // 6
 *
 * // Financial calculations
 * const expenses = [120.50, 45.75, 89.99, 234.00]
 * const totalExpenses = sum(expenses)
 * // 490.24
 *
 * // Statistics
 * const scores = [85, 92, 78, 95, 88]
 * const average = sum(scores) / scores.length
 * // 87.6
 *
 * // Array method chaining
 * const data = [1, 2, 3, 4, 5]
 * const doubledSum = sum(data.map(x => x * 2))
 * // 30
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const sum = (
	numbers: Array<number> | null | undefined,
): number => {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (isEmpty(numbers)) {
		return 0 // additive identity
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		(num) => isNullish(num) || typeof num !== "number" || isNaN(num),
	)

	if (hasInvalidValue) {
		return NaN
	}

	// Calculate sum using reduce
	return numbers.reduce((acc, num) => acc + num, 0)
}

export default sum
