/**
 * Performs logical biconditional (if and only if) operation on two values
 * 
 * Evaluates the logical biconditional "a if and only if b", which is true when
 * both values have the same truth value (both true or both false). This is the
 * logical equivalence operator, also known as XNOR (exclusive NOR).
 * 
 * Truth table:
 * - true ↔ true = true (both true)
 * - true ↔ false = false (different values)
 * - false ↔ true = false (different values) 
 * - false ↔ false = true (both false)
 * 
 * Equivalent to: (a && b) || (!a && !b) or !(a XOR b)
 * 
 * @curried (a) => (b) => result
 * @param a - The first value to compare
 * @param b - The second value to compare
 * @returns True if both values have the same truthiness, false otherwise
 * @example
 * ```typescript
 * // Basic boolean logic
 * iff(true)(true)                      // true (both true)
 * iff(true)(false)                     // false (different)
 * iff(false)(true)                     // false (different)
 * iff(false)(false)                    // true (both false)
 * 
 * // Logical equivalence
 * const sameState = iff(isEnabled)(isActive)
 * // true only if both are enabled or both are disabled
 * 
 * // Truthy/falsy values
 * iff(1)(1)                            // true (both truthy)
 * iff(1)(2)                            // true (both truthy)
 * iff(0)(0)                            // true (both falsy)
 * iff(1)(0)                            // false (different)
 * iff("hello")("world")                // true (both truthy)
 * iff("")("")                          // true (both falsy)
 * iff("text")("")                      // false (different)
 * iff(null)(undefined)                 // true (both falsy)
 * iff([])({}))                         // true (both truthy)
 * 
 * // Partial application
 * const matchesState = iff(currentState)
 * matchesState(previousState)          // true if states match
 * matchesState(nextState)              // true if states match
 * 
 * const bothTrue = iff(true)
 * bothTrue(condition)                  // true only if condition is true
 * 
 * const bothFalse = iff(false)
 * bothFalse(condition)                 // true only if condition is false
 * 
 * // State synchronization
 * const isInSync = iff(localState)(remoteState)
 * if (!isInSync) {
 *   // States are out of sync, need to reconcile
 * }
 * 
 * // Feature parity checking
 * const hasFeatureA = config.features.includes("A")
 * const hasFeatureB = config.features.includes("B")
 * const featureParity = iff(hasFeatureA)(hasFeatureB)
 * // Both features must be enabled or disabled together
 * 
 * // Validation consistency
 * function validateConsistency(form: Form): boolean {
 *   const hasShipping = Boolean(form.shippingAddress)
 *   const hasBilling = Boolean(form.billingAddress)
 *   const sameAsBilling = form.sameAsBilling
 *   
 *   // If same as billing, both should be present or absent
 *   return sameAsBilling ? iff(hasShipping)(hasBilling) : true
 * }
 * 
 * // Permission matching
 * const user1CanEdit = user1.permissions.includes("edit")
 * const user2CanEdit = user2.permissions.includes("edit")
 * const sameEditRights = iff(user1CanEdit)(user2CanEdit)
 * 
 * // Boolean algebra equivalences
 * const isWeekday = day >= 1 && day <= 5
 * const isWorkday = !isHoliday && !isWeekend
 * const equivalent = iff(isWeekday)(isWorkday)
 * 
 * // Null safety pairing
 * const hasLeft = left !== null
 * const hasRight = right !== null
 * const bothOrNeither = iff(hasLeft)(hasRight)
 * // Ensures both are null or both are non-null
 * 
 * // Toggle state validation
 * const switchA = document.getElementById("switchA").checked
 * const switchB = document.getElementById("switchB").checked
 * const synchronized = iff(switchA)(switchB)
 * // Switches must be in same position
 * 
 * // Environment consistency
 * const isDev = process.env.NODE_ENV === "development"
 * const hasDevTools = Boolean(window.__REDUX_DEVTOOLS_EXTENSION__)
 * const consistent = iff(isDev)(hasDevTools)
 * // Dev tools should only be present in dev mode
 * 
 * // Data integrity checks
 * function checkIntegrity(original: Data, copy: Data): boolean {
 *   const originalEmpty = original.length === 0
 *   const copyEmpty = copy.length === 0
 *   return iff(originalEmpty)(copyEmpty)
 * }
 * 
 * // Mutual requirement validation
 * const hasUsername = form.username.length > 0
 * const hasPassword = form.password.length > 0
 * const bothOrNone = iff(hasUsername)(hasPassword)
 * // Either both credentials or none (for optional auth)
 * 
 * // Array comparison for same truthiness
 * const arr1Empty = arr1.length === 0
 * const arr2Empty = arr2.length === 0
 * const sameFillState = iff(arr1Empty)(arr2Empty)
 * 
 * // Contract terms agreement
 * const acceptedTerms = user.acceptedTerms
 * const acceptedPrivacy = user.acceptedPrivacy
 * const legalCompliance = iff(acceptedTerms)(acceptedPrivacy)
 * // Must accept both or neither
 * 
 * // Bidirectional implication
 * const a = true, b = true
 * const biconditional = iff(a)(b)
 * const doubleImplication = and(implies(a)(b))(implies(b)(a))
 * console.log(biconditional === doubleImplication)  // true
 * 
 * // State machine validation
 * const canStart = state === "ready"
 * const hasResources = resources !== null
 * const validToStart = iff(canStart)(hasResources)
 * // Ready state must have resources, non-ready must not
 * 
 * // Symmetric relationships
 * const aFollowsB = user1.following.includes(user2.id)
 * const bFollowsA = user2.following.includes(user1.id)
 * const mutualFollow = iff(aFollowsB)(bFollowsA)
 * 
 * // Complement checking
 * const isPositive = value > 0
 * const signMatches = sign === "+"
 * const validSign = iff(isPositive)(signMatches)
 * // Sign must match the value's positivity
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable comparisons
 * @property Symmetric - iff(a)(b) equals iff(b)(a)
 */
const iff = (a: unknown) => (b: unknown): boolean =>
	Boolean(a) === Boolean(b)

export default iff