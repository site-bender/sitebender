/**
 * Checks if a value is a positive number
 *
 * Determines whether a value is a finite number greater than zero. This includes
 * positive integers and positive decimals, but excludes 0, +0 (which are neither
 * positive nor negative), Infinity, NaN, and non-numeric types. Useful for validation,
 * mathematical operations, and domain checking where positive values are required.
 *
 * Positive number criteria:
 * - Must be of type "number"
 * - Must be finite (not Infinity or NaN)
 * - Must be greater than zero
 * - Excludes zero (0 and +0)
 * - No type coercion
 *
 * @param value - The value to check for positivity
 * @returns True if the value is a positive finite number, false otherwise
 * @example
 * ```typescript
 * // Basic checks
 * isPositive(1)                        // true
 * isPositive(42)                       // true
 * isPositive(0.5)                      // true
 * isPositive(0)                        // false (zero not positive)
 * isPositive(-1)                       // false
 * isPositive(Infinity)                 // false (not finite)
 * isPositive(NaN)                      // false
 * isPositive("5")                      // false (no coercion)
 *
 * // Filtering positive numbers
 * const numbers = [5, -3, 0, 7, -2, 0.1, NaN]
 * const positives = numbers.filter(isPositive)  // [5, 7, 0.1]
 *
 * // Financial validation
 * const getCredits = (transactions: Array<{ amount: number }>) =>
 *   transactions.filter(t => isPositive(t.amount))
 *
 * // Dimension validation
 * const validateDimensions = (width: number, height: number): boolean =>
 *   isPositive(width) && isPositive(height)
 *
 * validateDimensions(10, 20)          // true
 * validateDimensions(10, 0)           // false
 *
 * // Mathematical domain checking
 * const safeLn = (value: unknown): number | null =>
 *   isPositive(value) ? Math.log(value as number) : null
 *
 * safeLn(Math.E)                      // 1
 * safeLn(0)                           // null (log undefined)
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isPositive = (value: unknown): boolean => {
	return typeof value === "number" &&
		Number.isFinite(value) &&
		value > 0
}

export default isPositive
