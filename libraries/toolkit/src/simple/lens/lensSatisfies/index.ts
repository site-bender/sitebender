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
 * @curried (lens) => (predicate) => (subject) => boolean
 * @param lens - Lens to focus on a property
 * @param predicate - Function to test the focused value
 * @param subject - Object to check
 * @returns True if focused value satisfies the predicate
 * @example
 * ```typescript
 * import { lensProp } from "../../simple/object/lensProp/index.ts"
 * import { lensPath } from "../../simple/object/lensPath/index.ts"
 * 
 * // Basic predicate check
 * const ageLens = lensProp("age")
 * const isEven = (n: number) => n % 2 === 0
 * const hasEvenAge = lensSatisfies(ageLens)(isEven)
 * 
 * hasEvenAge({ name: "Alice", age: 30 })       // true
 * hasEvenAge({ name: "Bob", age: 25 })         // false
 * 
 * // String validation
 * const emailLens = lensProp("email")
 * const isValidEmail = (email: string) => 
 *   /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
 * const hasValidEmail = lensSatisfies(emailLens)(isValidEmail)
 * 
 * const users = [
 *   { name: "Alice", email: "alice@example.com" },
 *   { name: "Bob", email: "invalid-email" },
 *   { name: "Charlie", email: "charlie@test.org" }
 * ]
 * 
 * users.filter(hasValidEmail)
 * // [{ name: "Alice", ... }, { name: "Charlie", ... }]
 * 
 * // Range check
 * const scoreLens = lensProp("score")
 * const isInRange = (min: number, max: number) => 
 *   (value: number) => value >= min && value <= max
 * const hasGoodScore = lensSatisfies(scoreLens)(isInRange(70, 90))
 * 
 * const students = [
 *   { name: "Alice", score: 85 },
 *   { name: "Bob", score: 95 },
 *   { name: "Charlie", score: 75 }
 * ]
 * 
 * students.filter(hasGoodScore)
 * // [{ name: "Alice", score: 85 }, { name: "Charlie", score: 75 }]
 * 
 * // Array validation
 * const tagsLens = lensProp("tags")
 * const hasRequiredTag = (tags: Array<string>) => 
 *   tags.includes("important")
 * const isImportant = lensSatisfies(tagsLens)(hasRequiredTag)
 * 
 * const posts = [
 *   { title: "Post 1", tags: ["news", "important"] },
 *   { title: "Post 2", tags: ["blog", "personal"] },
 *   { title: "Post 3", tags: ["important", "urgent"] }
 * ]
 * 
 * posts.filter(isImportant)
 * // [{ title: "Post 1", ... }, { title: "Post 3", ... }]
 * 
 * // Nested property validation
 * const addressLens = lensPath(["user", "address", "zipCode"])
 * const isValidZip = (zip: string) => /^\d{5}(-\d{4})?$/.test(zip)
 * const hasValidZip = lensSatisfies(addressLens)(isValidZip)
 * 
 * const records = [
 *   { user: { address: { zipCode: "12345" } } },
 *   { user: { address: { zipCode: "invalid" } } },
 *   { user: { address: { zipCode: "12345-6789" } } }
 * ]
 * 
 * records.filter(hasValidZip)
 * // [first and third records with valid zip codes]
 * 
 * // Custom business logic
 * const balanceLens = lensProp("balance")
 * const canWithdraw = (amount: number) => 
 *   (balance: number) => balance >= amount && balance - amount >= 100
 * const canWithdraw500 = lensSatisfies(balanceLens)(canWithdraw(500))
 * 
 * const accounts = [
 *   { id: 1, balance: 1000 },
 *   { id: 2, balance: 500 },
 *   { id: 3, balance: 700 }
 * ]
 * 
 * accounts.filter(canWithdraw500)
 * // [{ id: 1, balance: 1000 }, { id: 3, balance: 700 }]
 * 
 * // Date validation
 * const expiryLens = lensProp("expiry")
 * const isNotExpired = (date: Date) => date > new Date()
 * const isActive = lensSatisfies(expiryLens)(isNotExpired)
 * 
 * const memberships = [
 *   { user: "Alice", expiry: new Date("2025-01-01") },
 *   { user: "Bob", expiry: new Date("2023-01-01") },
 *   { user: "Charlie", expiry: new Date("2024-12-31") }
 * ]
 * 
 * memberships.filter(isActive)
 * // Future dates only
 * 
 * // Multiple conditions
 * const nameLens = lensProp("name")
 * const startsWithVowel = (name: string) => 
 *   /^[aeiouAEIOU]/.test(name)
 * const hasVowelName = lensSatisfies(nameLens)(startsWithVowel)
 * 
 * const people = [
 *   { name: "Alice" },
 *   { name: "Bob" },
 *   { name: "Eve" },
 *   { name: "Charlie" }
 * ]
 * 
 * people.filter(hasVowelName)
 * // [{ name: "Alice" }, { name: "Eve" }]
 * 
 * // Type checking
 * const valueLens = lensProp("value")
 * const isNumber = (v: unknown): v is number => 
 *   typeof v === "number" && !isNaN(v)
 * const hasNumericValue = lensSatisfies(valueLens)(isNumber)
 * 
 * const data = [
 *   { key: "a", value: 42 },
 *   { key: "b", value: "string" },
 *   { key: "c", value: 3.14 },
 *   { key: "d", value: NaN }
 * ]
 * 
 * data.filter(hasNumericValue)
 * // [{ key: "a", value: 42 }, { key: "c", value: 3.14 }]
 * 
 * // Password strength check
 * const passwordLens = lensProp("password")
 * const isStrongPassword = (pwd: string) => 
 *   pwd.length >= 8 &&
 *   /[A-Z]/.test(pwd) &&
 *   /[a-z]/.test(pwd) &&
 *   /[0-9]/.test(pwd) &&
 *   /[^A-Za-z0-9]/.test(pwd)
 * const hasStrongPassword = lensSatisfies(passwordLens)(isStrongPassword)
 * 
 * const users2 = [
 *   { username: "alice", password: "Pass123!" },
 *   { username: "bob", password: "weak" },
 *   { username: "charlie", password: "Str0ng&Secure" }
 * ]
 * 
 * users2.filter(hasStrongPassword)
 * // [{ username: "alice", ... }, { username: "charlie", ... }]
 * 
 * // Composed lens with predicate
 * import { composeLens } from "../composeLens/index.ts"
 * 
 * const profileLens = lensProp("profile")
 * const settingsLens = lensProp("settings")
 * const themeLens = lensProp("theme")
 * const fullThemeLens = composeLens(
 *   composeLens(profileLens, settingsLens),
 *   themeLens
 * )
 * const isDarkMode = (theme: string) => theme === "dark"
 * const usesDarkMode = lensSatisfies(fullThemeLens)(isDarkMode)
 * 
 * const appUsers = [
 *   { id: 1, profile: { settings: { theme: "dark" } } },
 *   { id: 2, profile: { settings: { theme: "light" } } },
 *   { id: 3, profile: { settings: { theme: "dark" } } }
 * ]
 * 
 * appUsers.filter(usesDarkMode)
 * // [{ id: 1, ... }, { id: 3, ... }]
 * 
 * // Partial application
 * const checkProperty = <T>(lens: Lens<any, T>) => 
 *   (predicate: (value: T) => boolean) =>
 *     lensSatisfies(lens)(predicate)
 * 
 * const checkAge = checkProperty(ageLens)
 * const isAdult = checkAge((age: number) => age >= 18)
 * const isSenior = checkAge((age: number) => age >= 65)
 * 
 * const person = { name: "Alice", age: 70 }
 * isAdult(person)   // true
 * isSenior(person)  // true
 * ```
 * @property Pure - No side effects
 * @property Curried - Can be partially applied
 * @property Flexible - Works with any predicate function
 */
const lensSatisfies = <S, A>(lens: Lens<S, A>) => 
	(predicate: (value: A) => boolean) => 
		(subject: S): boolean => 
			predicate(lens.get(subject))

export default lensSatisfies