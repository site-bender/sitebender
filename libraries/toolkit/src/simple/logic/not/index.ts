/**
 * Performs logical NOT operation on a value
 *
 * Evaluates the logical negation of a value, returning true when the
 * operand is falsy and false when it's truthy. Uses JavaScript's
 * truthiness semantics where falsy values include: false, 0, -0, 0n,
 * "", null, undefined, NaN.
 *
 * @param value - The value to negate
 * @returns True if the value is falsy, false if truthy
 * @example
 * ```typescript
 * // Basic boolean negation
 * not(true)                            // false
 * not(false)                           // true
 *
 * // Truthy/falsy values
 * not(1)                               // false
 * not(0)                               // true
 * not("hello")                         // false
 * not("")                              // true
 * not([])                              // false ([] is truthy)
 * not(null)                            // true
 * not(undefined)                       // true
 * not(NaN)                             // true
 *
 * // Validation helpers
 * const isEmpty = (str: string) => not(str.trim())
 * isEmpty("")                          // true
 * isEmpty("  ")                        // true
 * isEmpty("hello")                     // false
 *
 * // Array filtering
 * const values = [1, 0, "hello", "", true, false, null, undefined]
 * const falsyValues = values.filter(not)
 * // [0, "", false, null, undefined]
 * ```
 * @pure Always returns same result for same input
 * @predicate Returns boolean value
 */
const not = (value: unknown): boolean => !value

export default not
