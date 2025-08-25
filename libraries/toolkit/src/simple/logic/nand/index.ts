/**
 * Performs logical NAND (NOT AND) operation on two values
 *
 * Evaluates the logical NAND of two values, which is the negation of AND.
 * Returns false only when both operands are truthy; returns true in all
 * other cases. NAND is functionally complete - all other logical operations
 * can be constructed using only NAND gates.
 *
 * Truth table:
 * - true ⊼ true = false (both true → negated)
 * - true ⊼ false = true
 * - false ⊼ true = true
 * - false ⊼ false = true
 *
 * Equivalent to: !(a && b) or !a || !b
 *
 * @param a - The first value to evaluate
 * @param b - The second value to evaluate
 * @returns False if both values are truthy, true otherwise
 * @example
 * ```typescript
 * // Basic boolean logic
 * nand(true)(true)                     // false (only case that's false)
 * nand(true)(false)                    // true
 * nand(false)(true)                    // true
 * nand(false)(false)                   // true
 *
 * // Truthy/falsy values
 * nand(1)(1)                           // false (both truthy)
 * nand("hello")("world")               // false (both truthy)
 * nand("hello")("")                    // true
 * nand("")("")                         // true
 *
 * // Mutual exclusion logic
 * const canEdit = user.role === "editor"
 * const isLocked = document.locked
 * const allowEdit = nand(canEdit)(isLocked)
 * // Can't edit if document is locked (even if editor)
 *
 * // Resource conflict detection
 * const process1Active = process1.status === "running"
 * const process2Active = process2.status === "running"
 * const noConflict = nand(process1Active)(process2Active)
 * // Processes can't both be running
 *
 * // Building other gates with NAND
 * const not_via_nand = (a: unknown) => nand(a)(a)
 * not_via_nand(true)                   // false
 * not_via_nand(false)                  // true
 * ```
 * @pure Always returns same result for same inputs
 * @curried Allows partial application for reusable conditions
 * @predicate Returns boolean value
 */
const nand = (a: unknown) => (b: unknown): boolean =>
	!(Boolean(a) && Boolean(b))

export default nand
