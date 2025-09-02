import not from "../../logic/not/index.ts"
import isNotNullish from "../../validation/isNotNullish/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Creates an object indexing array elements by the given key
 *
 * Transforms an array into an object where each element is indexed by a
 * key derived from that element. If multiple elements produce the same key,
 * the last one wins. This is useful for creating lookup tables, converting
 * arrays to dictionaries, or indexing collections for fast access.
 *
 * @pure
 * @immutable
 * @curried
 * @param keyFn - Function to derive the key from each element
 * @param array - Array to index
 * @returns Object with elements indexed by their keys
 * @example
 * ```typescript
 * // Basic usage - index by id
 * const users = [
 *   { id: 1, name: "Alice" },
 *   { id: 2, name: "Bob" },
 *   { id: 3, name: "Charlie" }
 * ]
 * indexBy(u => u.id)(users)
 * // { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" }, 3: { id: 3, name: "Charlie" } }
 *
 * // Last value wins for duplicates
 * indexBy((s: string) => s.length)(["a", "bb", "ccc", "dd", "e"])
 * // { 1: "e", 2: "dd", 3: "ccc" }
 *
 * // Partial application
 * const indexById = indexBy((x: { id: string }) => x.id)
 * indexById([{ id: "a", val: 1 }, { id: "b", val: 2 }])
 * // { "a": { id: "a", val: 1 }, "b": { id: "b", val: 2 } }
 * ```
 */
const indexBy = <T, K extends string | number | symbol>(
	keyFn: (element: T, index: number, array: ReadonlyArray<T>) => K,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Record<K, T> => {
	if (isNullish(array)) {
		return {} as Record<K, T>
	}

	return array.reduce((result, element, index) => {
		const key = keyFn(element, index, array)
		if (isNotNullish(key)) {
			result[key] = element
		}
		return result
	}, {} as Record<K, T>)
}

export default indexBy
