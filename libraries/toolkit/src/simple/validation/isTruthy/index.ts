/**
 * Checks if a value is truthy in JavaScript
 *
 * Determines whether a value evaluates to true in a boolean context.
 * Any value that is not falsy is truthy. JavaScript has exactly six falsy
 * values (false, 0, -0, "", null, undefined, NaN), and everything else is
 * truthy. This includes empty arrays, empty objects, and all other values.
 * This predicate is useful for filtering, conditional logic, and understanding
 * JavaScript's type coercion behavior.
 *
 * Truthy values include:
 * - All objects: {}, [], new Date(), etc.
 * - Non-zero numbers: 1, -1, 3.14, Infinity
 * - Non-empty strings: "0", "false", " "
 * - true boolean
 * - Symbols
 * - BigInts (except 0n)
 *
 * @param value - The value to check for truthiness
 * @returns True if the value is truthy, false if falsy
 * @example
 * ```typescript
 * // Truthy values
 * isTruthy(true)          // true
 * isTruthy(1)             // true
 * isTruthy("hello")       // true
 * isTruthy([])            // true (empty array!)
 * isTruthy({})            // true (empty object!)
 *
 * // Falsy values
 * isTruthy(false)         // false
 * isTruthy(0)             // false
 * isTruthy("")            // false
 * isTruthy(null)          // false
 * isTruthy(undefined)     // false
 * isTruthy(NaN)           // false
 *
 * // Filtering truthy values
 * const mixed = [0, 1, "", "hello", null, true]
 * const truthy = mixed.filter(isTruthy)  // [1, "hello", true]
 *
 * // Compact array (remove falsy)
 * const compact = <T>(arr: Array<T>): Array<T> =>
 *   arr.filter(isTruthy)
 *
 * compact([0, 1, false, 2, "", 3])  // [1, 2, 3]
 * ```
 * @pure
 * @predicate
 */
const isTruthy = (value: unknown): boolean => !!value

export default isTruthy
