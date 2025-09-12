/**
 * Performs logical OR operation on two values
 *
 * Evaluates the logical disjunction of two values, returning true when
 * at least one operand is truthy. Uses JavaScript's truthiness semantics
 * where falsy values include: false, 0, -0, 0n, "", null, undefined, NaN.
 *
 * @param a - The first value to evaluate
 * @param b - The second value to evaluate
 * @returns True if at least one value is truthy, false otherwise
 * @example
 * ```typescript
 * // Basic boolean logic
 * or(true)(true)                       // true
 * or(true)(false)                      // true
 * or(false)(true)                      // true
 * or(false)(false)                     // false
 *
 * // Truthy/falsy values
 * or(1)(0)                             // true
 * or(0)(0)                             // false
 * or("hello")("")                      // true
 * or("")("")                           // false
 * or([])(null)                         // true ([] is truthy)
 *
 * // Partial application
 * const hasDefault = or("default value")
 * hasDefault(userInput)                // true if userInput or default is truthy
 *
 * // Validation alternatives
 * const isValidEmail = (value: string) => value.includes("@")
 * const isValidPhone = (value: string) => /^\d{10}$/.test(value)
 * const hasContact = (email: string, phone: string) =>
 *   or(isValidEmail(email))(isValidPhone(phone))
 *
 * // Permission checking with alternatives
 * const canAccess = or(user.isAdmin)(user.isOwner)
 * const canModify = or(canAccess)(user.hasEditPermission)
 *
 * // Array filtering with alternative conditions
 * const isWeekend = (date: Date) => {
 *   const day = date.getDay()
 *   return or(day === 0)(day === 6)  // Sunday or Saturday
 * }
 * ```
 * @pure Always returns same result for same inputs
 * @curried Allows partial application for reusable conditions
 * @predicate Returns boolean value
 * @commutative or(a)(b) equals or(b)(a)
 * @associative or(or(a)(b))(c) equals or(a)(or(b)(c))
 */
const or = (a: unknown) => (b: unknown): boolean => Boolean(a) || Boolean(b)

export default or
