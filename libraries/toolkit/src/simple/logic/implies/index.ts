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
 * // Partial application for rules
 * const requiresAuth = implies(true)
 * requiresAuth(user.isLoggedIn)        // false if user not logged in
 *
 * // Validation rules
 * const isPremium = user.subscription === "premium"
 * const hasFeature = user.features.includes("advanced")
 * const validSubscription = implies(isPremium)(hasFeature)
 * // If premium, must have advanced features
 *
 * // Business logic rules
 * const isExpress = order.shipping === "express"
 * const isPriority = order.priority === true
 * const validOrder = implies(isExpress)(isPriority)
 * // Express shipping implies priority handling
 * ```
 * @pure Always returns same result for same inputs
 * @curried Allows partial application for reusable rules
 * @predicate Returns boolean value
 */
const implies = (antecedent: unknown) => (consequent: unknown): boolean =>
	!antecedent || Boolean(consequent)

export default implies
