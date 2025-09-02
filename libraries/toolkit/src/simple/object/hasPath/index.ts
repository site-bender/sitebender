import type { Value } from "../../../types/index.ts"

import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Checks if an object has a property at a given path
 *
 * Traverses through nested objects following the specified path to check
 * if a property exists at that location. Returns true if the complete path
 * exists, false otherwise. Only checks for own properties, not inherited ones.
 *
 * @pure
 * @safe
 * @curried
 * @predicate
 * @param path - Array of keys representing the path to check
 * @param obj - The object to check
 * @returns True if the path exists, false otherwise
 * @example
 * ```typescript
 * // Basic path checking
 * hasPath(["a", "b", "c"])({ a: { b: { c: 1 } } })      // true
 * hasPath(["a", "b", "d"])({ a: { b: { c: 1 } } })      // false
 *
 * // Checking for undefined values (property exists)
 * hasPath(["x"])({ x: undefined })                       // true
 * hasPath(["x"])({})                                     // false
 *
 * // Empty path checks if object exists
 * hasPath([])({ a: 1 })                                 // true
 * hasPath([])(null)                                     // false
 *
 * // Arrays (checking indices as keys)
 * hasPath(["0"])([1, 2, 3])                             // true
 * hasPath(["3"])([1, 2, 3])                             // false
 *
 * // Partial application for validation
 * const hasUserId = hasPath(["user", "id"])
 * hasUserId({ user: { id: 1, name: "Alice" } })         // true
 * hasUserId({ user: { name: "Bob" } })                  // false
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
 */
const hasPath = (
	path: Array<string | number | symbol>,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Empty path - check if obj itself exists and is an object
	if (path.length === 0) {
		return isNotNullish(obj) && typeof obj === "object"
	}

	// Use recursive function to traverse path
	const checkPath = (
		current: Value,
		remaining: Array<string | number | symbol>,
	): boolean => {
		if (remaining.length === 0) return true

		// Check if current is an object that can have properties
		if (isNullish(current) || typeof current !== "object") {
			return false
		}

		const [key, ...rest] = remaining

		// Check if the key exists as an own property
		if (
			!Object.prototype.hasOwnProperty.call(current, key as string | symbol)
		) {
			return false
		}

		// Move to the next level
		return checkPath(
			(current as Record<string | symbol, Value>)[key as string | symbol],
			rest,
		)
	}

	return checkPath(obj, path)
}

export default hasPath
