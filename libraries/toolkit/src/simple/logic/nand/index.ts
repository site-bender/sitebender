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
 * @curried (a) => (b) => result
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
 * nand(1)(0)                           // true
 * nand(0)(0)                           // true
 * nand("hello")("world")               // false (both truthy)
 * nand("hello")("")                    // true
 * nand("")("")                         // true
 * nand([])({}))                        // false (both truthy)
 * nand(null)(undefined)                // true (both falsy)
 *
 * // Mixed types
 * nand(true)(1)                        // false (both truthy)
 * nand(false)(0)                       // true
 * nand("text")(42)                     // false (both truthy)
 * nand(NaN)(null)                      // true (both falsy)
 *
 * // Partial application
 * const notBoth = nand(true)
 * notBoth(condition)                   // false only if condition is true
 * notBoth(false)                       // true
 *
 * const nandWithFlag = nand(featureEnabled)
 * nandWithFlag(userAllowed)            // false only if both are true
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
 * // Form validation - not both empty
 * function validateChoice(optionA: string, optionB: string): boolean {
 *   const hasA = optionA.length > 0
 *   const hasB = optionB.length > 0
 *   return nand(hasA)(hasB)  // Can't have both options
 * }
 *
 * validateChoice("choice1", "")        // true (only one)
 * validateChoice("", "choice2")        // true (only one)
 * validateChoice("", "")               // true (neither)
 * validateChoice("choice1", "choice2") // false (both - invalid)
 *
 * // Prevent simultaneous states
 * const isLoading = state.status === "loading"
 * const hasError = state.status === "error"
 * const validState = nand(isLoading)(hasError)
 * // Can't be loading and error at same time
 *
 * // Access control
 * const isPublic = resource.visibility === "public"
 * const requiresAuth = resource.protected === true
 * const validConfig = nand(isPublic)(requiresAuth)
 * // Can't be both public and require auth
 *
 * // Building other gates with NAND
 * // NOT using NAND
 * const not_via_nand = (a: unknown) => nand(a)(a)
 * not_via_nand(true)                   // false
 * not_via_nand(false)                  // true
 *
 * // AND using NAND
 * const and_via_nand = (a: unknown) => (b: unknown) =>
 *   nand(nand(a)(b))(nand(a)(b))
 * and_via_nand(true)(true)             // true
 * and_via_nand(true)(false)            // false
 *
 * // OR using NAND
 * const or_via_nand = (a: unknown) => (b: unknown) =>
 *   nand(nand(a)(a))(nand(b)(b))
 * or_via_nand(true)(false)             // true
 * or_via_nand(false)(false)            // false
 *
 * // Mode exclusion
 * const isDarkMode = theme.mode === "dark"
 * const isHighContrast = theme.mode === "high-contrast"
 * const validTheme = nand(isDarkMode)(isHighContrast)
 * // Can't be both dark and high contrast
 *
 * // Concurrent operation prevention
 * const isSaving = operation === "save"
 * const isDeleting = operation === "delete"
 * const safeOperation = nand(isSaving)(isDeleting)
 * // Can't save and delete simultaneously
 *
 * // Feature flag conflicts
 * const useOldAPI = flags.useOldAPI
 * const useNewAPI = flags.useNewAPI
 * const validAPIConfig = nand(useOldAPI)(useNewAPI)
 * // Can't use both API versions
 *
 * // Input validation
 * const hasFile = Boolean(input.file)
 * const hasURL = Boolean(input.url)
 * const validInput = nand(hasFile)(hasURL)
 * // Accept file OR URL, not both
 *
 * // Database transaction safety
 * const inTransaction = db.transactionActive
 * const autoCommit = db.autoCommit
 * const safeMode = nand(inTransaction)(autoCommit)
 * // Auto-commit must be off during transactions
 *
 * // UI state management
 * const modalOpen = ui.modalOpen
 * const drawerOpen = ui.drawerOpen
 * const validUI = nand(modalOpen)(drawerOpen)
 * // Modal and drawer can't both be open
 *
 * // Relationship to De Morgan's laws
 * const a = true, b = false
 * const nandResult = nand(a)(b)
 * const deMorgan = or(not(a))(not(b))  // !a || !b
 * console.log(nandResult === deMorgan) // true
 *
 * // Circuit breaker pattern
 * const circuitOpen = breaker.isOpen
 * const requestActive = breaker.hasActiveRequest
 * const canProceed = nand(circuitOpen)(requestActive)
 * // Can't have active request with open circuit
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable conditions
 * @property Universal - NAND is functionally complete in boolean algebra
 */
const nand = (a: unknown) => (b: unknown): boolean =>
	!(Boolean(a) && Boolean(b))

export default nand
