/**
 * Performs logical NOR (NOT OR) operation on two values
 *
 * Evaluates the logical NOR of two values, which is the negation of OR.
 * Returns true only when both operands are falsy; returns false if either
 * or both are truthy. Like NAND, NOR is functionally complete and can be
 * used to construct all other logical operations.
 *
 * Truth table:
 * - true ⊽ true = false
 * - true ⊽ false = false
 * - false ⊽ true = false
 * - false ⊽ false = true (only case that's true)
 *
 * Equivalent to: !(a || b) or !a && !b
 *
 * @param a - The first value to evaluate
 * @param b - The second value to evaluate
 * @returns True if both values are falsy, false otherwise
 * @example
 * ```typescript
 * // Basic boolean logic
 * nor(true)(true)                      // false
 * nor(true)(false)                     // false
 * nor(false)(true)                     // false
 * nor(false)(false)                    // true (only case that's true)
 *
 * // Truthy/falsy values
 * nor(0)(0)                            // true (both falsy)
 * nor("")("")                          // true (both falsy)
 * nor(null)(undefined)                 // true (both falsy)
 * nor("hello")("")                     // false
 *
 * // Absence checking
 * const hasError = errorMessage !== null
 * const hasWarning = warningMessage !== null
 * const allClear = nor(hasError)(hasWarning)
 * // True only if no errors AND no warnings
 *
 * // Empty state validation
 * const hasData = data.length > 0
 * const isLoading = state === "loading"
 * const isEmpty = nor(hasData)(isLoading)
 * // Show empty state only if no data AND not loading
 *
 * // Building other gates with NOR
 * const not_via_nor = (a: unknown) => nor(a)(a)
 * not_via_nor(true)                    // false
 * not_via_nor(false)                   // true
 * ```
 * @pure Always returns same result for same inputs
 * @curried Allows partial application for reusable conditions
 * @predicate Returns boolean value
 */
const nor = (a: unknown) => (b: unknown): boolean => !(Boolean(a) || Boolean(b))

export default nor
