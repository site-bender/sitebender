import isNullish from "../../validation/isNullish/index.ts"

//++ Multiplies an Array<number>; returns 1 for empty array; returns NaN on invalid input
/**
 * Multiplies all numbers in an array together
 *
 * Calculates the product of all numbers in the array by multiplying
 * them together sequentially. Returns 1 for an empty array (multiplicative
 * identity). Returns NaN if any element is not a valid number.
 *
 * @param numbers - Array of numbers to multiply
 * @returns The product of all numbers, or NaN if invalid input
 * @example
 * ```typescript
 * // Basic multiplication
 * product([2, 3, 4])
 * // 24
 *
 * product([1, 2, 3, 4, 5])
 * // 120
 *
 * // Empty array returns multiplicative identity
 * product([])
 * // 1
 *
 * // Zero annihilates the product
 * product([1, 2, 0, 3, 4])
 * // 0
 *
 * // Negative numbers
 * product([-2, -3, 4])
 * // 24
 *
 * product([-1, -1, -1])
 * // -1
 *
 * // Decimal numbers
 * product([0.5, 2, 4])
 * // 4
 *
 * // Factorial implementation
 * const factorial = (n: number) =>
 *   product(Array.from({ length: n }, (_, i) => i + 1))
 * factorial(5)
 * // 120
 *
 * // Volume calculation
 * const dimensions = [10, 20, 30]
 * const volume = product(dimensions)
 * // 6000
 * ```
 * @pure Always returns same result for same input
 * @safe Returns NaN for invalid inputs
 */
const product = (
	numbers: Array<number> | null | undefined,
): number => {
	if (isNullish(numbers) || !Array.isArray(numbers)) {
		return NaN
	}

	if (numbers.length === 0) {
		return 1 // multiplicative identity
	}

	// Check for non-numeric values
	const hasInvalidValue = numbers.some(
		(num) => isNullish(num) || typeof num !== "number" || isNaN(num),
	)

	if (hasInvalidValue) {
		return NaN
	}

	// Calculate product using reduce
	return numbers.reduce((acc, num) => acc * num, 1)
}

export default product

//?? [EXAMPLE] product([2, 3, 4]) // 24
//?? [EXAMPLE] product([]) // 1
//?? [EXAMPLE] product([1, NaN, 3]) // NaN
