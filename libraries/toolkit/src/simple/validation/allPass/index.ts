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
 * @curried (predicates) => (value) => boolean
 * @param predicates - Array of predicate functions to combine with AND logic
 * @returns A predicate that returns true only if all predicates pass
 * @example
 * ```typescript
 * // Basic usage with multiple conditions
 * const isPositive = (n: number) => n > 0
 * const isEven = (n: number) => n % 2 === 0
 * const isSmall = (n: number) => n < 100
 *
 * const isPositiveEvenSmall = allPass([isPositive, isEven, isSmall])
 *
 * isPositiveEvenSmall(4)    // true (positive, even, small)
 * isPositiveEvenSmall(2)    // true
 * isPositiveEvenSmall(102)  // false (not small)
 * isPositiveEvenSmall(3)    // false (not even)
 * isPositiveEvenSmall(-2)   // false (not positive)
 *
 * // Empty predicates array (vacuous truth)
 * const alwaysTrue = allPass([])
 * alwaysTrue(anything)      // true
 *
 * // Form validation
 * const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
 * const isLongEnough = (s: string) => s.length >= 5
 * const hasNoSpaces = (s: string) => !s.includes(" ")
 *
 * const isValidUsername = allPass([isLongEnough, hasNoSpaces])
 * const isValidEmailAddress = allPass([isValidEmail, isLongEnough])
 *
 * isValidUsername("john_doe")     // true
 * isValidUsername("joe")          // false (too short)
 * isValidUsername("john doe")     // false (has spaces)
 *
 * // Number range validation
 * const inRange = (min: number, max: number) =>
 *   allPass([
 *     (n: number) => n >= min,
 *     (n: number) => n <= max,
 *     (n: number) => !Number.isNaN(n)
 *   ])
 *
 * const isPercentage = inRange(0, 100)
 * isPercentage(50)         // true
 * isPercentage(0)          // true
 * isPercentage(100)        // true
 * isPercentage(101)        // false
 * isPercentage(-1)         // false
 * isPercentage(NaN)        // false
 *
 * // Object validation
 * interface User {
 *   name: string
 *   age: number
 *   email: string
 *   active: boolean
 * }
 *
 * const hasName = (u: User) => u.name.length > 0
 * const isAdult = (u: User) => u.age >= 18
 * const hasEmail = (u: User) => u.email.includes("@")
 * const isActive = (u: User) => u.active
 *
 * const isValidUser = allPass([hasName, isAdult, hasEmail, isActive])
 *
 * isValidUser({
 *   name: "Alice",
 *   age: 25,
 *   email: "alice@example.com",
 *   active: true
 * }) // true
 *
 * isValidUser({
 *   name: "Bob",
 *   age: 16, // fails isAdult
 *   email: "bob@example.com",
 *   active: true
 * }) // false
 *
 * // Filtering with complex criteria
 * const products = [
 *   { name: "Laptop", price: 999, inStock: true, rating: 4.5 },
 *   { name: "Mouse", price: 25, inStock: false, rating: 4.0 },
 *   { name: "Keyboard", price: 75, inStock: true, rating: 3.5 },
 *   { name: "Monitor", price: 300, inStock: true, rating: 4.8 }
 * ]
 *
 * const isPremium = allPass([
 *   (p: typeof products[0]) => p.price > 50,
 *   (p: typeof products[0]) => p.inStock,
 *   (p: typeof products[0]) => p.rating >= 4.0
 * ])
 *
 * products.filter(isPremium)
 * // [{ name: "Laptop", ... }, { name: "Monitor", ... }]
 *
 * // Short-circuit behavior
 * let checked = 0
 * const countingPredicate = (n: number) => (x: number) => {
 *   checked++
 *   return x > n
 * }
 *
 * const checkAll = allPass([
 *   countingPredicate(5),   // false for 3, stops here
 *   countingPredicate(2),   // not evaluated
 *   countingPredicate(1)    // not evaluated
 * ])
 *
 * checked = 0
 * checkAll(3)  // false
 * console.log(checked) // 1 (short-circuited after first false)
 *
 * // Composing validators
 * const isString = (x: unknown): x is string => typeof x === "string"
 * const isNonEmpty = (s: string) => s.length > 0
 * const isUpperCase = (s: string) => s === s.toUpperCase()
 *
 * const isValidCode = allPass([
 *   isString,
 *   isNonEmpty,
 *   isUpperCase
 * ])
 *
 * isValidCode("ABC123")    // true
 * isValidCode("abc123")    // false (not uppercase)
 * isValidCode("")          // false (empty)
 * isValidCode(123)         // false (not string)
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property ShortCircuit - Stops evaluation on first false result
 * @property Composable - Can be nested with other predicate combinators
 * @property Total - Handles all possible input values
 */
const allPass =
	<T>(predicates: Array<(value: T) => unknown>) => (value: T): boolean => {
		for (const predicate of predicates) {
			if (!predicate(value)) {
				return false
			}
		}
		return true
	}

export default allPass
