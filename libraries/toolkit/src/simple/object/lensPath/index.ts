import type { Value } from "../../../types/index.ts"
import type { Lens } from "../lens/index.ts"

import assocPath from "../assocPath/index.ts"
import lens from "../lens/index.ts"
import path from "../path/index.ts"

/**
 * Creates a lens focused on a nested path
 *
 * Returns a lens that focuses on a value at a specified path within
 * a nested data structure. The lens provides immutable get and set
 * operations for deeply nested properties. If intermediate objects
 * don't exist during set operations, they are created automatically.
 *
 * @param pathArray - Array of keys representing the path to focus on
 * @returns A lens focused on the value at the specified path
 * @example
 * ```typescript
 * // Basic nested path lens
 * const addressLens = lensPath(["user", "address", "city"])
 *
 * const data = {
 *   user: {
 *     name: "Alice",
 *     address: {
 *       city: "NYC",
 *       zip: "10001"
 *     }
 *   }
 * }
 *
 * addressLens.get(data)                   // "NYC"
 * addressLens.set("Boston")(data)
 * // {
 * //   user: {
 * //     name: "Alice",
 * //     address: {
 * //       city: "Boston",
 * //       zip: "10001"
 * //     }
 * //   }
 * // }
 *
 * // Path doesn't exist - get returns undefined
 * const missingLens = lensPath(["a", "b", "c"])
 * missingLens.get({ x: 1 })               // undefined
 *
 * // Path doesn't exist - set creates structure
 * missingLens.set(42)({})
 * // { a: { b: { c: 42 } } }
 *
 * // Single element path
 * const nameLens = lensPath(["name"])
 * nameLens.get({ name: "Bob", age: 30 })  // "Bob"
 * nameLens.set("Robert")({ name: "Bob", age: 30 })
 * // { name: "Robert", age: 30 }
 *
 * // Empty path returns/sets the entire object
 * const rootLens = lensPath([])
 * rootLens.get({ a: 1, b: 2 })            // { a: 1, b: 2 }
 * rootLens.set({ x: 10 })({ a: 1, b: 2 }) // { x: 10 }
 *
 * // Working with arrays in paths
 * const itemLens = lensPath(["items", 0, "name"])
 * const catalog = {
 *   items: [
 *     { id: 1, name: "Widget" },
 *     { id: 2, name: "Gadget" }
 *   ]
 * }
 *
 * itemLens.get(catalog)                   // "Widget"
 * itemLens.set("Super Widget")(catalog)
 * // {
 * //   items: [
 * //     { id: 1, name: "Super Widget" },
 * //     { id: 2, name: "Gadget" }
 * //   ]
 * // }
 *
 * // Deep nesting
 * const deepLens = lensPath(["a", "b", "c", "d", "e"])
 * const deepObj = {
 *   a: {
 *     b: {
 *       c: {
 *         d: {
 *           e: "deep value"
 *         }
 *       }
 *     }
 *   }
 * }
 *
 * deepLens.get(deepObj)                   // "deep value"
 * deepLens.set("updated")(deepObj)
 * // Updates e to "updated" while preserving all structure
 *
 * // Practical: Form data management
 * const emailLens = lensPath(["contact", "email"])
 * const phoneLens = lensPath(["contact", "phone"])
 *
 * const formData = {
 *   name: "John",
 *   contact: {
 *     email: "john@example.com",
 *     phone: "123-456-7890"
 *   }
 * }
 *
 * const updateEmail = emailLens.set("newemail@example.com")
 * const updatePhone = phoneLens.set("098-765-4321")
 *
 * const updated = updatePhone(updateEmail(formData))
 * // Both email and phone updated immutably
 *
 * // Configuration management
 * const timeoutLens = lensPath(["server", "config", "timeout"])
 * const portLens = lensPath(["server", "config", "port"])
 *
 * const config = {
 *   server: {
 *     config: {
 *       timeout: 5000,
 *       port: 3000
 *     }
 *   }
 * }
 *
 * timeoutLens.get(config)                 // 5000
 * const newConfig = timeoutLens.set(10000)(config)
 * // timeout updated to 10000
 *
 * // State management pattern
 * type AppState = {
 *   ui: {
 *     modal: {
 *       isOpen: boolean
 *       content: string
 *     }
 *     theme: string
 *   }
 *   data: {
 *     users: Array<{ id: number; name: string }>
 *   }
 * }
 *
 * const modalOpenLens = lensPath(["ui", "modal", "isOpen"])
 * const themeLens = lensPath(["ui", "theme"])
 * const usersLens = lensPath(["data", "users"])
 *
 * const state: AppState = {
 *   ui: {
 *     modal: { isOpen: false, content: "" },
 *     theme: "light"
 *   },
 *   data: {
 *     users: [{ id: 1, name: "Alice" }]
 *   }
 * }
 *
 * const openModal = modalOpenLens.set(true)
 * const setDarkTheme = themeLens.set("dark")
 * const addUser = (user: { id: number; name: string }) =>
 *   usersLens.set([...usersLens.get(state), user])
 *
 * // Apply multiple updates
 * const newState = openModal(setDarkTheme(state))
 *
 * // Modify values at path
 * const incrementLens = lensPath(["stats", "count"])
 * const stats = { stats: { count: 5 } }
 *
 * const increment = (obj: typeof stats) => {
 *   const current = incrementLens.get(obj) || 0
 *   return incrementLens.set(current + 1)(obj)
 * }
 *
 * increment(stats) // { stats: { count: 6 } }
 *
 * // Safe navigation with default values
 * const safeLens = lensPath(["optional", "nested", "value"])
 * const getWithDefault = (obj: any) =>
 *   safeLens.get(obj) ?? "default"
 *
 * getWithDefault({})                      // "default"
 * getWithDefault({ optional: { nested: { value: "exists" } } }) // "exists"
 * ```
 * @property Path creation - automatically creates missing intermediate objects
 * @property Type flexible - works with any nested structure
 * @property Immutable updates - all operations return new objects
 */
const lensPath = (
	pathArray: Array<string | number | symbol>,
): Lens<Value, Value> => {
	return lens<Value, Value>(
		// Getter: traverse path to get value
		(obj) => path(pathArray)(obj),
	)(
		// Setter: immutably set value at path
		(value) => (obj) => {
			// Empty path means replace entire object
			if (pathArray.length === 0) {
				return value
			}

			// Use assocPath for immutable nested updates
			return assocPath(pathArray)(value)(
				obj && typeof obj === "object"
					? obj as Record<string | symbol, Value>
					: {},
			)
		},
	)
}

export default lensPath
