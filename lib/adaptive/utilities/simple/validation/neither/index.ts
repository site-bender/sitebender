/**
 * Creates a predicate that returns true when neither condition is true
 * 
 * Binary combinator that creates a new predicate function checking that neither
 * of two predicates returns true for a given value. Equivalent to NOR logic gate
 * or !(A || B). Returns true only when both predicates return false. Useful for
 * exclusion logic, negative conditions, and complement sets.
 * 
 * Truth table:
 * - both false → true
 * - first true, second false → false
 * - first false, second true → false
 * - both true → false
 * 
 * @param predA - First predicate function
 * @param predB - Second predicate function
 * @returns A predicate that returns true when neither input predicate is true
 * @example
 * ```typescript
 * // Basic usage
 * const isPositive = (n: number) => n > 0
 * const isEven = (n: number) => n % 2 === 0
 * 
 * const neitherPositiveNorEven = neither(isPositive, isEven)
 * 
 * neitherPositiveNorEven(-3)           // true (negative and odd)
 * neitherPositiveNorEven(-2)           // false (negative but even)
 * neitherPositiveNorEven(3)            // false (positive but odd)
 * neitherPositiveNorEven(2)            // false (positive and even)
 * neitherPositiveNorEven(0)            // false (zero is even)
 * 
 * // String validation
 * const isEmpty = (s: string) => s.length === 0
 * const isTooLong = (s: string) => s.length > 10
 * 
 * const validLength = neither(isEmpty, isTooLong)
 * 
 * validLength("")                      // false (empty)
 * validLength("hello")                 // true (not empty, not too long)
 * validLength("this is too long")      // false (too long)
 * 
 * // Type checking exclusions
 * const isNull = (v: unknown) => v === null
 * const isUndefined = (v: unknown) => v === undefined
 * 
 * const hasValue = neither(isNull, isUndefined)
 * 
 * hasValue(null)                       // false
 * hasValue(undefined)                  // false
 * hasValue(0)                          // true
 * hasValue("")                         // true
 * hasValue(false)                      // true
 * 
 * // Number range exclusion
 * const tooSmall = (n: number) => n < 10
 * const tooBig = (n: number) => n > 100
 * 
 * const inGoodRange = neither(tooSmall, tooBig)
 * 
 * inGoodRange(5)                       // false (too small)
 * inGoodRange(50)                      // true (just right)
 * inGoodRange(150)                     // false (too big)
 * inGoodRange(10)                      // true (boundary)
 * inGoodRange(100)                     // true (boundary)
 * 
 * // Character validation
 * const isDigit = (c: string) => /^\d$/.test(c)
 * const isSpecial = (c: string) => /^[!@#$%^&*]$/.test(c)
 * 
 * const isLetter = neither(isDigit, isSpecial)
 * 
 * isLetter("a")                        // true
 * isLetter("5")                        // false (digit)
 * isLetter("@")                        // false (special)
 * isLetter(" ")                        // true (space is neither)
 * 
 * // User permission checking
 * const isAdmin = (user: { role: string }) => user.role === "admin"
 * const isModerator = (user: { role: string }) => user.role === "moderator"
 * 
 * const isRegularUser = neither(isAdmin, isModerator)
 * 
 * isRegularUser({ role: "user" })      // true
 * isRegularUser({ role: "admin" })     // false
 * isRegularUser({ role: "moderator" }) // false
 * isRegularUser({ role: "guest" })     // true
 * 
 * // Error state checking
 * const hasError = (state: { error?: string }) => !!state.error
 * const isLoading = (state: { loading: boolean }) => state.loading
 * 
 * const isReady = neither(hasError, isLoading)
 * 
 * isReady({ loading: false })          // true
 * isReady({ loading: true })           // false
 * isReady({ error: "Failed", loading: false }) // false
 * isReady({ error: "", loading: false }) // true (empty string is falsy)
 * 
 * // Weekend detection
 * const isSaturday = (day: number) => day === 6
 * const isSunday = (day: number) => day === 0
 * 
 * const isWeekday = neither(isSaturday, isSunday)
 * 
 * isWeekday(1)                         // true (Monday)
 * isWeekday(5)                         // true (Friday)
 * isWeekday(6)                         // false (Saturday)
 * isWeekday(0)                         // false (Sunday)
 * 
 * // Form validation
 * const isTooShort = (pwd: string) => pwd.length < 8
 * const hasNoSpecialChar = (pwd: string) => !/[!@#$%^&*]/.test(pwd)
 * 
 * const isValidPassword = neither(isTooShort, hasNoSpecialChar)
 * 
 * isValidPassword("abc")               // false (too short)
 * isValidPassword("longpassword")      // false (no special char)
 * isValidPassword("short!")            // false (too short despite special)
 * isValidPassword("LongPass@123")      // true
 * 
 * // Filtering with neither
 * const numbers = [-5, -2, 0, 3, 6, 9, 12]
 * const isNegative = (n: number) => n < 0
 * const isMultipleOf3 = (n: number) => n % 3 === 0
 * 
 * const filtered = numbers.filter(neither(isNegative, isMultipleOf3))
 * // [] (all numbers are either negative or multiples of 3)
 * 
 * // HTTP status checking
 * const isClientError = (status: number) => status >= 400 && status < 500
 * const isServerError = (status: number) => status >= 500 && status < 600
 * 
 * const isSuccessful = neither(isClientError, isServerError)
 * 
 * isSuccessful(200)                    // true
 * isSuccessful(301)                    // true (redirect, not error)
 * isSuccessful(404)                    // false (client error)
 * isSuccessful(500)                    // false (server error)
 * 
 * // Complex conditions
 * interface Task {
 *   completed: boolean
 *   archived: boolean
 *   priority: string
 * }
 * 
 * const isCompleted = (t: Task) => t.completed
 * const isArchived = (t: Task) => t.archived
 * 
 * const isActive = neither(isCompleted, isArchived)
 * 
 * isActive({ completed: false, archived: false, priority: "high" }) // true
 * isActive({ completed: true, archived: false, priority: "low" })   // false
 * isActive({ completed: false, archived: true, priority: "medium" }) // false
 * 
 * // Environment checking
 * const isProduction = () => process.env.NODE_ENV === "production"
 * const isTest = () => process.env.NODE_ENV === "test"
 * 
 * const isDevelopment = neither(isProduction, isTest)
 * 
 * // Composition with other combinators
 * const isZero = (n: number) => n === 0
 * const isOne = (n: number) => n === 1
 * const isBinary = neither(
 *   (n: number) => n < 0,
 *   (n: number) => n > 1
 * )
 * 
 * // De Morgan's Law demonstration
 * // neither(A, B) === !A && !B === !(A || B)
 * const notAOrB = neither(
 *   (x: number) => x > 5,
 *   (x: number) => x < -5
 * )
 * // Returns true for [-5, 5] inclusive
 * 
 * notAOrB(-10)                         // false
 * notAOrB(-5)                          // true
 * notAOrB(0)                           // true
 * notAOrB(5)                           // true
 * notAOrB(10)                          // false
 * 
 * // React component visibility
 * interface Props {
 *   hidden?: boolean
 *   disabled?: boolean
 * }
 * 
 * const shouldRender = neither(
 *   (p: Props) => !!p.hidden,
 *   (p: Props) => !!p.disabled
 * )
 * 
 * function Component(props: Props) {
 *   if (!shouldRender(props)) {
 *     return null
 *   }
 *   return <div>Visible and enabled</div>
 * }
 * 
 * // File type exclusion
 * const isImage = (file: string) => /\.(jpg|png|gif)$/i.test(file)
 * const isVideo = (file: string) => /\.(mp4|avi|mov)$/i.test(file)
 * 
 * const isDocument = neither(isImage, isVideo)
 * 
 * isDocument("report.pdf")             // true
 * isDocument("photo.jpg")              // false
 * isDocument("movie.mp4")              // false
 * isDocument("data.csv")               // true
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Short-circuit - Returns false as soon as either predicate is true
 * @property Commutative - neither(A, B) === neither(B, A)
 * @property NOR-logic - Implements logical NOR (NOT OR) operation
 */
const neither = <T>(predA: (value: T) => boolean, predB: (value: T) => boolean) => 
	(value: T): boolean => !predA(value) && !predB(value)

export default neither