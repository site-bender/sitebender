import type { Value } from "../../../types/index.ts"

import zipObj from "../zipObj/index.ts"

/**
 * Creates an object from arrays of keys and values
 *
 * Combines two arrays into an object where the first array provides the keys
 * and the second array provides the corresponding values. This is an alias
 * for zipObj with identical behavior. If arrays have different lengths, the
 * shorter length is used.
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 * @param keys - Array of property keys
 * @param values - Array of corresponding values
 * @returns An object with keys mapped to values
 * @example
 * // Basic object creation
 * zipObject(["a", "b", "c"])([1, 2, 3])
 * // { a: 1, b: 2, c: 3 }
 *
 * // Different lengths - uses shorter
 * zipObject(["a", "b", "c"])([1, 2])                     // { a: 1, b: 2 }
 * zipObject(["a", "b"])([1, 2, 3, 4])                    // { a: 1, b: 2 }
 *
 * // Empty arrays
 * zipObject([])([])                                      // {}
 * zipObject(["a", "b"])([])                              // {}
 *
 * // Duplicate keys - last value wins
 * zipObject(["a", "b", "a"])([1, 2, 3])                  // { a: 3, b: 2 }
 *
 * // CSV header mapping
 * const headers = ["id", "name", "email"]
 * const row = [1, "Alice", "alice@ex.com"]
 * zipObject(headers)(row)
 * // { id: 1, name: "Alice", email: "alice@ex.com" }
 *
 * // Partial application for reusable builders
 * const buildUser = zipObject(["id", "name", "role"])
 * buildUser([1, "Alice", "admin"])                       // { id: 1, name: "Alice", role: "admin" }
 * buildUser([2, "Bob", "user"])                          // { id: 2, name: "Bob", role: "user" }
 *
 * // Alias for zipObj (identical behavior)
 * zipObject(["a", "b"])([1, 2])                          // { a: 1, b: 2 }
 * zipObj(["a", "b"])([1, 2])                             // { a: 1, b: 2 }
 */
const zipObject = <K extends string | symbol, V extends Value>(
	keys: Array<K>,
) =>
(
	values: Array<V>,
): Record<K, V> => {
	// Use zipObj internally since zipObject is an alias
	return zipObj(keys)(values)
}

export default zipObject
