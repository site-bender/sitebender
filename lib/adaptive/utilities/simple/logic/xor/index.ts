/**
 * Performs logical XOR (exclusive OR) operation on two values
 * 
 * Evaluates the logical exclusive disjunction of two values, returning true
 * when exactly one operand is truthy (but not both). Uses JavaScript's 
 * truthiness semantics where falsy values include: false, 0, -0, 0n, "", 
 * null, undefined, NaN.
 * 
 * @curried (a) => (b) => result
 * @param a - The first value to evaluate
 * @param b - The second value to evaluate
 * @returns True if exactly one value is truthy, false otherwise
 * @example
 * ```typescript
 * // Basic boolean logic
 * xor(true)(true)                      // false (both true)
 * xor(true)(false)                     // true (exactly one true)
 * xor(false)(true)                     // true (exactly one true)
 * xor(false)(false)                    // false (both false)
 * 
 * // Truthy/falsy values
 * xor(1)(0)                            // true (one truthy)
 * xor(1)(1)                            // false (both truthy)
 * xor(0)(0)                            // false (both falsy)
 * xor("hello")("")                     // true (one truthy)
 * xor("hello")("world")                // false (both truthy)
 * xor("")("")                          // false (both falsy)
 * 
 * // Mixed types
 * xor(true)(0)                         // true
 * xor(true)(1)                         // false
 * xor(false)("yes")                    // true
 * xor(null)(undefined)                 // false (both falsy)
 * xor([])(null)                        // true ([] is truthy, null is falsy)
 * xor([])({})                          // false (both truthy)
 * 
 * // Partial application
 * const toggleIf = xor(true)
 * toggleIf(false)                      // true
 * toggleIf(true)                       // false
 * 
 * const exactlyOne = xor(condition1)
 * exactlyOne(condition2)                // true if exactly one condition is met
 * 
 * // Toggle states
 * const isEditing = true
 * const isViewing = false
 * const isExclusiveMode = xor(isEditing)(isViewing)  // true
 * 
 * // Mutual exclusivity checks
 * const hasPassword = Boolean(user.password)
 * const hasOAuth = Boolean(user.oauthToken)
 * const hasOneAuthMethod = xor(hasPassword)(hasOAuth)
 * 
 * if (!hasOneAuthMethod) {
 *   throw new Error("User must have exactly one auth method")
 * }
 * 
 * // Feature flag combinations
 * const useNewUI = config.experimentalUI
 * const useLegacyUI = config.legacyMode
 * const validUIConfig = xor(useNewUI)(useLegacyUI)  // Can't use both
 * 
 * // Form validation - exactly one required
 * function validateContact(email: string, phone: string): boolean {
 *   const hasEmail = email.length > 0
 *   const hasPhone = phone.length > 0
 *   return xor(hasEmail)(hasPhone)  // Require exactly one
 * }
 * 
 * validateContact("user@example.com", "")     // true
 * validateContact("", "1234567890")           // true
 * validateContact("user@example.com", "123")  // false (both provided)
 * validateContact("", "")                     // false (neither provided)
 * 
 * // Binary choice validation
 * const isTypeA = item.type === "A"
 * const isTypeB = item.type === "B"
 * const isValidType = xor(isTypeA)(isTypeB)  // Exactly one type
 * 
 * // Permission conflicts
 * const canRead = user.permissions.includes("read")
 * const isDenied = user.permissions.includes("denied")
 * const hasConflict = !xor(canRead)(isDenied)  // Both or neither is conflict
 * 
 * // State machine transitions
 * const fromStateA = currentState === "A"
 * const toStateB = nextState === "B"
 * const isValidTransition = xor(fromStateA)(toStateB)
 * 
 * // Array filtering - elements in one array but not both
 * function symmetricFilter<T>(arr1: T[], arr2: T[]): T[] {
 *   return [...arr1, ...arr2].filter(item => 
 *     xor(arr1.includes(item))(arr2.includes(item))
 *   )
 * }
 * 
 * symmetricFilter([1, 2, 3], [2, 3, 4])  // [1, 4]
 * 
 * // Checkbox group validation
 * const acceptTerms = form.acceptTerms
 * const declineTerms = form.declineTerms
 * const validChoice = xor(acceptTerms)(declineTerms)
 * 
 * // Day/night mode toggle
 * const isDayMode = theme === "light"
 * const isNightMode = theme === "dark"
 * const validTheme = xor(isDayMode)(isNightMode)
 * 
 * // Branching logic
 * const useMethodA = config.algorithm === "A"
 * const useMethodB = config.algorithm === "B"
 * if (xor(useMethodA)(useMethodB)) {
 *   // Proceed with exactly one method
 * } else {
 *   throw new Error("Must specify exactly one algorithm")
 * }
 * 
 * // Parity checking
 * const bits = [1, 0, 1, 1, 0]
 * const parity = bits.reduce((acc, bit) => xor(acc)(bit), false)
 * // parity is true if odd number of 1s, false if even
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable conditions
 * @property Type-safe - Works with any types using truthiness
 */
const xor = (a: unknown) => (b: unknown): boolean => 
	Boolean(a) !== Boolean(b)

export default xor