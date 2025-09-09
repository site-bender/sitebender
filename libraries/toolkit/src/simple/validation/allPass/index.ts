/**
 * Creates a predicate that returns true if all supplied predicates return true
 *
 * Takes an array of predicate functions and returns a new predicate that tests
 * whether all of them return truthy for a given input. Short-circuits on the
 * first falsy result for efficiency. This is the functional programming equivalent
 * of chaining multiple conditions with logical AND (&&) operators.
 *
 * The returned predicate will:
 * - Return true if ALL predicates return truthy
 * - Return false if ANY predicate returns falsy
 * - Return true for empty predicate arrays (vacuous truth)
 * - Short-circuit evaluation on first false
 *
 * @pure
 * @curried
 * @predicate
 * @param predicates - Array of predicate functions to combine with AND logic
 * @returns A predicate that returns true only if all predicates pass
 * @example
 * // Basic usage with multiple conditions
 * const isPositive = (n: number) => n > 0
 * const isEven = (n: number) => n % 2 === 0
 * const isSmall = (n: number) => n < 100
 *
 * const isPositiveEvenSmall = allPass([isPositive, isEven, isSmall])
 * isPositiveEvenSmall(4)    // true (positive, even, small)
 * isPositiveEvenSmall(3)    // false (not even)
 *
 * // Form validation
 * const isLongEnough = (s: string) => s.length >= 5
 * const hasNoSpaces = (s: string) => !s.includes(" ")
 * const isValidUsername = allPass([isLongEnough, hasNoSpaces])
 * isValidUsername("john_doe")  // true
 * isValidUsername("joe")       // false (too short)
 *
 * // Object validation
 * interface User { name: string; age: number; active: boolean }
 * const isAdult = (u: User) => u.age >= 18
 * const isActive = (u: User) => u.active
 * const isValidUser = allPass([isAdult, isActive])
 * isValidUser({ name: "Alice", age: 25, active: true })  // true
 * isValidUser({ name: "Bob", age: 16, active: true })    // false
 *
 * // Empty predicates (vacuous truth)
 * const alwaysTrue = allPass([])
 * alwaysTrue(123)  // true
 */
const allPass =
	<T>(predicates: Array<(value: T) => unknown>) => (value: T): boolean =>
		// Use every() for pure FP approach with short-circuit
		predicates.every((predicate) => Boolean(predicate(value)))

export default allPass
