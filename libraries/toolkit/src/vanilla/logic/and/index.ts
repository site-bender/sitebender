/**
 * Performs logical AND operation on two values
 *
 * Evaluates the logical conjunction of two values, returning true only
 * when both operands are truthy. Uses JavaScript's truthiness semantics
 * where falsy values include: false, 0, -0, 0n, "", null, undefined, NaN.
 *
 * @param a - The first value to evaluate
 * @param b - The second value to evaluate
 * @returns True if both values are truthy, false otherwise
 * @example
 * ```typescript
 * // Basic boolean logic
 * and(true)(true)                      // true
 * and(true)(false)                     // false
 * and(false)(true)                     // false
 * and(false)(false)                    // false
 *
 * // Truthy/falsy values
 * and(1)(1)                            // true
 * and(1)(0)                            // false
 * and("hello")("world")                // true
 * and("hello")("")                     // false
 * and(null)(undefined)                 // false
 *
 * // Partial application
 * const requiresAuth = and(true)
 * requiresAuth(user.isLoggedIn)        // depends on user.isLoggedIn
 * requiresAuth(false)                  // false
 *
 * // Validation chains
 * const isValid = and(hasName)(hasEmail)
 * const canProceed = and(isValid)(isAuthorized)
 *
 * // Array filtering with multiple conditions
 * const isAdult = (person: Person) => person.age >= 18
 * const hasLicense = (person: Person) => person.hasDriversLicense
 * const canDrive = (person: Person) => and(isAdult(person))(hasLicense(person))
 *
 * const drivers = people.filter(canDrive)
 *
 * // Permission checking
 * const canEdit = and(user.isAuthenticated)(user.role === "editor")
 * const canDelete = and(canEdit)(item.owner === user.id)
 *
 * // Configuration checking
 * const isProduction = process.env.NODE_ENV === "production"
 * const hasApiKey = Boolean(process.env.API_KEY)
 * const isConfigured = and(isProduction)(hasApiKey)
 *
 * // Data validation pipeline
 * const checks = [
 *   data => data != null,
 *   data => data.length > 0,
 *   data => data.every(item => item.valid)
 * ]
 *
 * const allChecksPass = checks.reduce(
 *   (acc, check) => and(acc)(check(data)),
 *   true
 * )
 *
 * // Function composition
 * const allConditions = [and(a)(b), and(c)(d)]
 *   .reduce((result, condition) => and(result)(condition), true)
 * ```
 * @pure
 * @curried
 * @predicate
 * @commutative
 * @associative
 */
const and = (a: unknown) => (b: unknown): boolean => Boolean(a) && Boolean(b)

export default and
