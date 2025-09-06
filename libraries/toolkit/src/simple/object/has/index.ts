import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Checks if an object has a property at the specified path
 *
 * Safely checks if a property exists in an object using either a dot-separated
 * string or an array of keys. Returns true only if the complete path exists,
 * even if the value is undefined. Does not check prototype properties.
 *
 * @pure
 * @safe
 * @curried
 * @predicate
 * @param pathInput - Dot-separated string or array of keys
 * @param obj - The object to check
 * @returns True if the path exists, false otherwise
 * @example
 * ```typescript
 * // Checking for existing properties
 * has("name")({ name: "John", age: 30 })           // true
 * has("email")({ name: "John", age: 30 })          // false
 *
 * // Works with undefined values
 * has("value")({ value: undefined })               // true
 * has("missing")({ value: undefined })             // false
 *
 * // Nested property checking with dot notation
 * has("user.name")({ user: { name: "Alice" } })    // true
 * has("user.email")({ user: { name: "Alice" } })   // false
 *
 * // Array path notation
 * has(["user", "name"])({ user: { name: "Bob" } }) // true
 * has(["a", "b", "c"])({ a: { b: { c: null } } })  // true
 *
 * // Partial application
 * const hasUserId = has("user.id")
 * hasUserId({ user: { id: 1, name: "John" } })     // true
 * hasUserId({ user: { name: "John" } })            // false
 * ```
 */
const has =
	(pathInput: string | Array<string | number>) => (obj: Value): boolean => {
		// Handle null/undefined object
		if (isNullish(obj)) return false

		// Convert string path to array
		const keys = typeof pathInput === "string"
			? (pathInput === "" ? [] : pathInput.split("."))
			: pathInput

		// Empty path means check if object exists
		if (keys.length === 0) return true

		// Traverse the path using recursion
		const checkPath = (
			current: Value,
			remainingKeys: Array<string | number>,
		): boolean => {
			if (remainingKeys.length === 0) return true

			// Check if we can continue traversing
			if (isNullish(current) || typeof current !== "object") {
				return false
			}

			const [key, ...rest] = remainingKeys

			// Check for property existence
			if (Array.isArray(current)) {
				// For arrays, check numeric indices
				const index = typeof key === "number"
					? key
					: parseInt(key as string, 10)
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
				return checkPath(
					(current as Record<string, Value>)[strKey],
					rest,
				)
			}
		}

		return checkPath(obj, keys)
	}

export default has
