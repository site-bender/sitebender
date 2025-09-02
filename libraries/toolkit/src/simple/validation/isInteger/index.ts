/**
 * Checks if a value is an integer
 *
 * Determines whether a value is a whole number with no fractional component.
 * Uses Number.isInteger() internally, which checks if the value is a finite
 * number without a decimal part. This includes positive integers, negative
 * integers, and zero, but excludes Infinity, -Infinity, NaN, and non-numeric types.
 *
 * Integer criteria:
 * - Must be of type "number"
 * - Must be finite (not Infinity, -Infinity, or NaN)
 * - Must have no fractional component
 * - Includes positive, negative, and zero
 * - Safe and unsafe integers both return true
 *
 * @param value - The value to check
 * @returns True if the value is an integer, false otherwise
 * @example
 * ```typescript
 * // Basic integer checks
 * isInteger(42)              // true
 * isInteger(-42)             // true
 * isInteger(0)               // true
 * isInteger(1.5)             // false
 * isInteger(NaN)             // false
 *
 * // Edge cases
 * isInteger(1.0)             // true (no fractional part)
 * isInteger(Number.MAX_SAFE_INTEGER)  // true
 * isInteger("5")            // false (string)
 * isInteger(null)            // false
 *
 * // Filter integers from mixed array
 * const values = [1, 1.5, 2, Math.PI, 3, "4"]
 * values.filter(isInteger)  // [1, 2, 3]
 *
 * // Validation helper
 * const isValidIndex = (val: unknown, len: number): boolean =>
 *   isInteger(val) && val >= 0 && val < len
 *
 * // Port number validation
 * const isValidPort = (port: unknown): boolean =>
 *   isInteger(port) && port >= 0 && port <= 65535
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isInteger = (value: unknown): value is number => Number.isInteger(value)

export default isInteger
