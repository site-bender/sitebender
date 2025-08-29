/**
 * Checks if a value is a finite number
 *
 * Determines whether a value is a number that is neither Infinity, -Infinity, nor NaN.
 * This is a type-safe wrapper around Number.isFinite() that first checks if the value
 * is a number type. Finite numbers are actual numeric values that can be used in
 * mathematical calculations without special handling. This is stricter than the global
 * isFinite() which coerces values.
 *
 * Finite number criteria:
 * - Must be of type "number"
 * - Must not be NaN (Not a Number)
 * - Must not be Infinity or -Infinity
 * - Includes all regular numbers, integers, and decimals
 * - Does not coerce strings or other types
 *
 * @param value - The value to check for finiteness
 * @returns True if the value is a finite number, false otherwise
 * @example
 * ```typescript
 * // Finite numbers
 * isFinite(0)                          // true
 * isFinite(3.14159)                    // true
 * isFinite(-273.15)                    // true
 * isFinite(Number.MAX_VALUE)           // true
 * isFinite(1e308)                      // true (large but finite)
 *
 * // Not finite
 * isFinite(Infinity)                   // false
 * isFinite(-Infinity)                  // false
 * isFinite(NaN)                        // false
 * isFinite(0 / 0)                      // false (NaN)
 * isFinite(1 / 0)                      // false (Infinity)
 *
 * // Non-numbers (no coercion)
 * isFinite("123")                      // false (string)
 * isFinite(null)                       // false
 * isFinite(undefined)                  // false
 *
 * // Filtering valid numbers
 * const values = [1, Infinity, NaN, 2.5, -Infinity, 0, "3", null]
 * const finiteNumbers = values.filter(isFinite)  // [1, 2.5, 0]
 *
 * // Safe division
 * function safeDivide(a: unknown, b: unknown): number | null {
 *   if (isFinite(a) && isFinite(b) && b !== 0) {
 *     return (a as number) / (b as number)
 *   }
 *   return null
 * }
 * safeDivide(10, 2)                    // 5
 * safeDivide(10, 0)                    // null (would be Infinity)
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isFinite = (value: unknown): value is number => Number.isFinite(value)

export default isFinite
