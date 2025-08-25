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
 * @curried (a) => (b) => result
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
 * nor(1)(1)                            // false
 * nor(1)(0)                            // false
 * nor(0)(1)                            // false
 * nor(0)(0)                            // true (both falsy)
 * nor("hello")("world")                // false
 * nor("hello")("")                     // false
 * nor("")("")                          // true (both falsy)
 * nor(null)(undefined)                 // true (both falsy)
 * nor([])({}))                         // false (both truthy)
 *
 * // Mixed types
 * nor(true)(1)                         // false
 * nor(false)(0)                        // true (both falsy)
 * nor("text")(42)                      // false
 * nor(NaN)(null)                       // true (both falsy)
 * nor(undefined)(false)                // true (both falsy)
 *
 * // Partial application
 * const neitherWith = nor(false)
 * neitherWith(false)                   // true
 * neitherWith(true)                    // false
 *
 * const mustBeFalsy = nor(value)
 * mustBeFalsy(otherValue)              // true only if both are falsy
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
 * // Form validation - both must be empty
 * function validateExclusive(fieldA: string, fieldB: string): boolean {
 *   const hasA = fieldA.trim().length > 0
 *   const hasB = fieldB.trim().length > 0
 *   return nor(hasA)(hasB)  // Both must be empty
 * }
 *
 * validateExclusive("", "")            // true (both empty)
 * validateExclusive("value", "")       // false
 * validateExclusive("", "value")       // false
 * validateExclusive("a", "b")          // false
 *
 * // Idle state detection
 * const hasActiveRequests = requests.length > 0
 * const hasQueuedTasks = queue.length > 0
 * const isIdle = nor(hasActiveRequests)(hasQueuedTasks)
 * // System is idle only if no requests AND no tasks
 *
 * // Permission denial
 * const isAuthenticated = user.token !== null
 * const hasPermission = user.roles.includes(requiredRole)
 * const accessDenied = nor(isAuthenticated)(hasPermission)
 * // Denied if not authenticated AND no permission
 *
 * // Building other gates with NOR
 * // NOT using NOR
 * const not_via_nor = (a: unknown) => nor(a)(a)
 * not_via_nor(true)                    // false
 * not_via_nor(false)                   // true
 *
 * // OR using NOR
 * const or_via_nor = (a: unknown) => (b: unknown) =>
 *   nor(nor(a)(b))(nor(a)(b))
 * or_via_nor(true)(false)              // true
 * or_via_nor(false)(false)             // false
 *
 * // AND using NOR
 * const and_via_nor = (a: unknown) => (b: unknown) =>
 *   nor(nor(a)(a))(nor(b)(b))
 * and_via_nor(true)(true)              // true
 * and_via_nor(true)(false)             // false
 *
 * // Clean state verification
 * const hasPendingChanges = document.isDirty
 * const hasUnsavedWork = editor.hasModifications
 * const canClose = nor(hasPendingChanges)(hasUnsavedWork)
 * // Can close only if no changes AND no unsaved work
 *
 * // Network status
 * const isOnline = navigator.onLine
 * const hasConnection = socket.connected
 * const isOffline = nor(isOnline)(hasConnection)
 * // Truly offline if no internet AND no socket
 *
 * // Cache invalidation
 * const cacheExpired = Date.now() > cache.expiryTime
 * const dataChanged = cache.version !== current.version
 * const cacheValid = nor(cacheExpired)(dataChanged)
 * // Cache valid only if not expired AND not changed
 *
 * // Default state checking
 * const hasCustomConfig = config !== defaultConfig
 * const hasOverrides = overrides.length > 0
 * const isDefault = nor(hasCustomConfig)(hasOverrides)
 * // Using defaults if no custom config AND no overrides
 *
 * // Silent mode detection
 * const hasAudio = settings.audioEnabled
 * const hasNotifications = settings.notificationsEnabled
 * const isSilent = nor(hasAudio)(hasNotifications)
 * // Silent if no audio AND no notifications
 *
 * // Resource availability
 * const cpuBusy = cpu.usage > 90
 * const memoryFull = memory.available < 100
 * const resourcesAvailable = nor(cpuBusy)(memoryFull)
 * // Resources available if CPU not busy AND memory not full
 *
 * // Null state verification
 * const leftNull = left === null
 * const rightNull = right === null
 * const bothNull = nor(!leftNull)(!rightNull)
 * // Both null if neither is non-null
 *
 * // Relationship to De Morgan's laws
 * const a = true, b = false
 * const norResult = nor(a)(b)
 * const deMorgan = and(not(a))(not(b)) // !a && !b
 * console.log(norResult === deMorgan)  // true
 *
 * // Pristine form check
 * const formTouched = form.touched
 * const formDirty = form.dirty
 * const isPristine = nor(formTouched)(formDirty)
 * // Pristine if not touched AND not dirty
 *
 * // Queue empty check
 * const hasIncoming = incomingQueue.length > 0
 * const hasOutgoing = outgoingQueue.length > 0
 * const queuesEmpty = nor(hasIncoming)(hasOutgoing)
 * // All queues empty if no incoming AND no outgoing
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable conditions
 * @property Universal - NOR is functionally complete in boolean algebra
 */
const nor = (a: unknown) => (b: unknown): boolean => !(Boolean(a) || Boolean(b))

export default nor
