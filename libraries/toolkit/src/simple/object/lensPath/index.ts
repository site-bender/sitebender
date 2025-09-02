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
 * @pure
 * @immutable
 * @param pathArray - Array of keys representing the path to focus on
 * @returns A lens focused on the value at the specified path
 * @example
 * ```typescript
 * // Basic nested path lens
 * const addressLens = lensPath(["user", "address", "city"])
 * const data = {
 *   user: {
 *     name: "Alice",
 *     address: { city: "NYC", zip: "10001" }
 *   }
 * }
 * addressLens.get(data)                   // "NYC"
 * addressLens.set("Boston")(data)
 * // { user: { name: "Alice", address: { city: "Boston", zip: "10001" } } }
 *
 * // Path doesn't exist - set creates structure
 * const missingLens = lensPath(["a", "b", "c"])
 * missingLens.get({ x: 1 })               // undefined
 * missingLens.set(42)({})                 // { a: { b: { c: 42 } } }
 *
 * // Working with arrays in paths
 * const itemLens = lensPath(["items", 0, "name"])
 * const catalog = {
 *   items: [{ id: 1, name: "Widget" }, { id: 2, name: "Gadget" }]
 * }
 * itemLens.get(catalog)                   // "Widget"
 * itemLens.set("Super Widget")(catalog)
 * // { items: [{ id: 1, name: "Super Widget" }, { id: 2, name: "Gadget" }] }
 *
 * // Form data management
 * const emailLens = lensPath(["contact", "email"])
 * const formData = {
 *   name: "John",
 *   contact: { email: "john@example.com", phone: "123-456-7890" }
 * }
 * emailLens.set("newemail@example.com")(formData)
 * // Updates email while preserving all other data
 * ```
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
