import type { Lens } from "../../simple/object/lens/index.ts"

/**
 * Checks if value at lens focus satisfies a predicate
 *
 * Creates a predicate function that checks if the value at the lens focus
 * satisfies a given predicate function. This is the most general lens
 * predicate combinator, allowing any custom validation logic on nested
 * properties. Useful for complex conditions, custom validations, and
 * combining multiple checks.
 *
 * @curried
 * @param lens - Lens to focus on a property
 * @param predicate - Function to test the focused value
 * @param subject - Object to check
 * @returns True if focused value satisfies the predicate
 * @example
 * ```typescript
 * import { lensProp } from "../../simple/object/lensProp/index.ts"
 *
 * // Basic predicate check
 * const ageLens = lensProp("age")
 * const isEven = (n: number) => n % 2 === 0
 * const hasEvenAge = lensSatisfies(ageLens)(isEven)
 * hasEvenAge({ name: "Alice", age: 30 }) // true
 * hasEvenAge({ name: "Bob", age: 25 }) // false
 *
 * // Filter with custom predicate
 * const scoreLens = lensProp("score")
 * const isInRange = (min: number, max: number) =>
 *   (value: number) => value >= min && value <= max
 * const hasGoodScore = lensSatisfies(scoreLens)(isInRange(70, 90))
 * const students = [
 *   { name: "Alice", score: 85 },
 *   { name: "Bob", score: 95 }
 * ]
 * students.filter(hasGoodScore) // [{ name: "Alice", score: 85 }]
 *
 * // Email validation
 * const emailLens = lensProp("email")
 * const isValidEmail = (email: string) =>
 *   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 * const hasValidEmail = lensSatisfies(emailLens)(isValidEmail)
 * hasValidEmail({ email: "test@example.com" }) // true
 * ```
 * @pure
 * @curried
 * @predicate
 */
const lensSatisfies =
	<S, A>(lens: Lens<S, A>) =>
	(predicate: (value: A) => boolean) =>
	(subject: S): boolean => predicate(lens.get(subject))

export default lensSatisfies
