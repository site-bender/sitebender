import type { Value } from "../../../types/index.ts"

import dissoc from "../dissoc/index.ts"

/**
 * Returns a shallow clone of an object with a nested property removed
 *
 * Creates a new object with all the properties of the original, but with
 * the property at the specified path removed. Creates new objects along
 * the path to maintain immutability. If the path doesn't exist, returns
 * a clone of the original object structure.
 *
 * @curried (path) => (obj) => result
 * @param path - Array of keys representing the path to the property
 * @param obj - The object to clone and update
 * @returns A new object with the nested property removed
 * @example
 * ```typescript
 * // Basic nested property removal
 * dissocPath(["a", "b", "c"])({ a: { b: { c: 1, d: 2 } } })
 * // { a: { b: { d: 2 } } }
 *
 * dissocPath(["user", "password"])({ user: { name: "Alice", password: "secret" } })
 * // { user: { name: "Alice" } }
 *
 * // Removing entire branches
 * dissocPath(["a", "b"])({ a: { b: { c: 1 }, d: 2 } })
 * // { a: { d: 2 } }
 *
 * // Path doesn't exist - returns unchanged structure
 * dissocPath(["x", "y", "z"])({ a: { b: 1 } })
 * // { a: { b: 1 } }
 *
 * dissocPath(["missing"])({ present: 1 })
 * // { present: 1 }
 *
 * // Single-element path (equivalent to dissoc)
 * dissocPath(["name"])({ name: "Bob", age: 25 })
 * // { age: 25 }
 *
 * // Empty path returns object as-is
 * dissocPath([])({ a: 1, b: 2 })
 * // { a: 1, b: 2 }
 *
 * // Removes last property in nested object
 * dissocPath(["a", "b"])({ a: { b: 1 } })
 * // { a: {} }
 *
 * // Partial path exists
 * dissocPath(["a", "b", "c"])({ a: { b: 1 } })
 * // { a: { b: 1 } } (b is not an object, so path can't continue)
 *
 * // Working with arrays (treats indices as object keys)
 * dissocPath(["items", "1"])({ items: { "0": "first", "1": "second", "2": "third" } })
 * // { items: { "0": "first", "2": "third" } }
 *
 * // Complex nested structure
 * const config = {
 *   database: {
 *     connection: {
 *       host: "localhost",
 *       port: 5432,
 *       timeout: 5000
 *     },
 *     pool: { max: 10 }
 *   },
 *   cache: { ttl: 3600 }
 * }
 * dissocPath(["database", "connection", "timeout"])(config)
 * // {
 * //   database: {
 * //     connection: { host: "localhost", port: 5432 },
 * //     pool: { max: 10 }
 * //   },
 * //   cache: { ttl: 3600 }
 * // }
 *
 * // Partial application for common paths
 * const removeUserPassword = dissocPath(["user", "credentials", "password"])
 * removeUserPassword({
 *   user: {
 *     id: 1,
 *     credentials: { username: "alice", password: "secret" }
 *   }
 * })
 * // { user: { id: 1, credentials: { username: "alice" } } }
 *
 * const removeDebugInfo = dissocPath(["meta", "debug"])
 * removeDebugInfo({ data: "value", meta: { debug: true, version: "1.0" } })
 * // { data: "value", meta: { version: "1.0" } }
 *
 * // Chaining removals
 * const obj = { a: { b: { c: 1, d: 2 }, e: 3 } }
 * const step1 = dissocPath(["a", "b", "c"])(obj)  // { a: { b: { d: 2 }, e: 3 } }
 * const step2 = dissocPath(["a", "e"])(step1)      // { a: { b: { d: 2 } } }
 * ```
 * @property Immutable - creates new objects at each level of nesting
 * @property Path safety - handles non-existent paths gracefully
 * @property Complementary to assocPath - removes instead of setting
 */
const dissocPath = (
	path: Array<string | number>,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Value => {
	// Empty path returns object as-is
	if (path.length === 0) {
		return obj
	}

	// Handle null/undefined input
	if (!obj || typeof obj !== "object") {
		return obj
	}

	// Single element path - use dissoc directly
	if (path.length === 1) {
		return dissoc(path[0] as string | symbol)(obj)
	}

	// Multi-element path - recursive removal
	const [head, ...tail] = path
	const currentValue = obj[head as keyof typeof obj]

	// If the head doesn't exist, return object unchanged
	if (!(head in obj)) {
		return obj
	}

	// If current value is not an object, can't continue path
	if (!currentValue || typeof currentValue !== "object") {
		return obj
	}

	// Recursively remove from nested structure
	const updatedNested = dissocPath(tail)(
		currentValue as Record<string | symbol, Value>,
	)

	// If the nested removal resulted in an empty object and this was the last property,
	// we still include it (as an empty object) to maintain structure
	return {
		...obj,
		[head]: updatedNested,
	}
}

export default dissocPath
