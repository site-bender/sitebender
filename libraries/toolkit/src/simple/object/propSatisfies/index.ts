import type { Value } from "../../../types/index.ts"

/**
 * Checks if a property satisfies a predicate function
 *
 * Returns true if the specified property of an object satisfies the given
 * predicate function. The predicate receives the property value. Returns
 * false if the property doesn't exist or doesn't satisfy the predicate.
 * Useful for complex property validation and filtering.
 *
 * @curried (predicate) => (key) => (obj) => boolean
 * @param predicate - Function to test the property value
 * @param key - The property key to test
 * @param obj - The object to test
 * @returns True if predicate(obj[key]) returns true, false otherwise
 * @example
 * ```typescript
 * // Basic predicate checks
 * propSatisfies((x: number) => x > 10)("age")({ age: 25 })        // true
 * propSatisfies((x: number) => x > 10)("age")({ age: 5 })         // false
 * propSatisfies((x: number) => x > 10)("age")({})                 // false (missing)
 *
 * // String validation
 * propSatisfies((s: string) => s.length > 5)("password")({
 *   password: "secretpass"
 * })  // true
 *
 * propSatisfies((s: string) => s.includes("@"))("email")({
 *   email: "user@example.com"
 * })  // true
 *
 * propSatisfies((s: string) => /^[A-Z]/.test(s))("name")({
 *   name: "Alice"
 * })  // true (starts with capital)
 *
 * // Number validation
 * propSatisfies((n: number) => n >= 0 && n <= 100)("score")({
 *   score: 85
 * })  // true
 *
 * propSatisfies((n: number) => Number.isInteger(n))("count")({
 *   count: 42
 * })  // true
 *
 * propSatisfies((n: number) => n % 2 === 0)("value")({
 *   value: 6
 * })  // true (even number)
 *
 * // Array validation
 * propSatisfies((arr: Array<any>) => arr.length > 0)("items")({
 *   items: [1, 2, 3]
 * })  // true
 *
 * propSatisfies((arr: Array<any>) => arr.includes("admin"))("roles")({
 *   roles: ["user", "admin", "moderator"]
 * })  // true
 *
 * propSatisfies((arr: Array<number>) => arr.every(x => x > 0))("values")({
 *   values: [1, 2, 3, 4, 5]
 * })  // true (all positive)
 *
 * // Object validation
 * propSatisfies((obj: any) => "id" in obj)("user")({
 *   user: { id: 1, name: "Bob" }
 * })  // true
 *
 * propSatisfies((obj: any) => Object.keys(obj).length > 2)("config")({
 *   config: { a: 1, b: 2, c: 3 }
 * })  // true
 *
 * // Boolean logic
 * propSatisfies((val: any) => Boolean(val))("enabled")({
 *   enabled: true
 * })  // true
 *
 * propSatisfies((val: any) => val != null)("data")({
 *   data: 0
 * })  // true (0 is not null/undefined)
 *
 * // Missing properties
 * propSatisfies((x: any) => x !== undefined)("missing")({})       // false
 * propSatisfies((x: any) => true)("missing")({})                  // false (doesn't run predicate)
 *
 * // Symbol keys
 * const sym = Symbol("special")
 * propSatisfies((v: string) => v === "secret")(sym)({
 *   [sym]: "secret"
 * })  // true
 *
 * // Practical use cases
 *
 * // Filtering valid records
 * const users = [
 *   { name: "Alice", age: 25 },
 *   { name: "Bob", age: 17 },
 *   { name: "Carol", age: 30 },
 *   { name: "Dave", age: 16 }
 * ]
 *
 * const isAdult = propSatisfies((age: number) => age >= 18)("age")
 * users.filter(isAdult)
 * // [{ name: "Alice", age: 25 }, { name: "Carol", age: 30 }]
 *
 * // Email validation
 * const hasValidEmail = propSatisfies((email: string) =>
 *   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 * )("email")
 *
 * const contacts = [
 *   { name: "Alice", email: "alice@example.com" },
 *   { name: "Bob", email: "invalid-email" },
 *   { name: "Carol", email: "carol@test.org" }
 * ]
 *
 * contacts.filter(hasValidEmail)
 * // [{ name: "Alice", ... }, { name: "Carol", ... }]
 *
 * // Range validation
 * const inRange = (min: number, max: number) =>
 *   propSatisfies((n: number) => n >= min && n <= max)
 *
 * const hasValidScore = inRange(0, 100)("score")
 * const hasValidAge = inRange(18, 65)("age")
 *
 * hasValidScore({ score: 85 })                       // true
 * hasValidScore({ score: 150 })                      // false
 * hasValidAge({ age: 30 })                           // true
 * hasValidAge({ age: 70 })                           // false
 *
 * // String pattern matching
 * const matchesPattern = (pattern: RegExp) =>
 *   propSatisfies((s: string) => pattern.test(s))
 *
 * const hasValidPhone = matchesPattern(/^\d{3}-\d{3}-\d{4}$/)("phone")
 * const hasValidZip = matchesPattern(/^\d{5}$/)("zip")
 *
 * hasValidPhone({ phone: "555-123-4567" })           // true
 * hasValidZip({ zip: "12345" })                      // true
 *
 * // Array content validation
 * const hasItems = propSatisfies((arr: Array<any>) =>
 *   Array.isArray(arr) && arr.length > 0
 * )("items")
 *
 * const hasAllPositive = propSatisfies((arr: Array<number>) =>
 *   arr.every(n => n > 0)
 * )("numbers")
 *
 * hasItems({ items: [1, 2, 3] })                     // true
 * hasItems({ items: [] })                            // false
 * hasAllPositive({ numbers: [1, 2, 3] })             // true
 * hasAllPositive({ numbers: [1, -2, 3] })            // false
 *
 * // Password strength
 * const hasStrongPassword = propSatisfies((pwd: string) =>
 *   pwd.length >= 8 &&
 *   /[A-Z]/.test(pwd) &&
 *   /[a-z]/.test(pwd) &&
 *   /[0-9]/.test(pwd) &&
 *   /[^A-Za-z0-9]/.test(pwd)
 * )("password")
 *
 * hasStrongPassword({ password: "Abc123!@#" })       // true
 * hasStrongPassword({ password: "weak" })            // false
 *
 * // Date validation
 * const isRecent = propSatisfies((date: Date) => {
 *   const dayAgo = Date.now() - (24 * 60 * 60 * 1000)
 *   return date.getTime() > dayAgo
 * })("lastActive")
 *
 * isRecent({ lastActive: new Date() })               // true
 * isRecent({ lastActive: new Date("2020-01-01") })  // false
 *
 * // Partial application patterns
 * const hasLength = (len: number) =>
 *   propSatisfies((val: any) =>
 *     (typeof val === "string" || Array.isArray(val)) &&
 *     val.length === len
 *   )
 *
 * const hasThreeChars = hasLength(3)("code")
 * hasThreeChars({ code: "ABC" })                     // true
 * hasThreeChars({ code: "AB" })                      // false
 *
 * // Complex object validation
 * const hasCompleteAddress = propSatisfies((addr: any) =>
 *   addr &&
 *   typeof addr === "object" &&
 *   addr.street &&
 *   addr.city &&
 *   addr.zip
 * )("address")
 *
 * hasCompleteAddress({
 *   address: { street: "123 Main", city: "NYC", zip: "10001" }
 * })  // true
 *
 * hasCompleteAddress({
 *   address: { city: "NYC" }
 * })  // false
 * ```
 * @property Flexible validation - predicate can perform any test
 * @property Safe access - handles missing properties gracefully
 * @property Composable - ideal for complex filtering and validation
 */
const propSatisfies = <V extends Value>(
	predicate: (value: V) => boolean,
) =>
<K extends string | symbol>(
	key: K,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined objects
	if (obj == null) {
		return false
	}

	// Check if property exists
	if (!Object.prototype.hasOwnProperty.call(obj, key as string | symbol)) {
		return false
	}

	// Test the property value with the predicate
	try {
		return predicate(obj[key] as V)
	} catch {
		// If predicate throws, return false
		return false
	}
}

export default propSatisfies
