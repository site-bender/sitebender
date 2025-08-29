/**
 * Checks if a value is NaN (Not a Number)
 *
 * Determines whether a value is the special NaN value using Number.isNaN().
 * This is the only reliable way to check for NaN since NaN !== NaN in JavaScript.
 * Unlike the global isNaN() function, Number.isNaN() doesn't coerce the value,
 * making it type-safe. NaN typically results from invalid mathematical operations
 * or failed number conversions.
 *
 * NaN detection:
 * - Only returns true for actual NaN value
 * - No type coercion (unlike global isNaN)
 * - NaN is the only value that is not equal to itself
 * - Common sources: 0/0, Math.sqrt(-1), parseInt("abc")
 * - Type-safe: non-numbers always return false
 *
 * @param value - The value to check for NaN
 * @returns True if the value is NaN, false otherwise
 * @example
 * ```typescript
 * // Actual NaN values
 * isNaN(NaN)                           // true
 * isNaN(0 / 0)                         // true
 * isNaN(Math.sqrt(-1))                 // true
 * isNaN(parseInt("abc"))               // true
 *
 * // Not NaN (valid numbers)
 * isNaN(0)                             // false
 * isNaN(Infinity)                      // false
 * isNaN(-Infinity)                     // false
 *
 * // Non-numbers (no coercion)
 * isNaN("NaN")                         // false (string)
 * isNaN(null)                          // false
 * isNaN(undefined)                     // false
 *
 * // NaN's unique property
 * const value = NaN
 * value === value                      // false (only NaN !== NaN)
 *
 * // Filtering out NaN values
 * const numbers = [1, NaN, 2, 0/0, 3, 4]
 * const validNumbers = numbers.filter(n => !isNaN(n))  // [1, 2, 3, 4]
 *
 * // Safe division
 * function safeDivide(a: number, b: number): number | null {
 *   const result = a / b
 *   return isNaN(result) ? null : result
 * }
 * safeDivide(0, 0)                     // null (0/0 is NaN)
 * safeDivide(10, 0)                    // Infinity (not NaN)
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isNaN = (value: unknown): value is number => Number.isNaN(value)

export default isNaN
