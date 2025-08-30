/**
 * Checks if a value is an even number
 *
 * Determines whether a value is an even integer using the modulo operator.
 * Returns true for even integers (including 0), false for odd integers,
 * non-integers, and non-numeric values. Uses strict integer checking to
 * ensure the value is a whole number before testing evenness. This is
 * useful for mathematical operations, filtering, and validation.
 *
 * Even number rules:
 * - Must be a valid number (not NaN or Infinity)
 * - Must be an integer (no decimal part)
 * - Must be divisible by 2 with no remainder
 * - Zero is considered even
 * - Negative even numbers return true
 * - Non-numbers return false
 *
 * @param value - The value to check for evenness
 * @returns True if the value is an even integer, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isEven(0)     // true (zero is even)
 * isEven(2)     // true
 * isEven(4)     // true
 * isEven(1)     // false
 * isEven(3)     // false
 * isEven(-2)    // true
 * isEven(-1)    // false
 *
 * // Non-integers and edge cases
 * isEven(2.5)         // false (not an integer)
 * isEven(2.0)         // true (integer value)
 * isEven(NaN)         // false
 * isEven(Infinity)    // false
 * isEven("2")         // false (string)
 * isEven(null)        // false
 *
 * // Array filtering
 * const numbers = [1, 2, 3, 4, 5, 6]
 * const evens = numbers.filter(isEven)  // [2, 4, 6]
 *
 * // Alternating styles
 * const getRowClass = (index: number): string =>
 *   isEven(index) ? "even-row" : "odd-row"
 *
 * [0, 1, 2, 3].map(getRowClass)
 * // ["even-row", "odd-row", "even-row", "odd-row"]
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isEven = (value: unknown): boolean => {
	// Check if it's a number and an integer
	if (typeof value !== "number" || !Number.isInteger(value)) {
		return false
	}

	// Check if it's finite (not NaN or Infinity)
	if (!Number.isFinite(value)) {
		return false
	}

	// Check if divisible by 2
	return value % 2 === 0
}

export default isEven
