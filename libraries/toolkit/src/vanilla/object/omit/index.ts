import type { Value } from "../../../types/index.ts"

/**
 * Creates a new object with specified keys omitted
 *
 * Returns a shallow copy of the object with the specified keys removed.
 * The original object is not modified. Prototype properties are not
 * included in the result.
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 * @param keys - Array of keys to omit from the object
 * @param obj - The object to omit keys from
 * @returns A new object without the specified keys
 * @example
 * ```typescript
 * // Basic usage
 * omit(["c"])({ a: 1, b: 2, c: 3 })      // { a: 1, b: 2 }
 * omit(["x", "y"])({ x: 1, y: 2, z: 3 }) // { z: 3 }
 * omit(["a"])({ a: 1 })                  // {}
 *
 * // Omitting non-existent keys
 * omit(["d"])({ a: 1, b: 2, c: 3 })      // { a: 1, b: 2, c: 3 }
 * omit(["x", "y", "z"])({ a: 1 })        // { a: 1 }
 *
 * // Empty keys array
 * omit([])({ a: 1, b: 2 })               // { a: 1, b: 2 }
 *
 * // Nested objects (shallow operation)
 * omit(["user"])({ user: { name: "John" }, id: 1 }) // { id: 1 }
 * omit(["a"])({ a: { b: 2 }, c: 3 })     // { c: 3 }
 *
 * // Partial application
 * const omitPrivate = omit(["_id", "_rev"])
 * omitPrivate({ _id: 1, _rev: 2, name: "John" }) // { name: "John" }
 * omitPrivate({ _id: 3, data: "test" })          // { data: "test" }
 *
 * const omitPassword = omit(["password"])
 * omitPassword({ username: "john", password: "secret" }) // { username: "john" }
 * ```
 */
const omit = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(obj: T): Omit<T, K> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {} as Omit<T, K>
	}

	return Object.entries(obj).reduce(
		(acc, [key, value]) =>
			!keys.includes(key as K) &&
				Object.prototype.hasOwnProperty.call(obj, key)
				? { ...acc, [key]: value }
				: acc,
		{} as Omit<T, K>,
	)
}

export default omit
