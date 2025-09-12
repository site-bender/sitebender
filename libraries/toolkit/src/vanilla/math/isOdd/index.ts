/**
 * Checks if a number is odd
 *
 * Determines whether an integer is not evenly divisible by 2. Returns true
 * for odd numbers, false for even numbers (including zero). Returns false
 * for non-integers, NaN, Infinity, or invalid inputs to support safe
 * error handling in functional pipelines.
 *
 * @param n - Number to check for oddness
 * @returns True if n is odd, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isOdd(3)
 * // true
 *
 * isOdd(4)
 * // false
 *
 * isOdd(0)
 * // false
 *
 * // Negative numbers
 * isOdd(-3)
 * // true
 *
 * isOdd(-4)
 * // false
 *
 * // Non-integers and invalid inputs
 * isOdd(3.5)
 * // false
 *
 * isOdd(NaN)
 * // false
 *
 * isOdd(null)
 * // false
 *
 * // Filtering arrays
 * const numbers = [1, 2, 3, 4, 5, 6]
 * const odds = numbers.filter(isOdd)
 * // [1, 3, 5]
 * ```
 * @pure Always returns same result for same input
 * @predicate Returns boolean indicating oddness
 * @safe Returns false for invalid inputs
 */
import isNullish from "../../validation/isNullish/index.ts"

const isOdd = (
	n: number | null | undefined,
): boolean => {
	if (isNullish(n) || typeof n !== "number") {
		return false
	}

	// Check for special values
	if (!isFinite(n) || isNaN(n)) {
		return false
	}

	// Check for integer
	if (!Number.isInteger(n)) {
		return false
	}

	// Check if not divisible by 2
	return n % 2 !== 0
}

export default isOdd
