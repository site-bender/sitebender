/**
 * Type guard that checks if a value is an Array
 *
 * Uses the native Array.isArray method to reliably determine if a value is an array.
 * This is more reliable than instanceof Array because it works correctly across
 * different JavaScript realms (e.g., iframes, web workers). Returns a type predicate
 * that narrows the type to Array<unknown> in TypeScript.
 *
 * Array detection:
 * - True arrays: created with [], new Array(), Array.from(), etc.
 * - Cross-realm: works with arrays from different contexts
 * - Not fooled by: array-like objects, arguments, NodeLists
 * - Type narrowing: provides TypeScript type guard
 * - No coercion: doesn't convert values, only checks type
 *
 * @pure
 * @predicate
 * @param value - The value to check
 * @returns True if the value is an array, false otherwise
 * @example
 * ```typescript
 * // True for arrays
 * isArray([])                    // true
 * isArray([1, 2, 3])            // true
 * isArray(new Array(5))         // true
 * isArray(Array.from("hello"))  // true
 *
 * // False for array-like objects
 * isArray("string")             // false
 * isArray({ length: 0 })        // false
 * isArray(arguments)            // false
 *
 * // Type narrowing in TypeScript
 * function processValue(value: unknown) {
 *   if (isArray(value)) {
 *     return value.length  // TypeScript knows it's an array
 *   }
 *   return 0
 * }
 *
 * // Filtering mixed collections
 * const mixed = [[1, 2], "array", null, ["a", "b"]]
 * mixed.filter(isArray)         // [[1, 2], ["a", "b"]]
 *
 * // Matrix validation
 * const isMatrix = (value: unknown): boolean =>
 *   isArray(value) && value.length > 0 && value.every(isArray)
 * ```
 */
const isArray = (value: unknown): value is Array<unknown> =>
	Array.isArray(value)

export default isArray
