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
 * @pure
 * @curried
 * @predicate
 * @param pred1 - The first predicate function
 * @param pred2 - The second predicate function
 * @returns A predicate that returns true only if both predicates pass
 * @example
 * // Basic usage with two conditions
 * const isPositive = (n: number) => n > 0
 * const isEven = (n: number) => n % 2 === 0
 * const isPositiveEven = both(isPositive)(isEven)
 * isPositiveEven(4)   // true (positive AND even)
 * isPositiveEven(3)   // false (positive but odd)
 *
 * // String validation
 * const hasMinLength = (min: number) => (s: string) => s.length >= min
 * const hasMaxLength = (max: number) => (s: string) => s.length <= max
 * const hasLengthBetween = (min: number, max: number) =>
 *   both(hasMinLength(min))(hasMaxLength(max))
 * const isValidUsername = hasLengthBetween(3, 20)
 * isValidUsername("alice")  // true
 * isValidUsername("ab")     // false (too short)
 *
 * // Number range checking
 * const isAbove = (min: number) => (n: number) => n > min
 * const isBelow = (max: number) => (n: number) => n < max
 * const isBetween = (min: number, max: number) =>
 *   both(isAbove(min))(isBelow(max))
 * isBetween(12, 20)(15)  // true
 *
 * // Email validation
 * const hasAtSymbol = (s: string) => s.includes("@")
 * const hasDomain = (s: string) => s.includes(".")
 * const looksLikeEmail = both(hasAtSymbol)(hasDomain)
 * looksLikeEmail("user@example.com")  // true
 * looksLikeEmail("invalid.com")       // false (no @)
 */
const both =
	<T>(pred1: (value: T) => unknown) =>
	(pred2: (value: T) => unknown) =>
	(value: T): boolean => Boolean(pred1(value)) && Boolean(pred2(value))

export default both
