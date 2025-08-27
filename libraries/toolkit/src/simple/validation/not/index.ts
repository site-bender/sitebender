/**
 * Returns the logical negation of a value
 *
 * Applies the logical NOT operator (!) to any value, converting it to a boolean
 * that represents the opposite of its truthiness. This function coerces the input
 * to a boolean context and returns its negation. Useful for inverting conditions,
 * creating complement predicates, and boolean logic operations.
 *
 * Falsy values that become true:
 * - false → true
 * - 0 → true
 * - -0 → true
 * - "" (empty string) → true
 * - null → true
 * - undefined → true
 * - NaN → true
 *
 * Truthy values that become false:
 * - true → false
 * - Any non-zero number → false
 * - Any non-empty string → false
 * - Objects and arrays → false
 * - Functions → false
 *
 * @pure
 * @predicate
 * @param value - The value to negate logically
 * @returns The boolean negation of the value's truthiness
 * @example
 * ```typescript
 * // Boolean values
 * not(true)                // false
 * not(false)               // true
 *
 * // Falsy values become true
 * not(0)                   // true
 * not("")                  // true
 * not(null)                // true
 * not(undefined)           // true
 *
 * // Truthy values become false
 * not(1)                   // false
 * not("hello")             // false
 * not([])                  // false (empty array is truthy)
 *
 * // Creating complement predicates
 * const isEven = (n: number) => n % 2 === 0
 * const isOdd = (n: number) => not(isEven(n))
 * isOdd(3)                 // true
 *
 * // Filtering
 * const values = [0, 1, "", "hello", null, false, true]
 * values.filter(not)       // [0, "", null, false]
 * ```
 */
const not = <T>(value: T): boolean => !value

export default not
