/**
 * Creates a predicate that returns true if either supplied predicate returns true
 * 
 * Takes exactly two predicate functions and returns a new predicate that tests
 * whether at least one returns truthy for a given input. Short-circuits on the
 * first truthy result. This is a binary version of anyPass, optimized for the
 * common case of combining exactly two conditions with logical OR (||).
 * 
 * The returned predicate will:
 * - Return true if EITHER predicate returns truthy
 * - Return false only if BOTH predicates return falsy
 * - Short-circuit if the first predicate returns true
 * - Work with TypeScript type guards for type narrowing
 * 
 * @curried (pred1) => (pred2) => (value) => boolean
 * @param pred1 - The first predicate function
 * @param pred2 - The second predicate function
 * @returns A predicate that returns true if either predicate passes
 * @example
 * ```typescript
 * // Basic usage with two conditions
 * const isNegative = (n: number) => n < 0
 * const isHuge = (n: number) => n > 1000
 * 
 * const isExtreme = either(isNegative)(isHuge)
 * 
 * isExtreme(-5)    // true (negative)
 * isExtreme(2000)  // true (huge)
 * isExtreme(50)    // false (neither)
 * isExtreme(-2000) // true (both, but first suffices)
 * 
 * // String format validation
 * const isEmail = (s: string) => s.includes("@") && s.includes(".")
 * const isPhone = (s: string) => /^\d{3}-\d{3}-\d{4}$/.test(s)
 * 
 * const isContactInfo = either(isEmail)(isPhone)
 * 
 * isContactInfo("user@example.com")  // true (email)
 * isContactInfo("555-123-4567")      // true (phone)
 * isContactInfo("john doe")          // false (neither)
 * 
 * // Null/undefined checking
 * const isNull = (x: unknown) => x === null
 * const isUndefined = (x: unknown) => x === undefined
 * 
 * const isNullish = either(isNull)(isUndefined)
 * 
 * isNullish(null)       // true
 * isNullish(undefined)  // true
 * isNullish(0)          // false
 * isNullish("")         // false
 * isNullish(false)      // false
 * 
 * // Access control
 * interface User {
 *   role: string
 *   isAdmin: boolean
 *   department?: string
 * }
 * 
 * const hasAdminRole = (u: User) => u.role === "admin"
 * const hasManagerRole = (u: User) => u.role === "manager"
 * 
 * const hasElevatedPrivileges = either(hasAdminRole)(hasManagerRole)
 * 
 * hasElevatedPrivileges({ role: "admin", isAdmin: true })     // true
 * hasElevatedPrivileges({ role: "manager", isAdmin: false })  // true
 * hasElevatedPrivileges({ role: "user", isAdmin: false })     // false
 * 
 * // Weekend detection
 * const isSaturday = (d: Date) => d.getDay() === 6
 * const isSunday = (d: Date) => d.getDay() === 0
 * 
 * const isWeekend = either(isSaturday)(isSunday)
 * 
 * isWeekend(new Date("2024-01-06"))  // true (Saturday)
 * isWeekend(new Date("2024-01-07"))  // true (Sunday)
 * isWeekend(new Date("2024-01-08"))  // false (Monday)
 * 
 * // Empty value detection
 * const isEmptyString = (x: unknown) => x === ""
 * const isEmptyArray = (x: unknown) => Array.isArray(x) && x.length === 0
 * 
 * const isEmpty = either(isEmptyString)(isEmptyArray)
 * 
 * isEmpty("")          // true
 * isEmpty([])          // true
 * isEmpty("hello")     // false
 * isEmpty([1, 2])      // false
 * isEmpty(null)        // false
 * 
 * // Short-circuit demonstration
 * let firstEvaluated = false
 * let secondEvaluated = false
 * 
 * const alwaysTrue = (_: unknown) => {
 *   firstEvaluated = true
 *   return true
 * }
 * 
 * const neverCalled = (_: unknown) => {
 *   secondEvaluated = true
 *   return false
 * }
 * 
 * const checkEither = either(alwaysTrue)(neverCalled)
 * 
 * firstEvaluated = false
 * secondEvaluated = false
 * checkEither("anything")  // true
 * console.log(firstEvaluated)   // true
 * console.log(secondEvaluated)  // false (short-circuited)
 * 
 * // Type narrowing with TypeScript
 * const isString = (x: unknown): x is string => typeof x === "string"
 * const isNumber = (x: unknown): x is number => typeof x === "number"
 * 
 * const isStringOrNumber = either(isString)(isNumber)
 * 
 * const processValue = (value: unknown) => {
 *   if (isStringOrNumber(value)) {
 *     // TypeScript knows value is string | number
 *     return String(value).toUpperCase()
 *   }
 *   return "invalid"
 * }
 * 
 * processValue("hello")  // "HELLO"
 * processValue(42)       // "42"
 * processValue(true)     // "invalid"
 * 
 * // Boundary checking
 * const isTooSmall = (min: number) => (n: number) => n < min
 * const isTooBig = (max: number) => (n: number) => n > max
 * 
 * const isOutOfRange = (min: number, max: number) =>
 *   either(isTooSmall(min))(isTooBig(max))
 * 
 * const isInvalidAge = isOutOfRange(0, 150)
 * 
 * isInvalidAge(-5)   // true (too small)
 * isInvalidAge(200)  // true (too big)
 * isInvalidAge(25)   // false (in range)
 * 
 * // Partial application for reusable validators
 * const startsWith = (prefix: string) => (s: string) =>
 *   s.startsWith(prefix)
 * 
 * const isHttpUrl = either(startsWith("http://"))(startsWith("https://"))
 * 
 * isHttpUrl("https://example.com")  // true
 * isHttpUrl("http://example.com")   // true
 * isHttpUrl("ftp://example.com")    // false
 * isHttpUrl("example.com")          // false
 * 
 * // Combining with both for complex logic
 * const isWorkday = (d: Date) => {
 *   const day = d.getDay()
 *   return day >= 1 && day <= 5
 * }
 * 
 * const isHoliday = (d: Date) => {
 *   // Simplified holiday check
 *   const dateStr = d.toISOString().slice(5, 10)
 *   return dateStr === "01-01" || dateStr === "12-25"
 * }
 * 
 * const isOffDay = either(isWeekend)(isHoliday)
 * 
 * isOffDay(new Date("2024-01-01"))  // true (holiday)
 * isOffDay(new Date("2024-01-06"))  // true (weekend)
 * isOffDay(new Date("2024-01-02"))  // false (workday)
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property ShortCircuit - Stops evaluation if first predicate returns true
 * @property Curried - Returns functions that can be partially applied
 * @property Binary - Specifically designed for exactly two predicates
 */
const either = <T>(pred1: (value: T) => unknown) =>
	(pred2: (value: T) => unknown) =>
		(value: T): boolean =>
			Boolean(pred1(value)) || Boolean(pred2(value))

export default either