import type { Value } from "../../types/index.ts"

import isUndefined from "../../validation/isUndefined/index.ts"
import path from "../path/index.ts"

/**
 * Retrieves a nested value from an object using a path with a default fallback
 *
 * Safely accesses nested properties in an object using either a dot-separated
 * string or an array of keys. Returns a default value if any part of the path
 * doesn't exist. Supports array indices in the path.
 *
 * @param pathInput - Dot-separated string or array of keys
 * @param defaultValue - The value to return if path doesn't exist
 * @param obj - The object to traverse
 * @returns The value at the path or the default if not found
 * @example
 * ```typescript
 * // Basic usage
 * pathOr("user.name")("Anonymous")({ user: { name: "John" } })  // "John"
 * pathOr("user.email")("N/A")({ user: { name: "John" } })       // "N/A"
 *
 * // Array paths and indices
 * pathOr(["items", 0, "name"])("No item")({ items: [] })       // "No item"
 * pathOr("users.0.id")(0)({ users: [{ id: 42 }] })              // 42
 *
 * // Preserves falsy values
 * pathOr("count")(10)({ count: 0 })           // 0 (not default)
 * pathOr("active")(true)({ active: false })   // false (not default)
 *
 * // Partial application
 * const getName = pathOr("user.name")("Guest")
 * getName({ user: { name: "Alice" } })  // "Alice"
 * getName({})                           // "Guest"
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
const pathOr =
	<T extends Value>(pathInput: string | Array<string | number>) =>
	(defaultValue: T) =>
	(obj: Value): T | Value => {
		const result = path(pathInput)(obj)
		return isUndefined(result) ? defaultValue : result
	}

export default pathOr
