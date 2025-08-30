import type { Value } from "../../../types/index.ts"

/**
 * Retrieves a nested value from an object using a path
 *
 * Safely accesses nested properties in an object using either a dot-separated
 * string or an array of keys. Returns undefined if any part of the path
 * doesn't exist. Supports array indices in the path.
 *
 * @param pathInput - Dot-separated string or array of keys
 * @param obj - The object to traverse
 * @returns The value at the path or undefined if not found
 * @example
 * ```typescript
 * // Basic usage
 * path("a.b.c")({ a: { b: { c: "value" } } })    // "value"
 * path(["a", "b", "c"])({ a: { b: { c: 42 } } })  // 42
 *
 * // Array indices
 * path("users.0.name")({ users: [{ name: "Alice" }] })    // "Alice"
 * path(["items", 1])({ items: ["a", "b", "c"] })         // "b"
 *
 * // Safe navigation
 * path("a.b.c")({ a: null })       // undefined
 * path("missing.key")(null)        // undefined
 *
 * // Partial application
 * const getName = path("user.name")
 * getName({ user: { name: "John" } })  // "John"
 * ```
 * @pure
 * @safe
 * @immutable
 * @curried
 */
const path =
	(pathInput: string | Array<string | number>) => (obj: Value): Value => {
		// Handle null/undefined object
		if (obj === null || obj === undefined) return undefined

		// Convert string path to array
		const keys = typeof pathInput === "string"
			? (pathInput === "" ? [] : pathInput.split("."))
			: pathInput

		// Empty path returns the object itself
		if (keys.length === 0) return obj

		// Traverse the path using reduce (pure FP)
		return keys.reduce((acc: Value, key) => {
			if (acc === null || acc === undefined) return undefined

			if (Array.isArray(acc)) {
				const index = typeof key === "number"
					? key
					: parseInt(String(key), 10)
				return !isNaN(index) ? acc[index] : undefined
			}

			if (acc instanceof Map) return acc.get(key as unknown as never)
			if (acc instanceof Set) return undefined

			if (typeof acc === "object") {
				const strKey = String(key)
				return Object.prototype.hasOwnProperty.call(acc, strKey)
					? (acc as Record<string, Value>)[strKey]
					: undefined
			}

			return undefined
		}, obj as Value)
	}

export default path
