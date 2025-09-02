/**
 * Checks if a value is falsy in JavaScript
 *
 * Determines whether a value evaluates to false in a boolean context.
 * JavaScript has exactly six falsy values: false, 0, -0, "", null, undefined,
 * and NaN. All other values are truthy. This predicate is useful for filtering,
 * conditional logic, and understanding JavaScript's type coercion behavior.
 *
 * Falsy values in JavaScript:
 * - false: The boolean false
 * - 0: The number zero (including -0)
 * - "": Empty string
 * - null: The null value
 * - undefined: The undefined value
 * - NaN: Not a Number
 *
 * @param value - The value to check for falsiness
 * @returns True if the value is falsy, false if truthy
 * @example
 * ```typescript
 * // The six falsy values
 * isFalsy(false)                       // true
 * isFalsy(0)                           // true
 * isFalsy("")                          // true
 * isFalsy(null)                        // true
 * isFalsy(undefined)                   // true
 * isFalsy(NaN)                         // true
 *
 * // Truthy values (returns false)
 * isFalsy(true)                        // false
 * isFalsy("0")                         // false (string "0")
 * isFalsy([])                          // false (empty array is truthy!)
 * isFalsy({})                          // false (empty object is truthy!)
 *
 * // Filtering falsy values
 * const mixed = [0, 1, "", "hello", null, false, true]
 * const truthy = mixed.filter(val => !isFalsy(val))  // [1, "hello", true]
 * const falsy = mixed.filter(isFalsy)                 // [0, "", null, false]
 *
 * // Default value assignment
 * function getConfig(userValue: unknown, defaultValue: string): string {
 *   return isFalsy(userValue) ? defaultValue : String(userValue)
 * }
 * getConfig("", "default")             // "default"
 * getConfig("custom", "default")       // "custom"
 * ```
 * @pure
 * @predicate
 */
const isFalsy = (value: unknown): boolean => !value

export default isFalsy
