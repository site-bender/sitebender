/**
 * Checks if a value is strictly undefined
 *
 * Tests whether a value is exactly undefined (not null or any other value).
 * This is a precise check using strict equality that distinguishes undefined
 * from null and other falsy values. Unlike isNullish which checks for both
 * null and undefined, this predicate specifically identifies only undefined values.
 *
 * This predicate is useful for:
 * - Detecting uninitialized variables
 * - Checking for missing function arguments
 * - Identifying absent object properties
 * - Distinguishing undefined from null in APIs
 *
 * @param value - The value to check for undefined
 * @returns True if the value is strictly undefined, false otherwise
 * @example
 * ```typescript
 * // Basic checks  
 * isUndefined(undefined)   // true
 * isUndefined(void 0)      // true
 * isUndefined(null)        // false
 * isUndefined("")          // false
 * isUndefined(0)           // false
 *
 * // Type narrowing
 * const process = (value: string | undefined): string =>
 *   isUndefined(value) ? "No value" : value.toUpperCase()
 *
 * // Object property checks
 * const config = { host: "localhost" }
 * isUndefined(config.port)  // true (missing property)
 *
 * // Filtering undefined values
 * const values = [1, undefined, 2, null, 3]
 * const defined = values.filter(v => !isUndefined(v))  // [1, 2, null, 3]
 * ```
 * @pure
 * @predicate
 */
const isUndefined = (value: unknown): value is undefined => value === undefined

export default isUndefined
