/**
 * Type guard that checks if a value is strictly null
 *
 * Determines whether a value is exactly null using strict equality (===).
 * This check distinguishes null from undefined and other falsy values.
 * In TypeScript, this narrows the type to null, providing type safety
 * for null-specific operations and checks.
 *
 * Null detection:
 * - Strict check: only null returns true
 * - Not undefined: undefined returns false
 * - Not falsy values: 0, false, "", NaN return false
 * - Type narrowing: provides TypeScript type guard
 * - No coercion: uses strict equality (===)
 *
 * @param value - The value to check for null
 * @returns True if the value is strictly null, false otherwise
 * @example
 * ```typescript
 * // Null values
 * isNull(null)                     // true
 *
 * // Not null
 * isNull(undefined)                // false
 * isNull(0)                        // false
 * isNull(false)                    // false
 * isNull("")                       // false
 * isNull(NaN)                      // false
 * isNull({})                       // false
 *
 * // Type narrowing
 * function processValue(value: string | null): string {
 *   if (isNull(value)) {
 *     return "default"  // value is null here
 *   }
 *   return value.toUpperCase()  // value is string here
 * }
 *
 * // Filtering nulls
 * const mixed = [1, null, undefined, 2, null, 3]
 * const nullValues = mixed.filter(isNull)  // [null, null]
 * ```
 * @pure
 * @predicate
 */
const isNull = (value: unknown): value is null => value === null

export default isNull