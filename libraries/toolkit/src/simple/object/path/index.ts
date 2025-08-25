import type { Value } from "../../../types/index.ts"

/**
 * Retrieves a nested value from an object using a path
 *
 * Safely accesses nested properties in an object using either a dot-separated
 * string or an array of keys. Returns undefined if any part of the path
 * doesn't exist. Supports array indices in the path.
 *
 * @curried (pathInput) => (obj) => result
 * @param pathInput - Dot-separated string or array of keys
 * @param obj - The object to traverse
 * @returns The value at the path or undefined if not found
 * @example
 * ```typescript
 * // Dot notation string path
 * path("a.b.c")({ a: { b: { c: "value" } } })    // "value"
 * path("user.name")({ user: { name: "John" } })  // "John"
 * path("x.y")({ a: { b: "value" } })             // undefined
 *
 * // Array path notation
 * path(["a", "b", "c"])({ a: { b: { c: "value" } } }) // "value"
 * path(["user", "name"])({ user: { name: "John" } })  // "John"
 *
 * // Accessing array elements
 * path("users.0.name")({ users: [{ name: "Alice" }] })    // "Alice"
 * path(["items", "1", "id"])({ items: [{ id: 1 }, { id: 2 }] }) // 2
 * path("data.0")({ data: ["first", "second"] })           // "first"
 *
 * // Non-existent paths return undefined
 * path("a.b.c.d")({ a: { b: { c: "end" } } })    // undefined
 * path("missing")({ other: "value" })            // undefined
 * path("a.b")({ a: null })                       // undefined
 *
 * // Edge cases
 * path("")({ a: 1 })                             // { a: 1 } (empty path returns object)
 * path("a")(null)                                // undefined
 * path("a")(undefined)                           // undefined
 * path("a")(42)                                  // undefined (not an object)
 *
 * // Partial application
 * const getName = path("user.profile.name")
 * getName({ user: { profile: { name: "Alice" } } }) // "Alice"
 * getName({ user: { profile: {} } })                // undefined
 *
 * const getFirstItem = path(["items", "0"])
 * getFirstItem({ items: ["apple", "banana"] })     // "apple"
 * getFirstItem({ items: [] })                      // undefined
 * ```
 * @property Safe navigation - never throws on missing properties
 */
const path =
	(pathInput: string | Array<string | number>) => (obj: Value): Value => {
		// Handle null/undefined object
		if (obj == null) return undefined

		// Convert string path to array
		const keys = typeof pathInput === "string"
			? (pathInput === "" ? [] : pathInput.split("."))
			: pathInput

		// Empty path returns the object itself
		if (keys.length === 0) return obj

		// Traverse the path
		return keys.reduce((acc, key) => {
			// Safety check for null/undefined
			if (acc == null) return undefined

			// Handle arrays and objects
			if (typeof acc === "object") {
				// Don't access prototype properties
				if (Array.isArray(acc)) {
					// For arrays, only allow numeric indices
					const index = typeof key === "number"
						? key
						: parseInt(key as string, 10)
					return !isNaN(index) ? acc[index] : undefined
				} else if (acc instanceof Map) {
					// Handle Map objects
					return acc.get(key)
				} else if (acc instanceof Set) {
					// Sets don't have indexed access
					return undefined
				} else {
					// For plain objects, use hasOwnProperty to avoid prototype pollution
					const strKey = String(key)
					if (!Object.prototype.hasOwnProperty.call(acc, strKey)) {
						return undefined
					}
					// Type assertion is safe here because we verified the property exists
					// and acc is an object type (checked above)
					const objAcc = acc as Record<string, Value>
					return objAcc[strKey]
				}
			}

			return undefined
		}, obj)
	}

export default path
