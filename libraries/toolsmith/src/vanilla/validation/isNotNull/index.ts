/**
 * Type guard that checks if a value is not null
 *
 * Determines whether a value is anything except null using strict inequality (!==).
 * This includes undefined, all falsy values, and all truthy values - everything
 * except null itself. In TypeScript, this narrows the type to exclude null,
 * enabling safe operations on potentially null values.
 *
 * Non-null detection:
 * - Excludes only null: null returns false
 * - Includes undefined: undefined returns true
 * - Includes all other values: 0, false, "", etc. return true
 * - Type narrowing: excludes null from type union
 * - Strict check: uses !== for precise comparison
 *
 * @param value - The value to check for non-null status
 * @returns True if the value is not null, false if it is null
 * @example
 * ```typescript
 * // Non-null values
 * isNotNull(undefined)             // true
 * isNotNull(0)                     // true
 * isNotNull(false)                 // true
 * isNotNull("")                    // true
 * isNotNull("hello")               // true
 * isNotNull({})                    // true
 *
 * // Null values
 * isNotNull(null)                  // false
 *
 * // Type narrowing
 * function processValue<T>(value: T | null): T {
 *   if (isNotNull(value)) {
 *     return value  // value is T here, not null
 *   }
 *   throw new Error("Value cannot be null")
 * }
 *
 * // Filtering out nulls
 * const mixed = [1, null, undefined, 2, null, 3]
 * const nonNulls = mixed.filter(isNotNull)  // [1, undefined, 2, 3]
 * ```
 * @pure
 * @predicate
 */
const isNotNull = <T>(value: T | null): value is T => value !== null

export default isNotNull
