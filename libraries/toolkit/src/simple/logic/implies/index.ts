/**
 * Performs logical implication (if-then) operation on two values
 *
 * Evaluates the logical implication "if a then b", which is false only when
 * the antecedent (a) is true and the consequent (b) is false. In all other
 * cases, the implication is true. This follows the classical logic truth table:
 * - true → true = true (valid implication)
 * - true → false = false (broken promise)
 * - false → true = true (vacuously true)
 * - false → false = true (vacuously true)
 *
 * Equivalent to: !a || b (not a OR b)
 *
 * @curried (antecedent) => (consequent) => result
 * @param antecedent - The "if" condition (hypothesis)
 * @param consequent - The "then" result (conclusion)
 * @returns True unless antecedent is true and consequent is false
 * @example
 * ```typescript
 * // Basic boolean logic
 * implies(true)(true)                  // true (promise kept)
 * implies(true)(false)                 // false (promise broken)
 * implies(false)(true)                 // true (no promise made)
 * implies(false)(false)                // true (no promise made)
 *
 * // Logical reasoning
 * const ifRaining = true
 * const thenWet = true
 * implies(ifRaining)(thenWet)          // true (valid: if raining, then wet)
 *
 * const ifSunny = true
 * const thenCold = false
 * implies(ifSunny)(thenCold)           // false (invalid: sunny doesn't imply cold)
 *
 * // Truthy/falsy values
 * implies(1)(1)                        // true
 * implies(1)(0)                        // false
 * implies(0)(0)                        // true
 * implies(0)(1)                        // true
 * implies("condition")("result")       // true
 * implies("condition")("")             // false
 * implies("")("anything")              // true (vacuous truth)
 *
 * // Partial application for rules
 * const requiresAuth = implies(true)
 * requiresAuth(user.isLoggedIn)        // false if user not logged in
 * requiresAuth(true)                   // true
 *
 * const ifAdminThen = implies(user.isAdmin)
 * ifAdminThen(user.canDelete)          // validates admin permissions
 *
 * // Validation rules
 * const isPremium = user.subscription === "premium"
 * const hasFeature = user.features.includes("advanced")
 * const validSubscription = implies(isPremium)(hasFeature)
 * // If premium, must have advanced features
 *
 * // Business logic rules
 * function validateOrder(order: Order): boolean {
 *   const isExpress = order.shipping === "express"
 *   const isPriority = order.priority === true
 *
 *   // Express shipping implies priority handling
 *   return implies(isExpress)(isPriority)
 * }
 *
 * validateOrder({ shipping: "express", priority: true })   // true
 * validateOrder({ shipping: "express", priority: false })  // false
 * validateOrder({ shipping: "standard", priority: false }) // true
 * validateOrder({ shipping: "standard", priority: true })  // true
 *
 * // Contract validation
 * const hasContract = Boolean(employee.contract)
 * const hasSignature = Boolean(employee.signature)
 * const validContract = implies(hasContract)(hasSignature)
 * // If has contract, must have signature
 *
 * // Dependency checking
 * const usesTypeScript = config.typescript === true
 * const hasTsConfig = fs.existsSync("tsconfig.json")
 * const validSetup = implies(usesTypeScript)(hasTsConfig)
 * // If using TypeScript, must have config file
 *
 * // State machine constraints
 * const isRunning = state === "running"
 * const hasProcess = process !== null
 * const validState = implies(isRunning)(hasProcess)
 * // If running, must have a process
 *
 * // Form field dependencies
 * function validateForm(form: Form): boolean {
 *   const hasEmail = Boolean(form.email)
 *   const hasEmailConsent = Boolean(form.emailConsent)
 *
 *   // If providing email, must give consent
 *   return implies(hasEmail)(hasEmailConsent)
 * }
 *
 * // Null safety checks
 * const hasValue = value !== null
 * const hasProperties = value?.properties !== undefined
 * const safeAccess = implies(hasProperties)(hasValue)
 * // If has properties, must have value (not null)
 *
 * // Permission hierarchies
 * const canWrite = permissions.includes("write")
 * const canRead = permissions.includes("read")
 * const validPermissions = implies(canWrite)(canRead)
 * // Write permission implies read permission
 *
 * // Configuration validation
 * const isProduction = env === "production"
 * const hasSSL = config.ssl === true
 * const secureConfig = implies(isProduction)(hasSSL)
 * // Production implies SSL must be enabled
 *
 * // Logical equivalences
 * const a = true, b = false
 * const implication = implies(a)(b)
 * const equivalent = or(not(a))(b)     // !a || b
 * console.log(implication === equivalent)  // true
 *
 * // Chain of implications
 * const step1 = condition1
 * const step2 = implies(step1)(condition2)
 * const step3 = implies(step2)(condition3)
 * // Creates logical chain: condition1 → condition2 → condition3
 *
 * // Academic grading rules
 * const isPassing = grade >= 60
 * const canGraduate = hasAllCredits
 * const validGraduation = implies(canGraduate)(isPassing)
 * // To graduate, must be passing
 *
 * // Error handling rules
 * const hasError = result.error !== null
 * const hasErrorMessage = result.message !== undefined
 * const validError = implies(hasError)(hasErrorMessage)
 * // If error exists, must have error message
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable rules
 * @property Mathematical - Follows classical logic implication
 */
const implies = (antecedent: unknown) => (consequent: unknown): boolean =>
	!antecedent || Boolean(consequent)

export default implies
