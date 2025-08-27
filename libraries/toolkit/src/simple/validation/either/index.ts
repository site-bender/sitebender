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
 * @pure
 * @curried
 * @predicate
 * @param pred1 - The first predicate function
 * @param pred2 - The second predicate function
 * @returns A predicate that returns true if either predicate passes
 * @example
 * // Basic usage with two conditions
 * const isNegative = (n: number) => n < 0
 * const isHuge = (n: number) => n > 1000
 * const isExtreme = either(isNegative)(isHuge)
 * isExtreme(-5)    // true (negative)
 * isExtreme(50)    // false (neither)
 *
 * // String format validation
 * const isEmail = (s: string) => s.includes("@") && s.includes(".")
 * const isPhone = (s: string) => /^\d{3}-\d{3}-\d{4}$/.test(s)
 * const isContactInfo = either(isEmail)(isPhone)
 * isContactInfo("user@example.com")  // true (email)
 * isContactInfo("john doe")          // false (neither)
 *
 * // Weekend detection
 * const isSaturday = (d: Date) => d.getDay() === 6
 * const isSunday = (d: Date) => d.getDay() === 0
 * const isWeekend = either(isSaturday)(isSunday)
 * isWeekend(new Date("2024-01-06"))  // true (Saturday)
 * isWeekend(new Date("2024-01-08"))  // false (Monday)
 *
 * // Null/undefined checking
 * const isNull = (x: unknown) => x === null
 * const isUndefined = (x: unknown) => x === undefined
 * const isNullish = either(isNull)(isUndefined)
 * isNullish(null)  // true
 * isNullish(0)     // false
 */
const either =
	<T>(pred1: (value: T) => unknown) =>
	(pred2: (value: T) => unknown) =>
	(value: T): boolean => Boolean(pred1(value)) || Boolean(pred2(value))

export default either
