import type { Value } from "../../../types/index.ts"
import type { Lens } from "../lens/index.ts"

import lens from "../lens/index.ts"

/**
 * Creates a lens focused on an object property
 *
 * Returns a lens that focuses on a specific property of an object,
 * providing immutable get and set operations for that property.
 * This is a simpler alternative to lensPath for single-level access.
 *
 * @param prop - The property key to focus on
 * @returns A lens focused on the specified property
 * @example
 * ```typescript
 * // Basic property lens
 * const nameLens = lensProp("name")
 *
 * const person = { name: "Alice", age: 30 }
 * nameLens.get(person)                    // "Alice"
 * nameLens.set("Bob")(person)             // { name: "Bob", age: 30 }
 * person                                   // { name: "Alice", age: 30 } (unchanged)
 *
 * // Number property
 * const ageLens = lensProp("age")
 * ageLens.get({ name: "John", age: 25 })  // 25
 * ageLens.set(26)({ name: "John", age: 25 })
 * // { name: "John", age: 26 }
 *
 * // Missing property - get returns undefined
 * const missingLens = lensProp("missing")
 * missingLens.get({ a: 1, b: 2 })         // undefined
 *
 * // Missing property - set adds it
 * missingLens.set("value")({ a: 1, b: 2 })
 * // { a: 1, b: 2, missing: "value" }
 *
 * // Symbol properties
 * const sym = Symbol("id")
 * const symLens = lensProp(sym)
 * const obj = { [sym]: 123, name: "test" }
 *
 * symLens.get(obj)                        // 123
 * symLens.set(456)(obj)                   // { [Symbol(id)]: 456, name: "test" }
 *
 * // Array/object values
 * const itemsLens = lensProp("items")
 * const data = { items: [1, 2, 3], total: 6 }
 *
 * itemsLens.get(data)                     // [1, 2, 3]
 * itemsLens.set([4, 5, 6])(data)          // { items: [4, 5, 6], total: 6 }
 *
 * // Nested object values
 * const configLens = lensProp("config")
 * const app = {
 *   name: "MyApp",
 *   config: { port: 3000, host: "localhost" }
 * }
 *
 * configLens.get(app)                     // { port: 3000, host: "localhost" }
 * configLens.set({ port: 8080, host: "0.0.0.0" })(app)
 * // { name: "MyApp", config: { port: 8080, host: "0.0.0.0" } }
 *
 * // Composing updates
 * const xLens = lensProp("x")
 * const yLens = lensProp("y")
 * const point = { x: 10, y: 20 }
 *
 * const movePoint = yLens.set(30)(xLens.set(15)(point))
 * // { x: 15, y: 30 }
 *
 * // Modifying values through lens
 * const countLens = lensProp("count")
 * const counter = { count: 5, label: "Counter" }
 *
 * const increment = (obj: typeof counter) => {
 *   const current = countLens.get(obj) || 0
 *   return countLens.set(current + 1)(obj)
 * }
 *
 * increment(counter)                      // { count: 6, label: "Counter" }
 * increment(increment(counter))           // { count: 7, label: "Counter" }
 *
 * // Type-safe property access
 * type User = {
 *   id: number
 *   email: string
 *   active: boolean
 * }
 *
 * const emailLens = lensProp<User, "email">("email")
 * const activeLens = lensProp<User, "active">("active")
 *
 * const user: User = { id: 1, email: "old@ex.com", active: true }
 *
 * emailLens.get(user)                     // "old@ex.com"
 * emailLens.set("new@ex.com")(user)
 * // { id: 1, email: "new@ex.com", active: true }
 *
 * activeLens.set(false)(user)
 * // { id: 1, email: "old@ex.com", active: false }
 *
 * // Practical: Settings management
 * const themeLens = lensProp("theme")
 * const languageLens = lensProp("language")
 * const notificationsLens = lensProp("notifications")
 *
 * const settings = {
 *   theme: "light",
 *   language: "en",
 *   notifications: true
 * }
 *
 * const darkMode = themeLens.set("dark")
 * const spanish = languageLens.set("es")
 * const muted = notificationsLens.set(false)
 *
 * // Apply multiple settings changes
 * const newSettings = muted(spanish(darkMode(settings)))
 * // { theme: "dark", language: "es", notifications: false }
 *
 * // Form field updates
 * const fields = {
 *   username: "",
 *   password: "",
 *   remember: false
 * }
 *
 * const usernameLens = lensProp("username")
 * const passwordLens = lensProp("password")
 * const rememberLens = lensProp("remember")
 *
 * const updateField = (field: keyof typeof fields) =>
 *   (value: any) => (form: typeof fields) => {
 *     const fieldLens = lensProp(field)
 *     return fieldLens.set(value)(form)
 *   }
 *
 * updateField("username")("alice")(fields)
 * // { username: "alice", password: "", remember: false }
 *
 * // Toggle boolean properties
 * const toggleLens = <T extends Record<string, any>>(prop: keyof T) => {
 *   const propLens = lensProp(prop)
 *   return (obj: T) => propLens.set(!propLens.get(obj))(obj)
 * }
 *
 * const toggleActive = toggleLens<{ active: boolean }>("active")
 * toggleActive({ active: true })          // { active: false }
 * toggleActive({ active: false })         // { active: true }
 * ```
 * @property Simple API - focused on single property access
 * @property Type-safe - can be typed for specific object shapes
 * @property Composable - multiple lenses can be chained for updates
 */
const lensProp = <T extends Record<string | symbol, Value>, K extends keyof T>(
	prop: K,
): Lens<T, T[K]> => {
	return lens<T, T[K]>(
		// Getter: access the property
		(obj) => obj[prop],
	)(
		// Setter: immutably update the property
		(value) => (obj) => ({
			...obj,
			[prop]: value,
		}),
	)
}

export default lensProp
