import type { Value } from "../../../types/index.ts"

import omit from "../omit/index.ts"

/**
 * Returns an object without the specified keys
 *
 * Creates a new object that contains all properties from the original except
 * those specified in the keys array. This is an alias for omit with the same
 * behavior - the original object is not modified. Non-existent keys are ignored.
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 * @param keys - Array of keys to exclude from the result
 * @param obj - The object to filter
 * @returns A new object without the specified keys
 * @example
 * // Basic exclusion
 * without(["b", "d"])({ a: 1, b: 2, c: 3, d: 4, e: 5 })
 * // { a: 1, c: 3, e: 5 }
 *
 * // Remove sensitive fields
 * const removeSensitive = without(["password", "ssn"])
 * removeSensitive({ id: 1, username: "john", password: "secret", ssn: "123" })
 * // { id: 1, username: "john" }
 *
 * // Non-existent keys are ignored
 * without(["x", "y"])({ a: 1, b: 2 })                     // { a: 1, b: 2 }
 *
 * // Empty keys array returns original
 * without([])({ a: 1, b: 2 })                             // { a: 1, b: 2 }
 *
 * // API response cleaning
 * const cleanResponse = without(["_id", "__v", "_internal"])
 * cleanResponse({ _id: "507f", name: "Product", __v: 0 })
 * // { name: "Product" }
 *
 * // Alias for omit (identical behavior)
 * const obj = { a: 1, b: 2, c: 3 }
 * without(["b"])(obj)                                     // { a: 1, c: 3 }
 * omit(["b"])(obj)                                        // { a: 1, c: 3 }
 */
const without =
	<T extends Record<string | symbol, Value>, K extends Array<keyof T>>(
		keys: K,
	) =>
	(
		obj: T,
	): Omit<T, K[number]> => {
		// Use omit internally since without is an alias
		return omit(keys)(obj)
	}

export default without
