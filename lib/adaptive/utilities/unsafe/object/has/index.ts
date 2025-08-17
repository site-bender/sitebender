import type { Value } from "../../../../types/index.ts"

/**
 * Checks if an object has a property at the specified path
 * 
 * Safely checks if a property exists in an object using either a dot-separated
 * string or an array of keys. Returns true only if the complete path exists,
 * even if the value is undefined. Does not check prototype properties.
 * 
 * @curried (pathInput) => (obj) => result
 * @param pathInput - Dot-separated string or array of keys
 * @param obj - The object to check
 * @returns True if the path exists, false otherwise
 * @example
 * ```typescript
 * // Checking for existing properties
 * has("name")({ name: "John", age: 30 })           // true
 * has("age")({ name: "John", age: 30 })            // true
 * has("email")({ name: "John", age: 30 })          // false
 * 
 * // Works with undefined values
 * has("value")({ value: undefined })               // true
 * has("missing")({ value: undefined })             // false
 * 
 * // Nested property checking with dot notation
 * has("user.name")({ user: { name: "Alice" } })    // true
 * has("user.email")({ user: { name: "Alice" } })   // false
 * has("user.address.city")({ user: {} })           // false
 * 
 * // Array path notation
 * has(["user", "name"])({ user: { name: "Bob" } }) // true
 * has(["a", "b", "c"])({ a: { b: { c: null } } })  // true
 * has(["a", "b", "d"])({ a: { b: { c: null } } })  // false
 * 
 * // Array indices
 * has("items.0")({ items: ["first", "second"] })   // true
 * has("items.2")({ items: ["first", "second"] })   // false
 * has(["arr", 1])([null, { arr: [1, 2, 3] }])     // false (arr is not on root)
 * 
 * // Edge cases
 * has("")({ a: 1 })                                // true (empty path = object exists)
 * has("prop")(null)                                // false
 * has("prop")(undefined)                           // false
 * has("toString")({ custom: "prop" })              // false (prototype properties ignored)
 * 
 * // Partial application
 * const hasUser = has("user")
 * hasUser({ user: { id: 1 } })                     // true
 * hasUser({ admin: { id: 1 } })                    // false
 * 
 * const hasUserId = has("user.id")
 * hasUserId({ user: { id: 1, name: "John" } })     // true
 * hasUserId({ user: { name: "John" } })            // false
 * ```
 * @property Safe - never throws, handles null/undefined gracefully
 * @property Own properties only - doesn't check prototype chain
 */
const has = (pathInput: string | Array<string | number>) => (obj: Value): boolean => {
	// Handle null/undefined object
	if (obj == null) return false
	
	// Convert string path to array
	const keys = typeof pathInput === "string" 
		? (pathInput === "" ? [] : pathInput.split("."))
		: pathInput
	
	// Empty path means check if object exists
	if (keys.length === 0) return true
	
	// Traverse the path using recursion
	const checkPath = (current: Value, remainingKeys: Array<string | number>): boolean => {
		if (remainingKeys.length === 0) return true
		
		// Check if we can continue traversing
		if (current == null || typeof current !== "object") {
			return false
		}
		
		const [key, ...rest] = remainingKeys
		
		// Check for property existence
		if (Array.isArray(current)) {
			// For arrays, check numeric indices
			const index = typeof key === "number" ? key : parseInt(key as string, 10)
			if (isNaN(index) || index < 0 || index >= current.length) {
				return false
			}
			return checkPath(current[index], rest)
		} else if (current instanceof Map || current instanceof Set) {
			// Maps and Sets don't support dot notation traversal
			return false
		} else {
			// For plain objects, check own properties only
			const strKey = String(key)
			if (!Object.prototype.hasOwnProperty.call(current, strKey)) {
				return false
			}
			return checkPath((current as Record<string, Value>)[strKey], rest)
		}
	}
	
	return checkPath(obj, keys)
}

export default has