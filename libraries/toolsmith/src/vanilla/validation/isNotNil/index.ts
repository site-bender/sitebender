import isNotNullish from "../isNotNullish/index.ts"

/**
 * Alias for isNotNullish - checks if a value is not null or undefined
 *
 * This is a convenience alias for isNotNullish, providing an alternative
 * shorter name. It delegates directly to isNotNullish for consistency.
 * Use this when you prefer the term "nil" over "nullish" in your codebase.
 *
 * @param value - The value to check for non-nil status
 * @returns True if the value is neither null nor undefined, false otherwise
 * @example
 * ```typescript
 * // Non-nil values
 * isNotNil("hello")                // true
 * isNotNil(0)                      // true
 * isNotNil(false)                  // true
 * isNotNil("")                     // true
 *
 * // Nil values
 * isNotNil(null)                   // false
 * isNotNil(undefined)              // false
 *
 * // Type narrowing
 * function processValue<T>(value: T | null | undefined): T {
 *   if (isNotNil(value)) {
 *     return value  // value is T here
 *   }
 *   throw new Error("Value is nil")
 * }
 * ```
 * @pure
 * @predicate
 * @see isNotNullish
 */
const isNotNil = isNotNullish

export default isNotNil
