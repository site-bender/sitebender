/**
 * Performs logical OR operation on two values
 *
 * Evaluates the logical disjunction of two values, returning true when
 * at least one operand is truthy. Uses JavaScript's truthiness semantics
 * where falsy values include: false, 0, -0, 0n, "", null, undefined, NaN.
 *
 * @curried (a) => (b) => result
 * @param a - The first value to evaluate
 * @param b - The second value to evaluate
 * @returns True if at least one value is truthy, false otherwise
 * @example
 * ```typescript
 * // Basic boolean logic
 * or(true)(true)                       // true
 * or(true)(false)                      // true
 * or(false)(true)                      // true
 * or(false)(false)                     // false
 *
 * // Truthy/falsy values
 * or(1)(0)                             // true
 * or(0)(0)                             // false
 * or("hello")("")                      // true
 * or("")("")                           // false
 * or([])(null)                         // true ([] is truthy)
 * or(null)(undefined)                  // false
 *
 * // Mixed types
 * or(true)(0)                          // true
 * or(false)("yes")                     // true
 * or(false)(0)                         // false
 * or(NaN)(null)                        // false
 * or({})(false)                        // true ({} is truthy)
 *
 * // Partial application
 * const hasDefault = or("default value")
 * hasDefault(userInput)                // uses userInput if truthy, otherwise true
 * hasDefault("")                       // true
 * hasDefault(null)                     // true
 *
 * const eitherPositive = or(x > 0)
 * eitherPositive(y > 0)                // true if either x or y is positive
 *
 * // Fallback chains
 * const hasValue = or(primarySource)(secondarySource)
 * const hasAnyValue = or(hasValue)(defaultValue)
 *
 * // Feature flags with fallback
 * const isEnabled = or(config.override)
 * isEnabled(config.default)            // true if either is set
 *
 * // Validation alternatives
 * const isValidEmail = (value: string) => value.includes("@")
 * const isValidPhone = (value: string) => /^\d{10}$/.test(value)
 * const hasContact = (email: string, phone: string) =>
 *   or(isValidEmail(email))(isValidPhone(phone))
 *
 * hasContact("user@example.com", "")   // true
 * hasContact("", "1234567890")         // true
 * hasContact("", "")                   // false
 *
 * // Permission checking with alternatives
 * const canAccess = or(user.isAdmin)(user.isOwner)
 * const canModify = or(canAccess)(user.hasEditPermission)
 *
 * // Default value patterns
 * function getDisplayName(user: User): boolean {
 *   return or(user.nickname)(user.fullName)
 * }
 *
 * // Array filtering with alternative conditions
 * const isWeekend = (date: Date) => {
 *   const day = date.getDay()
 *   return or(day === 0)(day === 6)  // Sunday or Saturday
 * }
 *
 * const weekendDates = dates.filter(isWeekend)
 *
 * // Error recovery
 * const hasResult = or(tryPrimaryMethod())(tryFallbackMethod())
 * const hasAnyResult = or(hasResult)(useDefaultResult())
 *
 * // Combining with other logical operations
 * const condition1 = or(a)(b)
 * const condition2 = or(c)(d)
 * const anyCondition = or(condition1)(condition2)
 *
 * // Short-circuit evaluation
 * let sideEffect = false
 * const updateSideEffect = () => { sideEffect = true; return true }
 *
 * or(true)(updateSideEffect())         // true (sideEffect becomes true)
 * // Note: Both arguments are evaluated before the function is called
 *
 * // Configuration with fallbacks
 * const port = or(process.env.PORT)(3000)
 * const host = or(process.env.HOST)("localhost")
 *
 * // Search across multiple fields
 * function matchesSearch(item: Item, query: string): boolean {
 *   const inTitle = item.title.includes(query)
 *   const inDescription = item.description.includes(query)
 *   const inTags = item.tags.some(tag => tag.includes(query))
 *
 *   return or(or(inTitle)(inDescription))(inTags)
 * }
 *
 * // Null checking chain
 * const hasData = or(data?.primary)(data?.fallback)
 * const hasAnyData = or(hasData)(data?.default)
 *
 * // Type guards
 * const isStringOrNumber = (value: unknown): boolean =>
 *   or(typeof value === "string")(typeof value === "number")
 * ```
 * @property Pure - Always returns same result for same inputs
 * @property Curried - Allows partial application for reusable conditions
 * @property Type-safe - Works with any types using truthiness
 */
const or = (a: unknown) => (b: unknown): boolean => Boolean(a) || Boolean(b)

export default or
