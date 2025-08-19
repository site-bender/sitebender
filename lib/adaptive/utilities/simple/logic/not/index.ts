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
 * // Numbers
 * not(42)                              // false
 * not(-42)                             // false
 * not(0)                               // true
 * not(-0)                              // true
 * not(Infinity)                        // false
 * not(-Infinity)                       // false
 *
 * // Strings
 * not("false")                         // false (non-empty string is truthy)
 * not("0")                             // false (non-empty string is truthy)
 * not(" ")                             // false (whitespace is truthy)
 * not("")                              // true (empty string is falsy)
 *
 * // Objects and arrays
 * not({})                              // false ({} is truthy)
 * not({ a: 1 })                        // false
 * not([])                              // false ([] is truthy)
 * not([1, 2, 3])                       // false
 *
 * // Special values
 * not(null)                            // true
 * not(undefined)                       // true
 * not(NaN)                             // true
 * not(BigInt(0))                       // true
 * not(BigInt(1))                       // false
 *
 * // Validation helpers
 * const isEmpty = (str: string) => not(str.trim())
 * isEmpty("")                          // true
 * isEmpty("  ")                        // true
 * isEmpty("hello")                     // false
 *
 * // Existence checks
 * const isNil = (value: unknown) => not(value != null)
 * isNil(null)                          // true
 * isNil(undefined)                     // true
 * isNil(0)                             // false
 * isNil("")                            // false
 *
 * // Array filtering
 * const values = [1, 0, "hello", "", true, false, null, undefined]
 * const falsyValues = values.filter(not)
 * // [0, "", false, null, undefined]
 *
 * // Conditional logic
 * const user = { isLoggedIn: false }
 * if (not(user.isLoggedIn)) {
 *   // redirect to login
 * }
 *
 * // Toggle states
 * let isEnabled = true
 * isEnabled = not(isEnabled)           // false
 * isEnabled = not(isEnabled)           // true
 *
 * // Permission checking
 * const hasPermission = user.roles.includes("admin")
 * const accessDenied = not(hasPermission)
 *
 * // Form validation
 * const errors = []
 * if (not(form.email)) {
 *   errors.push("Email is required")
 * }
 * if (not(form.password)) {
 *   errors.push("Password is required")
 * }
 *
 * // Null checking patterns
 * function processValue(value: string | null) {
 *   if (not(value)) {
 *     return "default"
 *   }
 *   return value.toUpperCase()
 * }
 *
 * processValue("hello")                // "HELLO"
 * processValue("")                     // "default"
 * processValue(null)                   // "default"
 *
 * // Feature flag negation
 * const isDebugMode = not(process.env.NODE_ENV === "production")
 * const hideFeature = not(config.showNewFeature)
 *
 * // Combining with other logical operations
 * const condition = not(and(a)(b))     // !(a && b) - NAND
 * const condition2 = not(or(a)(b))     // !(a || b) - NOR
 *
 * // Double negation for boolean conversion
 * const toBoolean = (value: unknown) => not(not(value))
 * toBoolean("hello")                   // true
 * toBoolean("")                        // false
 * toBoolean(0)                         // false
 * toBoolean(1)                         // true
 *
 * // Functional composition
 * const isNotEmpty = (arr: unknown[]) => not(arr.length === 0)
 * const hasNoErrors = (result: Result) => not(result.error)
 * const isInvalid = (data: Data) => not(data.isValid)
 *
 * // State machine logic
 * const isNotLoading = not(state.isLoading)
 * const isNotError = not(state.hasError)
 * const canProceed = isNotLoading && isNotError
 * ```
 * @property Pure - Always returns same result for same input
 * @property Type-safe - Works with any type using truthiness
 * @property Composable - Can be combined with other logical operations
 */
const not = (value: unknown): boolean => !value

export default not
