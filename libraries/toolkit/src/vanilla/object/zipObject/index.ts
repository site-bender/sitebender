import type { Value } from "../../../types/index.ts"

/**
 * Creates an object from arrays of keys and values
 *
 * Combines two arrays into an object where the first array provides the keys
 * and the second array provides the corresponding values. If arrays have
 * different lengths, the shorter length is used.
 *
 * @param keys - Array of property keys
 * @param values - Array of corresponding values
 * @returns An object with keys mapped to values
 * @example
 * // Basic object creation
 * zipObject(["a", "b", "c"])([1, 2, 3])
 * // { a: 1, b: 2, c: 3 }
 *
 * // Different lengths - uses shorter
 * zipObject(["a", "b", "c"])([1, 2])  // { a: 1, b: 2 }
 * zipObject(["a", "b"])([1, 2, 3, 4])  // { a: 1, b: 2 }
 *
 * // Empty arrays
 * zipObject([])([])  // {}
 * zipObject(["a", "b"])([])  // {}
 *
 * // CSV header mapping
 * const headers = ["id", "name", "email"]
 * const row = [1, "Alice", "alice@ex.com"]
 * zipObject(headers)(row)
 * // { id: 1, name: "Alice", email: "alice@ex.com" }
 *
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const zipObject = <K extends string | symbol, V extends Value>(
	keys: Array<K>,
) =>
(
	values: Array<V>,
): Record<K, V> => {
	const length = Math.min(keys.length, values.length)

	return keys.slice(0, length).reduce((acc, key, index) => ({
		...acc,
		[key]: values[index],
	}), {} as Record<K, V>)
}

export default zipObject
