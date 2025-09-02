/**
 * Performs logical XOR (exclusive OR) operation on two values
 *
 * Evaluates the logical exclusive disjunction of two values, returning true
 * when exactly one operand is truthy (but not both). Uses JavaScript's
 * truthiness semantics where falsy values include: false, 0, -0, 0n, "",
 * null, undefined, NaN.
 *
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
 * xor("hello")("")                     // true (one truthy)
 * xor("hello")("world")                // false (both truthy)
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
 * // Form validation - exactly one required
 * const validateContact = (email: string, phone: string) => {
 *   const hasEmail = email.length > 0
 *   const hasPhone = phone.length > 0
 *   return xor(hasEmail)(hasPhone)  // Require exactly one
 * }
 *
 * // Array filtering - symmetric difference
 * const symmetricFilter = <T>(arr1: T[], arr2: T[]): T[] =>
 *   [...arr1, ...arr2].filter(item =>
 *     xor(arr1.includes(item))(arr2.includes(item))
 *   )
 * ```
 * @pure Always returns same result for same inputs
 * @curried Allows partial application for reusable conditions
 * @predicate Returns boolean value
 * @commutative xor(a)(b) equals xor(b)(a)
 */
const xor = (a: unknown) => (b: unknown): boolean => Boolean(a) !== Boolean(b)

export default xor
