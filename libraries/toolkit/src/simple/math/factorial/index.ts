import isNullish from "../../validation/isNullish/index.ts"

/**
 * Calculates the factorial of a non-negative integer
 *
 * Computes n! (n factorial), which is the product of all positive integers
 * less than or equal to n. By definition, 0! = 1. Only works with
 * non-negative integers up to 170 (beyond which JavaScript returns Infinity).
 * Returns NaN for negative numbers, non-integers, or invalid inputs.
 *
 * @param n - Non-negative integer to calculate factorial of
 * @returns Factorial of n (n!), or NaN if invalid
 * @example
 * ```typescript
 * factorial(0)
 * // 1
 *
 * factorial(5)
 * // 120
 *
 * factorial(10)
 * // 3628800
 *
 * factorial(21)
 * // 51090942171709440000
 *
 * factorial(170)
 * // 7.257415615307994e+306
 *
 * factorial(171)
 * // Infinity
 *
 * factorial(-1)
 * // NaN
 *
 * factorial(null)
 * // NaN
 * ```
 * @pure - Always returns same result for same input
 * @safe - Returns NaN for invalid inputs
 */
const factorial = (
	n: number | null | undefined,
): number => {
	if (isNullish(n) || typeof n !== "number") {
		return NaN
	}

	// Check for non-integer
	if (!Number.isInteger(n)) {
		return NaN
	}

	// Check for negative
	if (n < 0) {
		return NaN
	}

	// Check for values that would overflow
	if (n > 170) {
		return Infinity
	}

	// Base cases
	if (n === 0 || n === 1) {
		return 1
	}

	// Calculate factorial iteratively (more efficient than recursion)
	let result = 1
	for (let i = 2; i <= n; i++) {
		result *= i
	}

	return result
}

export default factorial
