import type { Value } from "../../../../types/index.ts"

/**
 * Checks if an object has a property at a given path
 * 
 * Traverses through nested objects following the specified path to check
 * if a property exists at that location. Returns true if the complete path
 * exists, false otherwise. Only checks for own properties, not inherited ones.
 * 
 * @curried (path) => (obj) => result
 * @param path - Array of keys representing the path to check
 * @param obj - The object to check
 * @returns True if the path exists, false otherwise
 * @example
 * ```typescript
 * // Basic path checking
 * hasPath(["a", "b", "c"])({ a: { b: { c: 1 } } })      // true
 * hasPath(["a", "b", "d"])({ a: { b: { c: 1 } } })      // false
 * hasPath(["user", "name"])({ user: { name: "Alice" } }) // true
 * 
 * // Checking for undefined values (property exists but value is undefined)
 * hasPath(["x"])({ x: undefined })                       // true
 * hasPath(["x"])({})                                     // false
 * hasPath(["a", "b"])({ a: { b: undefined } })          // true
 * 
 * // Checking for null values (property exists with null value)
 * hasPath(["x"])({ x: null })                           // true
 * hasPath(["a", "b"])({ a: { b: null } })               // true
 * hasPath(["a", "b", "c"])({ a: { b: null } })          // false (can't traverse through null)
 * 
 * // Single element path
 * hasPath(["name"])({ name: "Bob", age: 30 })           // true
 * hasPath(["missing"])({ name: "Bob", age: 30 })        // false
 * 
 * // Empty path always returns true (object itself exists)
 * hasPath([])({ a: 1 })                                 // true
 * hasPath([])({})                                       // true
 * hasPath([])(null)                                     // false
 * hasPath([])(undefined)                                // false
 * 
 * // Arrays (checking indices as keys)
 * hasPath(["0"])([1, 2, 3])                             // true
 * hasPath(["3"])([1, 2, 3])                             // false
 * hasPath(["items", "0", "name"])({ items: [{ name: "First" }] }) // true
 * 
 * // Path through non-objects stops early
 * hasPath(["a", "b", "c"])({ a: "not an object" })      // false
 * hasPath(["a", "b"])({ a: 42 })                        // false
 * hasPath(["length", "toString"])("string")             // false (primitive string)
 * 
 * // Symbol keys
 * const sym = Symbol("key")
 * hasPath([sym])({ [sym]: "value" })                    // true
 * hasPath(["a", sym])({ a: { [sym]: "value" } })        // true
 * 
 * // Nested structures
 * const data = {
 *   config: {
 *     database: {
 *       host: "localhost",
 *       credentials: {
 *         username: "admin"
 *       }
 *     }
 *   }
 * }
 * hasPath(["config", "database", "host"])(data)         // true
 * hasPath(["config", "database", "credentials", "username"])(data) // true
 * hasPath(["config", "database", "credentials", "password"])(data) // false
 * hasPath(["config", "cache"])(data)                    // false
 * 
 * // Partial application for validation
 * const hasUserId = hasPath(["user", "id"])
 * hasUserId({ user: { id: 1, name: "Alice" } })         // true
 * hasUserId({ user: { name: "Bob" } })                  // false
 * hasUserId({ id: 1 })                                  // false
 * 
 * const hasDeepSetting = hasPath(["settings", "notifications", "email", "enabled"])
 * hasDeepSetting({
 *   settings: {
 *     notifications: {
 *       email: { enabled: true }
 *     }
 *   }
 * }) // true
 * 
 * // Checking before accessing to avoid errors
 * const getIfExists = (path: Array<string>) => (obj: any) =>
 *   hasPath(path)(obj) ? obj[path[0]][path[1]] : undefined
 * 
 * const obj = { a: { b: "value" } }
 * getIfExists(["a", "b"])(obj)  // "value"
 * getIfExists(["a", "c"])(obj)  // undefined (no error thrown)
 * 
 * // Filtering objects with required paths
 * const users = [
 *   { id: 1, profile: { email: "a@ex.com" } },
 *   { id: 2, profile: {} },
 *   { id: 3, profile: { email: "c@ex.com" } }
 * ]
 * const hasEmail = hasPath(["profile", "email"])
 * users.filter(hasEmail) // [{ id: 1, ... }, { id: 3, ... }]
 * ```
 * @property Non-throwing - safely checks without errors
 * @property Own properties only - doesn't check prototype chain
 * @property Distinguishes undefined - returns true if property exists with undefined value
 */
const hasPath = (
	path: Array<string | number | symbol>,
) => <T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Empty path - check if obj itself exists and is an object
	if (path.length === 0) {
		return obj != null && typeof obj === "object"
	}
	
	// Start traversal
	let current: Value = obj
	
	for (const key of path) {
		// Check if current is an object that can have properties
		if (current == null || typeof current !== "object") {
			return false
		}
		
		// Check if the key exists as an own property
		if (!Object.prototype.hasOwnProperty.call(current, key as string | symbol)) {
			return false
		}
		
		// Move to the next level
		current = (current as Record<string | symbol, Value>)[key as string | symbol]
	}
	
	// Successfully traversed the entire path
	return true
}

export default hasPath