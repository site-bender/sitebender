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
 * iff("hello")("world")                // true (both truthy)
 * iff("")("")                          // true (both falsy)
 * iff("text")("")                      // false (different)
 *
 * // Partial application
 * const matchesState = iff(currentState)
 * matchesState(previousState)          // true if states match
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
 * ```
 * @pure Always returns same result for same inputs
 * @curried Allows partial application for reusable comparisons
 * @predicate Returns boolean value
 * @commutative iff(a)(b) equals iff(b)(a)
 */
const iff = (a: unknown) => (b: unknown): boolean => Boolean(a) === Boolean(b)

export default iff
