/**
 * Checks if a value is a negative number
 *
 * Determines whether a value is a finite number less than zero. This includes
 * negative integers and negative decimals, but excludes -0 (which is considered
 * neither positive nor negative in JavaScript), -Infinity, NaN, and non-numeric types.
 * Useful for validation, mathematical operations, and domain checking.
 *
 * Negative number criteria:
 * - Must be of type "number"
 * - Must be finite (not -Infinity or NaN)
 * - Must be less than zero
 * - Excludes -0 (negative zero)
 * - No type coercion
 *
 * @param value - The value to check for negativity
 * @returns True if the value is a negative finite number, false otherwise
 * @example
 * ```typescript
 * // Negative numbers
 * isNegative(-1)                       // true
 * isNegative(-42)                      // true
 * isNegative(-0.5)                     // true
 * isNegative(-Math.PI)                 // true
 *
 * // Not negative
 * isNegative(0)                        // false
 * isNegative(-0)                       // false (negative zero excluded)
 * isNegative(1)                        // false
 * isNegative(-Infinity)                // false (not finite)
 * isNegative(NaN)                      // false
 *
 * // Non-numeric types (no coercion)
 * isNegative("-5")                     // false (string)
 * isNegative(null)                     // false
 * isNegative([-5])                     // false (array)
 *
 * // Filtering negative numbers
 * const numbers = [5, -3, 0, -7, 2, -0, NaN, -Infinity, -1.5]
 * const negatives = numbers.filter(isNegative)  // [-3, -7, -1.5]
 *
 * // Financial calculations
 * function getDebits(transactions: Array<{amount: number}>): Array<{amount: number}> {
 *   return transactions.filter(t => isNegative(t.amount))
 * }
 *
 * // Mathematical domain check
 * function canTakeSquareRoot(value: unknown): boolean {
 *   if (typeof value !== "number") return false
 *   return !isNegative(value)  // sqrt of negative would be NaN
 * }
 * canTakeSquareRoot(9)                 // true
 * canTakeSquareRoot(-9)                // false
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isNegative = (value: unknown): boolean => {
	return typeof value === "number" &&
		Number.isFinite(value) &&
		value < 0 &&
		!Object.is(value, -0)
}

export default isNegative
