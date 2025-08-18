import type { Value } from "../../../../types/index.ts"

/**
 * Returns a shallow clone of an object with a nested property set to a value
 * 
 * Creates a new object with all the properties of the original, but with the
 * value at the specified path set to the given value. Creates any missing
 * intermediate objects along the path. The original object and any nested
 * objects along the path are not modified (immutable operation).
 * 
 * @curried (path) => (value) => (obj) => result
 * @param path - Array of keys representing the path to the property
 * @param value - The value to set at the path
 * @param obj - The object to clone and update
 * @returns A new object with the nested property set to the value
 * @example
 * ```typescript
 * // Basic nested property setting
 * assocPath(["a", "b", "c"])(42)({ a: { b: { c: 0 } } })
 * // { a: { b: { c: 42 } } }
 * 
 * assocPath(["user", "name"])("Alice")({ user: { age: 30 } })
 * // { user: { age: 30, name: "Alice" } }
 * 
 * // Creating missing intermediate objects
 * assocPath(["a", "b", "c"])(10)({})
 * // { a: { b: { c: 10 } } }
 * 
 * assocPath(["x", "y", "z"])("deep")({ x: {} })
 * // { x: { y: { z: "deep" } } }
 * 
 * // Single-element path (equivalent to assoc)
 * assocPath(["name"])("Bob")({ age: 25 })
 * // { age: 25, name: "Bob" }
 * 
 * // Empty path returns value as-is
 * assocPath([])(42)({ a: 1, b: 2 })
 * // 42
 * 
 * // Overwriting existing nested structures
 * assocPath(["a", "b"])(99)({ a: { b: { c: 1 }, d: 2 } })
 * // { a: { b: 99, d: 2 } }
 * 
 * // Arrays in path (treating array indices as object keys)
 * assocPath(["items", "0", "name"])("First")({ items: [{ id: 1 }] })
 * // { items: { "0": { id: 1, name: "First" } } }
 * // Note: converts array to object with numeric string keys
 * 
 * // Setting to undefined/null
 * assocPath(["a", "b"])(undefined)({ a: { b: 1, c: 2 } })
 * // { a: { b: undefined, c: 2 } }
 * 
 * assocPath(["x", "y"])(null)({ x: { y: 10, z: 20 } })
 * // { x: { y: null, z: 20 } }
 * 
 * // Partial application for common paths
 * const setUserEmail = assocPath(["user", "contact", "email"])
 * setUserEmail("alice@example.com")({ user: { id: 1 } })
 * // { user: { id: 1, contact: { email: "alice@example.com" } } }
 * 
 * const setDeepConfig = assocPath(["config", "database", "connection", "timeout"])
 * setDeepConfig(5000)({ config: { database: { host: "localhost" } } })
 * // { config: { database: { host: "localhost", connection: { timeout: 5000 } } } }
 * 
 * // Building nested structures incrementally
 * const obj = {}
 * const step1 = assocPath(["a", "b"])(1)(obj)        // { a: { b: 1 } }
 * const step2 = assocPath(["a", "c"])(2)(step1)      // { a: { b: 1, c: 2 } }
 * const step3 = assocPath(["a", "d", "e"])(3)(step2) // { a: { b: 1, c: 2, d: { e: 3 } } }
 * ```
 * @property Immutable - creates new objects at each level of nesting
 * @property Auto-creation - creates missing intermediate objects
 * @property Path safety - handles empty paths and single-element paths
 */
const assocPath = <V extends Value>(
	path: Array<string | number>,
) => (
	value: V,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): Value => {
	// Empty path returns the value itself
	if (path.length === 0) {
		return value
	}
	
	// Handle null/undefined input
	const source = (!obj || typeof obj !== "object") ? {} : obj
	
	// Single element path - simple property set
	if (path.length === 1) {
		return {
			...source,
			[path[0]]: value,
		}
	}
	
	// Multi-element path - recursive structure building
	const [head, ...tail] = path
	const currentValue = source[head as keyof typeof source]
	
	// Recursively build the nested structure
	const nestedValue = assocPath(tail)(value)(
		currentValue && typeof currentValue === "object" 
			? currentValue as Record<string | symbol, Value>
			: {}
	)
	
	return {
		...source,
		[head]: nestedValue,
	}
}

export default assocPath