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
 * @curried (value) => boolean
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
 * not(NaN)                 // true
 * not(-0)                  // true
 *
 * // Truthy values become false
 * not(1)                   // false
 * not(-1)                  // false
 * not("hello")             // false
 * not(" ")                 // false (space is truthy)
 * not([])                  // false (empty array is truthy)
 * not({})                  // false (empty object is truthy)
 * not(() => {})            // false (functions are truthy)
 *
 * // Practical uses with conditionals
 * const isEmpty = (str: string) => not(str)
 * isEmpty("")              // true
 * isEmpty("hello")         // false
 *
 * const isDisabled = (enabled: boolean) => not(enabled)
 * isDisabled(true)         // false
 * isDisabled(false)        // true
 *
 * // Filtering with negation
 * const values = [0, 1, "", "hello", null, undefined, false, true]
 * const falsy = values.filter(not)
 * // [0, "", null, undefined, false]
 *
 * const truthy = values.filter(v => not(not(v)))
 * // [1, "hello", true]
 *
 * // Creating complement predicates
 * const isEven = (n: number) => n % 2 === 0
 * const isOdd = (n: number) => not(isEven(n))
 *
 * isOdd(3)                 // true
 * isOdd(4)                 // false
 *
 * // Conditional rendering patterns
 * const renderIf = <T>(condition: T, content: string) =>
 *   not(condition) ? "" : content
 *
 * renderIf(true, "Show")   // "Show"
 * renderIf(false, "Hide")  // ""
 * renderIf(null, "Skip")   // ""
 * renderIf(1, "Display")   // "Display"
 *
 * // Guard clauses
 * const process = (data: unknown) => {
 *   if (not(data)) {
 *     return "No data provided"
 *   }
 *   return `Processing: ${data}`
 * }
 *
 * process(null)            // "No data provided"
 * process("")              // "No data provided"
 * process(0)               // "No data provided"
 * process("info")          // "Processing: info"
 *
 * // Double negation for boolean conversion
 * const toBoolean = <T>(value: T) => not(not(value))
 *
 * toBoolean("text")        // true
 * toBoolean("")            // false
 * toBoolean(42)            // true
 * toBoolean(0)             // false
 * toBoolean(null)          // false
 *
 * // Validation helpers
 * const hasError = (errorMessage: string | null) => not(not(errorMessage))
 * const isValid = (errorMessage: string | null) => not(errorMessage)
 *
 * hasError("Invalid input") // true
 * hasError(null)           // false
 * hasError("")             // false
 *
 * isValid("Invalid input") // false
 * isValid(null)           // true
 * isValid("")             // true
 *
 * // Combining with other predicates
 * const items = [1, 2, 3, 4, 5]
 * const isGreaterThan3 = (n: number) => n > 3
 * const isLessThanOrEqual3 = (n: number) => not(isGreaterThan3(n))
 *
 * items.filter(isLessThanOrEqual3) // [1, 2, 3]
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Coercive - Converts any value to boolean context before negation
 * @property Total - Handles all possible input values
 * @property Unary - Single operation, can be composed easily
 */
const not = <T>(value: T): boolean => !value

export default not
