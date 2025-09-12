import isNullish from "../isNullish/index.ts"

/**
 * Alias for isNullish - checks if a value is null or undefined (nil)
 *
 * This is a convenience alias for isNullish, providing an alternative
 * shorter name for checking nullish values. It delegates directly to
 * isNullish for consistency. Use this when you prefer the term "nil"
 * over "nullish" in your codebase.
 *
 * Nil detection:
 * - null: Returns true
 * - undefined: Returns true
 * - Everything else: Returns false
 * - Delegates to: isNullish
 * - Equivalent to: value == null
 *
 * @param value - The value to check for nil
 * @returns True if the value is null or undefined, false otherwise
 * @example
 * ```typescript
 * // Nil values
 * isNil(null)                          // true
 * isNil(undefined)                     // true
 * isNil(void 0)                        // true
 *
 * // Not nil (everything else)
 * isNil(0)                             // false
 * isNil(false)                         // false
 * isNil("")                            // false
 * isNil(NaN)                           // false
 * isNil([])                            // false
 *
 * // Default value assignment
 * function getConfig<T>(value: T | null | undefined, defaultValue: T): T {
 *   return isNil(value) ? defaultValue : value
 * }
 * getConfig(null, "default")           // "default"
 * getConfig("custom", "default")       // "custom"
 * getConfig(0, 100)                    // 0 (zero not nil)
 * ```
 * @pure
 * @predicate
 * @see isNullish
 */
const isNil = isNullish

export default isNil
