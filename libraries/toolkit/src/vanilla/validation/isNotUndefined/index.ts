/**
 * Type guard that checks if a value is not undefined
 *
 * Determines whether a value is anything except undefined using strict inequality (!==).
 * This includes null, all falsy values, and all truthy values - everything except
 * undefined itself. In TypeScript, this narrows the type to exclude undefined,
 * enabling safe operations on potentially undefined values.
 *
 * Non-undefined detection:
 * - Excludes only undefined: undefined returns false
 * - Includes null: null returns true
 * - Includes all other values: 0, false, "", etc. return true
 * - Type narrowing: excludes undefined from type union
 * - Strict check: uses !== for precise comparison
 *
 * @param value - The value to check for non-undefined status
 * @returns True if the value is not undefined, false if it is undefined
 * @example
 * ```typescript
 * // Non-undefined values
 * isNotUndefined(null)             // true
 * isNotUndefined(0)                 // true
 * isNotUndefined(false)             // true
 * isNotUndefined("")                // true
 * isNotUndefined("hello")           // true
 * isNotUndefined({})                // true
 *
 * // Undefined values
 * isNotUndefined(undefined)         // false
 * isNotUndefined(void 0)            // false
 *
 * // Type narrowing
 * function processValue<T>(value: T | undefined): T {
 *   if (isNotUndefined(value)) {
 *     return value  // value is T here, not undefined
 *   }
 *   throw new Error("Value cannot be undefined")
 * }
 *
 * // Filtering out undefined
 * const mixed = [1, undefined, null, 2, undefined, 3]
 * const defined = mixed.filter(isNotUndefined)  // [1, null, 2, 3]
 * ```
 * @pure
 * @predicate
 */
const isNotUndefined = <T>(value: T | undefined): value is T =>
	value !== undefined

export default isNotUndefined
