/**
 * Checks if a value is an odd number
 *
 * Determines whether a value is an odd integer using the modulo operator.
 * Returns true for odd integers, false for even integers, non-integers,
 * and non-numeric values. Uses strict integer checking to ensure the value
 * is a whole number before testing oddness. This is useful for mathematical
 * operations, alternating patterns, and parity-based logic.
 *
 * Odd number rules:
 * - Must be a valid number (not NaN or Infinity)
 * - Must be an integer (no decimal part)
 * - Must not be divisible by 2 (remainder of 1 or -1)
 * - Includes positive and negative odd numbers
 * - Zero is not odd (it's even)
 * - Non-numbers return false
 *
 * @param value - The value to check for oddness
 * @returns True if the value is an odd integer, false otherwise
 * @example
 * ```typescript
 * // Basic checks
 * isOdd(1)                             // true
 * isOdd(3)                             // true
 * isOdd(0)                             // false (zero is even)
 * isOdd(2)                             // false
 * isOdd(-1)                            // true
 * isOdd(-2)                            // false
 * isOdd(1.5)                           // false (not integer)
 * isOdd(NaN)                           // false
 *
 * // Array filtering
 * const numbers = [1, 2, 3, 4, 5]
 * const odds = numbers.filter(isOdd)  // [1, 3, 5]
 *
 * // Alternating layout
 * const getClass = (index: number): string =>
 *   isOdd(index) ? "odd-item" : "even-item"
 *
 * [0, 1, 2, 3].map(getClass)
 * // ["even-item", "odd-item", "even-item", "odd-item"]
 *
 * // Checkerboard pattern
 * const isBlackSquare = (row: number, col: number): boolean =>
 *   isOdd(row + col)
 *
 * isBlackSquare(0, 1)                 // true
 * isBlackSquare(1, 1)                 // false
 * ```
 * @pure
 * @predicate
 */
const isOdd = (value: unknown): boolean => {
	// Check if it's a number and an integer
	if (typeof value !== "number" || !Number.isInteger(value)) {
		return false
	}

	// Check if it's finite (not NaN or Infinity)
	if (!Number.isFinite(value)) {
		return false
	}

	// Check if not divisible by 2 (remainder is 1 or -1)
	return value % 2 !== 0
}

export default isOdd
