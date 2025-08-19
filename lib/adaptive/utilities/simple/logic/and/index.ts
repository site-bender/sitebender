/**
 * Performs logical AND operation on two values
 * 
 * Evaluates the logical conjunction of two values, returning true only
 * when both operands are truthy. Uses JavaScript's truthiness semantics
 * where falsy values include: false, 0, -0, 0n, "", null, undefined, NaN.
 * 
 * @curried (a) => (b) => result
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
 * and([])({}))                         // true (both are truthy)
 * and(null)(undefined)                 // false
 * 
 * // Mixed types
 * and(true)(1)                         // true
 * and(true)("yes")                     // true
 * and(false)(0)                        // false
 * and(0)("")                           // false
 * and(NaN)(false)                      // false
 * 
 * // Partial application
 * const requiresAuth = and(true)
 * requiresAuth(user.isLoggedIn)        // depends on user.isLoggedIn
 * requiresAuth(false)                  // false
 * 
 * const bothPositive = and(x > 0)
 * bothPositive(y > 0)                  // true if both x and y are positive
 * 
 * // Validation chains
 * const isValid = and(hasName)(hasEmail)
 * const canProceed = and(isValid)(isAuthorized)
 * 
 * // Feature flags
 * const featureEnabled = and(config.enabled)
 * featureEnabled(user.hasPermission)   // true only if both are true
 * 
 * // Conditional rendering
 * const shouldRender = and(isVisible)(hasData)
 * if (shouldRender) {
 *   // render component
 * }
 * 
 * // Array filtering with multiple conditions
 * const isAdult = (person: Person) => person.age >= 18
 * const hasLicense = (person: Person) => person.hasDriversLicense
 * const canDrive = (person: Person) => and(isAdult(person))(hasLicense(person))
 * 
 * const drivers = people.filter(canDrive)
 * 
 * // Form validation
 * function validateField(value: string): boolean {
 *   const notEmpty = value.length > 0
 *   const notTooLong = value.length <= 100
 *   return and(notEmpty)(notTooLong)
 * }
 * 
 * // Permission checking
 * const canEdit = and(user.isAuthenticated)(user.role === "editor")
 * const canDelete = and(canEdit)(item.owner === user.id)
 * 
 * // Combining with other logical operations
 * const condition1 = and(a)(b)
 * const condition2 = and(c)(d)
 * const allConditions = and(condition1)(condition2)
 * 
 * // Short-circuit evaluation
 * let sideEffect = false
 * const updateSideEffect = () => { sideEffect = true; return true }
 * 
 * and(false)(updateSideEffect())       // false (sideEffect becomes true)
 * // Note: Both arguments are evaluated before the function is called
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
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable conditions
 * @property Type-safe - Works with any types using truthiness
 */
const and = (a: unknown) => (b: unknown): boolean => 
	Boolean(a) && Boolean(b)

export default and