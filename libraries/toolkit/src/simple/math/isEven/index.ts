/**
 * Checks if a number is even
 *
 * Determines whether an integer is evenly divisible by 2. Returns true
 * for even numbers (including zero), false for odd numbers. Returns false
 * for non-integers, NaN, Infinity, or invalid inputs to support safe
 * error handling in functional pipelines.
 *
 * @param n - Number to check for evenness
 * @returns True if n is even, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isEven(4)
 * // true
 *
 * isEven(5)
 * // false
 *
 * isEven(0)
 * // true
 *
 * // Negative numbers
 * isEven(-2)
 * // true
 *
 * isEven(-3)
 * // false
 *
 * // Non-integers and invalid inputs
 * isEven(2.5)
 * // false
 *
 * isEven(NaN)
 * // false
 *
 * isEven(null)
 * // false
 *
 * // Filtering arrays
 * const numbers = [1, 2, 3, 4, 5, 6]
 * const evens = numbers.filter(isEven)
 * // [2, 4, 6]
 * ```
 * @pure Always returns same result for same input
 * @predicate Returns boolean indicating evenness
 * @safe Returns false for invalid inputs
 */
const isEven = (
	n: number | null | undefined,
): boolean => {
	if (n == null || typeof n !== "number") {
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

	// Check if divisible by 2
	return n % 2 === 0
}

export default isEven
