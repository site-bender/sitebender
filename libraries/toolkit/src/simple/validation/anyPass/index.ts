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
 * @curried (predicates) => (value) => boolean
 * @param predicates - Array of predicate functions to combine with OR logic
 * @returns A predicate that returns true if any predicate passes
 * @example
 * ```typescript
 * // Basic usage with multiple conditions
 * const isNegative = (n: number) => n < 0
 * const isZero = (n: number) => n === 0
 * const isHuge = (n: number) => n > 1000
 *
 * const isSpecial = anyPass([isNegative, isZero, isHuge])
 *
 * isSpecial(-5)     // true (negative)
 * isSpecial(0)      // true (zero)
 * isSpecial(2000)   // true (huge)
 * isSpecial(50)     // false (none apply)
 *
 * // Empty predicates array
 * const alwaysFalse = anyPass([])
 * alwaysFalse(anything)  // false
 *
 * // Input validation with multiple formats
 * const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
 * const isPhone = (s: string) => /^\d{3}-\d{3}-\d{4}$/.test(s)
 * const isUsername = (s: string) => /^[a-zA-Z0-9_]{3,}$/.test(s)
 *
 * const isValidContact = anyPass([isEmail, isPhone, isUsername])
 *
 * isValidContact("user@example.com")  // true (email)
 * isValidContact("555-123-4567")      // true (phone)
 * isValidContact("john_doe")          // true (username)
 * isValidContact("invalid!")          // false (none match)
 *
 * // Flexible type checking
 * const isNullish = (x: unknown) => x == null
 * const isEmpty = (x: unknown) => x === ""
 * const isZeroValue = (x: unknown) => x === 0
 * const isFalse = (x: unknown) => x === false
 *
 * const isAbsent = anyPass([isNullish, isEmpty, isZeroValue, isFalse])
 *
 * isAbsent(null)       // true
 * isAbsent(undefined)  // true
 * isAbsent("")         // true
 * isAbsent(0)          // true
 * isAbsent(false)      // true
 * isAbsent("hello")    // false
 * isAbsent(1)          // false
 *
 * // Access control
 * interface User {
 *   role: string
 *   isAdmin: boolean
 *   permissions: string[]
 * }
 *
 * const hasAdminRole = (u: User) => u.role === "admin"
 * const hasAdminFlag = (u: User) => u.isAdmin
 * const hasAdminPermission = (u: User) => u.permissions.includes("admin")
 *
 * const canAccessAdmin = anyPass([
 *   hasAdminRole,
 *   hasAdminFlag,
 *   hasAdminPermission
 * ])
 *
 * canAccessAdmin({
 *   role: "user",
 *   isAdmin: true,  // This alone grants access
 *   permissions: []
 * }) // true
 *
 * canAccessAdmin({
 *   role: "user",
 *   isAdmin: false,
 *   permissions: ["read", "write"]
 * }) // false
 *
 * // Search filters
 * const products = [
 *   { name: "Laptop Pro", category: "electronics", featured: true },
 *   { name: "Budget Mouse", category: "accessories", featured: false },
 *   { name: "Gaming Keyboard", category: "electronics", featured: false },
 *   { name: "USB Cable", category: "accessories", featured: true }
 * ]
 *
 * const matchesSearch = (term: string) => (p: typeof products[0]) =>
 *   p.name.toLowerCase().includes(term.toLowerCase())
 *
 * const isElectronics = (p: typeof products[0]) => p.category === "electronics"
 * const isFeatured = (p: typeof products[0]) => p.featured
 *
 * // Show products that match search OR are featured OR electronics
 * const shouldShow = anyPass([
 *   matchesSearch("cable"),
 *   isFeatured,
 *   isElectronics
 * ])
 *
 * products.filter(shouldShow)
 * // All except "Budget Mouse" (not featured, not electronics, no "cable")
 *
 * // Short-circuit behavior
 * let evaluated = 0
 * const countingPredicate = (result: boolean) => () => {
 *   evaluated++
 *   return result
 * }
 *
 * const checkAny = anyPass([
 *   countingPredicate(false),  // evaluated
 *   countingPredicate(true),   // evaluated, returns true
 *   countingPredicate(false)   // not evaluated
 * ])
 *
 * evaluated = 0
 * checkAny("anything")  // true
 * console.log(evaluated) // 2 (short-circuited after first true)
 *
 * // Error recovery patterns
 * const tryParse = anyPass([
 *   (s: string) => !isNaN(Number(s)) && Number(s),
 *   (s: string) => s === "true" && true,
 *   (s: string) => s === "false" && false,
 *   (s: string) => s  // fallback to original string
 * ])
 *
 * tryParse("123")    // 123 (parsed as number)
 * tryParse("true")   // true (parsed as boolean)
 * tryParse("hello")  // "hello" (kept as string)
 *
 * // Combining with allPass for complex logic
 * const isWorkday = anyPass([
 *   (d: Date) => d.getDay() >= 1,
 *   (d: Date) => d.getDay() <= 5
 * ])
 *
 * const isBusinessHours = allPass([
 *   (d: Date) => d.getHours() >= 9,
 *   (d: Date) => d.getHours() < 17
 * ])
 *
 * const isOpenForBusiness = (d: Date) =>
 *   allPass([isWorkday, isBusinessHours])(d)
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property ShortCircuit - Stops evaluation on first true result
 * @property Composable - Can be nested with other predicate combinators
 * @property Total - Handles all possible input values
 */
const anyPass =
	<T>(predicates: Array<(value: T) => unknown>) => (value: T): boolean => {
		for (const predicate of predicates) {
			if (predicate(value)) {
				return true
			}
		}
		return false
	}

export default anyPass
