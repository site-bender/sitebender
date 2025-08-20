import type { Value } from "../../types/index.ts"
import path from "../path/index.ts"

/**
 * Retrieves a nested value from an object using a path with a default fallback
 * 
 * Safely accesses nested properties in an object using either a dot-separated
 * string or an array of keys. Returns a default value if any part of the path
 * doesn't exist. Supports array indices in the path.
 * 
 * @curried (pathInput) => (defaultValue) => (obj) => result
 * @param pathInput - Dot-separated string or array of keys
 * @param defaultValue - The value to return if path doesn't exist
 * @param obj - The object to traverse
 * @returns The value at the path or the default if not found
 * @example
 * ```typescript
 * // Basic usage with default
 * pathOr("user.name")("Anonymous")({ user: { name: "John" } })  // "John"
 * pathOr("user.email")("N/A")({ user: { name: "John" } })       // "N/A"
 * pathOr("a.b.c")("default")({ a: { b: { c: "value" } } })      // "value"
 * 
 * // Array path notation
 * pathOr(["user", "profile", "bio"])("No bio")({ user: {} })    // "No bio"
 * pathOr(["a", "b"])("missing")({ a: { b: "found" } })          // "found"
 * 
 * // Accessing array elements
 * pathOr("items.0.name")("No item")({ items: [] })              // "No item"
 * pathOr("users.1.id")(0)({ users: [{ id: 1 }] })               // 0
 * 
 * // Returns actual value even if falsy
 * pathOr("count")(10)({ count: 0 })                             // 0
 * pathOr("active")(true)({ active: false })                     // false
 * pathOr("message")("default")({ message: "" })                 // ""
 * 
 * // Edge cases
 * pathOr("a.b")(42)(null)                                       // 42
 * pathOr("a.b")(42)(undefined)                                  // 42
 * pathOr("")("default")({ a: 1 })                               // "default"
 * 
 * // Partial application
 * const getNameOrDefault = pathOr("user.name")("Guest")
 * getNameOrDefault({ user: { name: "Alice" } })                 // "Alice"
 * getNameOrDefault({ user: {} })                                // "Guest"
 * getNameOrDefault({})                                          // "Guest"
 * 
 * const getConfigValue = pathOr(["config", "timeout"])(5000)
 * getConfigValue({ config: { timeout: 3000 } })                 // 3000
 * getConfigValue({ config: {} })                                // 5000
 * ```
 * @property Safe navigation - never throws on missing properties
 * @property Returns default only when value is undefined (not for other falsy values)
 */
const pathOr =
	<T extends Value>(pathInput: string | Array<string | number>) =>
	(defaultValue: T) =>
	(obj: Value): T | Value => {
		const result = path(pathInput)(obj)
		return result === undefined ? defaultValue : result
	}

export default pathOr
