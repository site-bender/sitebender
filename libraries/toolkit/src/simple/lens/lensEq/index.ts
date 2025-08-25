import type { Lens } from "../../simple/object/lens/index.ts"

/**
 * Checks equality at lens focus
 *
 * Creates a predicate function that checks if the value at the lens focus
 * equals a given value. Useful for filtering, validation, and conditional
 * logic based on nested property values without manually accessing them.
 *
 * @curried (lens) => (value) => (subject) => boolean
 * @param lens - Lens to focus on a property
 * @param value - Value to compare against
 * @param subject - Object to check
 * @returns True if focused value equals the given value
 * @example
 * ```typescript
 * import { lensProp } from "../../simple/object/lensProp/index.ts"
 * import { lensPath } from "../../simple/object/lensPath/index.ts"
 *
 * // Basic equality check
 * const nameLens = lensProp("name")
 * const isAlice = lensEq(nameLens)("Alice")
 *
 * isAlice({ name: "Alice", age: 30 })          // true
 * isAlice({ name: "Bob", age: 25 })            // false
 *
 * // Nested property check
 * const statusLens = lensPath(["user", "status"])
 * const isActive = lensEq(statusLens)("active")
 *
 * isActive({ user: { status: "active" } })     // true
 * isActive({ user: { status: "inactive" } })   // false
 *
 * // Number comparison
 * const ageLens = lensProp("age")
 * const is30 = lensEq(ageLens)(30)
 *
 * const users = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 30 }
 * ]
 *
 * users.filter(is30)
 * // [{ name: "Alice", age: 30 }, { name: "Charlie", age: 30 }]
 *
 * // Boolean check
 * const completedLens = lensProp("completed")
 * const isCompleted = lensEq(completedLens)(true)
 *
 * const tasks = [
 *   { id: 1, completed: true },
 *   { id: 2, completed: false },
 *   { id: 3, completed: true }
 * ]
 *
 * tasks.filter(isCompleted)
 * // [{ id: 1, completed: true }, { id: 3, completed: true }]
 *
 * // Null/undefined check
 * const valueLens = lensProp("value")
 * const isNull = lensEq(valueLens)(null)
 * const isUndefined = lensEq(valueLens)(undefined)
 *
 * isNull({ value: null })                      // true
 * isNull({ value: 0 })                         // false
 * isUndefined({ value: undefined })            // true
 * isUndefined({})                              // true (missing property)
 *
 * // Array element check
 * import { lensIndex } from "../../simple/object/lensIndex/index.ts"
 *
 * const firstLens = lensIndex(0)
 * const startsWithA = lensEq(firstLens)("A")
 *
 * startsWithA(["A", "B", "C"])                 // true
 * startsWithA(["B", "C", "D"])                 // false
 *
 * // Composed lens check
 * import { composeLens } from "../composeLens/index.ts"
 *
 * const addressLens = lensProp("address")
 * const cityLens = lensProp("city")
 * const addressCityLens = composeLens(addressLens, cityLens)
 * const isNewYork = lensEq(addressCityLens)("New York")
 *
 * const people = [
 *   { name: "Alice", address: { city: "New York" } },
 *   { name: "Bob", address: { city: "Boston" } },
 *   { name: "Charlie", address: { city: "New York" } }
 * ]
 *
 * people.filter(isNewYork)
 * // [{ name: "Alice", ... }, { name: "Charlie", ... }]
 *
 * // Enum/constant comparison
 * type Status = "pending" | "approved" | "rejected"
 * const statusLens2 = lensProp<{ status: Status }, Status>("status")
 * const isPending = lensEq(statusLens2)("pending")
 * const isApproved = lensEq(statusLens2)("approved")
 *
 * const requests = [
 *   { id: 1, status: "pending" as Status },
 *   { id: 2, status: "approved" as Status },
 *   { id: 3, status: "pending" as Status }
 * ]
 *
 * requests.filter(isPending)                   // ids 1 and 3
 * requests.filter(isApproved)                  // id 2
 *
 * // Object reference equality (careful!)
 * const configLens = lensProp("config")
 * const defaultConfig = { theme: "light" }
 * const hasDefaultConfig = lensEq(configLens)(defaultConfig)
 *
 * hasDefaultConfig({ config: defaultConfig })  // true (same reference)
 * hasDefaultConfig({ config: { theme: "light" } }) // false (different object)
 *
 * // Using with find
 * const idLens = lensProp("id")
 * const findById = (id: number) => (items: Array<{ id: number }>) =>
 *   items.find(lensEq(idLens)(id))
 *
 * const items = [
 *   { id: 1, name: "Item 1" },
 *   { id: 2, name: "Item 2" },
 *   { id: 3, name: "Item 3" }
 * ]
 *
 * findById(2)(items)                           // { id: 2, name: "Item 2" }
 *
 * // Validation helper
 * const roleLens = lensProp("role")
 * const isAdmin = lensEq(roleLens)("admin")
 * const isModerator = lensEq(roleLens)("moderator")
 *
 * const canModerate = (user: any) =>
 *   isAdmin(user) || isModerator(user)
 *
 * canModerate({ role: "admin" })               // true
 * canModerate({ role: "moderator" })           // true
 * canModerate({ role: "user" })                // false
 *
 * // Partial application for multiple checks
 * const typeLens = lensProp("type")
 * const checkType = lensEq(typeLens)
 *
 * const isError = checkType("error")
 * const isWarning = checkType("warning")
 * const isInfo = checkType("info")
 *
 * const messages = [
 *   { type: "error", text: "Failed" },
 *   { type: "info", text: "Success" },
 *   { type: "warning", text: "Caution" }
 * ]
 *
 * messages.filter(isError)                     // [{ type: "error", ... }]
 * messages.filter(isWarning)                   // [{ type: "warning", ... }]
 * ```
 * @property Pure - No side effects
 * @property Curried - Can be partially applied
 * @property Type-safe - Maintains type information through lens
 */
const lensEq =
	<S, A>(lens: Lens<S, A>) => (value: A) => (subject: S): boolean =>
		lens.get(subject) === value

export default lensEq
