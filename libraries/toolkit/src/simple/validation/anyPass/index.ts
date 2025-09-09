/**
 * Creates a predicate that returns true if any supplied predicate returns true
 *
 * Takes an array of predicate functions and returns a new predicate that tests
 * whether at least one of them returns truthy for a given input. Short-circuits
 * on the first truthy result for efficiency. This is the functional programming
 * equivalent of chaining multiple conditions with logical OR (||) operators.
 *
 * The returned predicate will:
 * - Return true if ANY predicate returns truthy
 * - Return false if ALL predicates return falsy
 * - Return false for empty predicate arrays
 * - Short-circuit evaluation on first true
 *
 * @pure
 * @curried
 * @predicate
 * @param predicates - Array of predicate functions to combine with OR logic
 * @returns A predicate that returns true if any predicate passes
 * @example
 * // Basic usage with multiple conditions
 * const isNegative = (n: number) => n < 0
 * const isZero = (n: number) => n === 0
 * const isHuge = (n: number) => n > 1000
 *
 * const isSpecial = anyPass([isNegative, isZero, isHuge])
 * isSpecial(-5)   // true (negative)
 * isSpecial(50)   // false (none apply)
 *
 * // Input validation with multiple formats
 * const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
 * const isPhone = (s: string) => /^\d{3}-\d{3}-\d{4}$/.test(s)
 * const isUsername = (s: string) => /^[a-zA-Z0-9_]{3,}$/.test(s)
 * const isValidContact = anyPass([isEmail, isPhone, isUsername])
 * isValidContact("user@example.com")  // true (email)
 * isValidContact("invalid!")          // false (none match)
 *
 * // Access control
 * interface User { role: string; isAdmin: boolean; permissions: string[] }
 * const canAccessAdmin = anyPass([
 *   (u: User) => u.role === "admin",
 *   (u: User) => u.isAdmin,
 *   (u: User) => u.permissions.includes("admin")
 * ])
 * canAccessAdmin({ role: "user", isAdmin: true, permissions: [] })  // true
 *
 * // Empty predicates
 * const alwaysFalse = anyPass([])
 * alwaysFalse(123)  // false
 */
const anyPass =
	<T>(predicates: Array<(value: T) => unknown>) => (value: T): boolean =>
		// Use some() for pure FP approach with short-circuit
		predicates.some((predicate) => Boolean(predicate(value)))

export default anyPass
