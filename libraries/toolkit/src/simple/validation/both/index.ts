/**
 * Creates a predicate that returns true if both supplied predicates return true
 *
 * Takes exactly two predicate functions and returns a new predicate that tests
 * whether both return truthy for a given input. Short-circuits on the first
 * falsy result. This is a binary version of allPass, optimized for the common
 * case of combining exactly two conditions with logical AND (&&).
 *
 * The returned predicate will:
 * - Return true only if BOTH predicates return truthy
 * - Return false if EITHER predicate returns falsy
 * - Short-circuit if the first predicate returns false
 * - Preserve type narrowing when using TypeScript type guards
 *
 * @curried (pred1) => (pred2) => (value) => boolean
 * @param pred1 - The first predicate function
 * @param pred2 - The second predicate function
 * @returns A predicate that returns true only if both predicates pass
 * @example
 * ```typescript
 * // Basic usage with two conditions
 * const isPositive = (n: number) => n > 0
 * const isEven = (n: number) => n % 2 === 0
 *
 * const isPositiveEven = both(isPositive)(isEven)
 *
 * isPositiveEven(4)   // true (positive AND even)
 * isPositiveEven(2)   // true
 * isPositiveEven(3)   // false (positive but odd)
 * isPositiveEven(-2)  // false (even but negative)
 * isPositiveEven(-3)  // false (neither)
 *
 * // String validation
 * const hasMinLength = (min: number) => (s: string) => s.length >= min
 * const hasMaxLength = (max: number) => (s: string) => s.length <= max
 *
 * const hasLengthBetween = (min: number, max: number) =>
 *   both(hasMinLength(min))(hasMaxLength(max))
 *
 * const isValidUsername = hasLengthBetween(3, 20)
 *
 * isValidUsername("ab")        // false (too short)
 * isValidUsername("alice")     // true
 * isValidUsername("a".repeat(21)) // false (too long)
 *
 * // Type guards with TypeScript
 * const isString = (x: unknown): x is string => typeof x === "string"
 * const isNonEmpty = (x: string) => x.length > 0
 *
 * const isNonEmptyString = both(isString)(isNonEmpty)
 *
 * const value: unknown = "hello"
 * if (isNonEmptyString(value)) {
 *   // TypeScript knows value is string here
 *   console.log(value.toUpperCase())
 * }
 *
 * // Number range checking
 * const isAbove = (min: number) => (n: number) => n > min
 * const isBelow = (max: number) => (n: number) => n < max
 *
 * const isBetween = (min: number, max: number) =>
 *   both(isAbove(min))(isBelow(max))
 *
 * const isTeenAge = isBetween(12, 20)
 *
 * isTeenAge(13)  // true
 * isTeenAge(19)  // true
 * isTeenAge(12)  // false (not above 12)
 * isTeenAge(20)  // false (not below 20)
 *
 * // Object property validation
 * interface Product {
 *   price: number
 *   inStock: boolean
 *   rating?: number
 * }
 *
 * const isAvailable = (p: Product) => p.inStock
 * const isAffordable = (budget: number) => (p: Product) => p.price <= budget
 *
 * const canPurchase = (budget: number) =>
 *   both(isAvailable)(isAffordable(budget))
 *
 * const product = { price: 50, inStock: true, rating: 4.5 }
 *
 * canPurchase(100)(product)  // true
 * canPurchase(30)(product)   // false (not affordable)
 * canPurchase(100)({ ...product, inStock: false })  // false
 *
 * // Email validation
 * const hasAtSymbol = (s: string) => s.includes("@")
 * const hasDomain = (s: string) => s.includes(".")
 *
 * const looksLikeEmail = both(hasAtSymbol)(hasDomain)
 *
 * looksLikeEmail("user@example.com")  // true
 * looksLikeEmail("user@localhost")    // false (no domain)
 * looksLikeEmail("invalid.com")       // false (no @)
 *
 * // Short-circuit demonstration
 * let firstChecked = false
 * let secondChecked = false
 *
 * const checkFirst = (x: number) => {
 *   firstChecked = true
 *   return x > 0
 * }
 *
 * const checkSecond = (x: number) => {
 *   secondChecked = true
 *   return x < 10
 * }
 *
 * const checkBoth = both(checkFirst)(checkSecond)
 *
 * firstChecked = false
 * secondChecked = false
 * checkBoth(-5)  // false
 * console.log(firstChecked)   // true
 * console.log(secondChecked)  // false (short-circuited)
 *
 * // Combining with other combinators
 * const isWeekday = (d: Date) => {
 *   const day = d.getDay()
 *   return day >= 1 && day <= 5
 * }
 *
 * const isBusinessHours = (d: Date) => {
 *   const hour = d.getHours()
 *   return hour >= 9 && hour < 17
 * }
 *
 * const isWorkTime = both(isWeekday)(isBusinessHours)
 *
 * const monday9am = new Date("2024-01-01 09:00")
 * const saturday9am = new Date("2024-01-06 09:00")
 * const monday6pm = new Date("2024-01-01 18:00")
 *
 * isWorkTime(monday9am)    // true
 * isWorkTime(saturday9am)  // false (weekend)
 * isWorkTime(monday6pm)    // false (after hours)
 *
 * // Partial application patterns
 * const startsWith = (prefix: string) => (s: string) =>
 *   s.startsWith(prefix)
 *
 * const endsWith = (suffix: string) => (s: string) =>
 *   s.endsWith(suffix)
 *
 * const hasWrapper = (prefix: string, suffix: string) =>
 *   both(startsWith(prefix))(endsWith(suffix))
 *
 * const isQuoted = hasWrapper('"', '"')
 * const isParenthesized = hasWrapper('(', ')')
 *
 * isQuoted('"hello"')     // true
 * isQuoted('hello')       // false
 * isParenthesized('(x)')  // true
 * isParenthesized('[x]')  // false
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property ShortCircuit - Stops evaluation if first predicate returns false
 * @property Curried - Returns functions that can be partially applied
 * @property Binary - Specifically designed for exactly two predicates
 */
const both =
	<T>(pred1: (value: T) => unknown) =>
	(pred2: (value: T) => unknown) =>
	(value: T): boolean => Boolean(pred1(value)) && Boolean(pred2(value))

export default both
