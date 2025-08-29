/**
 * Checks if a value is null or undefined (nil)
 *
 * Determines whether a value is nullish, meaning either null or undefined.
 * This is equivalent to checking value == null (with double equals), which is
 * the idiomatic JavaScript way to check for both null and undefined. Useful for
 * optional value handling, default assignments, and nullish coalescing operations.
 *
 * Nil detection:
 * - null: Returns true
 * - undefined: Returns true
 * - Everything else: Returns false
 * - Equivalent to: value == null
 * - More concise than: value === null || value === undefined
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
 * isNil("")                            // false (empty string not nil)
 * isNil(NaN)                           // false (NaN not nil)
 * isNil([])                            // false
 *
 * // Default value assignment
 * function getConfig<T>(value: T | null | undefined, defaultValue: T): T {
 *   return isNil(value) ? defaultValue : value
 * }
 * getConfig(null, "default")           // "default"
 * getConfig("custom", "default")       // "custom"
 * getConfig(0, 100)                    // 0 (zero not nil)
 *
 * // Filtering nil values
 * const mixed = [1, null, 2, undefined, 3, 0, false, ""]
 * const nonNil = mixed.filter(v => !isNil(v))  // [1, 2, 3, 0, false, ""]
 * const onlyNil = mixed.filter(isNil)          // [null, undefined]
 *
 * // Type narrowing
 * function processValue(value: string | null | undefined): string {
 *   if (isNil(value)) {
 *     return "default"  // TypeScript knows value is null | undefined
 *   }
 *   return value.toUpperCase()  // TypeScript knows value is string
 * }
 * ```
 * @pure
 * @predicate
 */
const isNil = (value: unknown): value is null | undefined => value == null

export default isNil
