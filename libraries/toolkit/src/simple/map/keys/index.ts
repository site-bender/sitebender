/**
 * Returns an array of keys from a Map
 *
 * Extracts all keys from a Map and returns them as an array. The keys
 * are returned in the same order as they appear in the Map's internal
 * iteration order (insertion order for Maps). This function is useful
 * for extracting keys for further processing or for converting Maps
 * to other data structures.
 *
 * @curried (map) => result
 * @param map - The Map to extract keys from
 * @returns An array containing all keys from the Map
 * @example
 * ```typescript
 * // Basic usage with string keys
 * const userRoles = new Map([
 *   ["alice", "admin"],
 *   ["bob", "user"],
 *   ["charlie", "moderator"]
 * ])
 * keys(userRoles)
 * // ["alice", "bob", "charlie"]
 *
 * // Numeric keys
 * const scores = new Map([[1, 95], [2, 87], [3, 92]])
 * keys(scores)
 * // [1, 2, 3]
 *
 * // Mixed key types
 * const mixed = new Map<string | number, string>([
 *   ["a", "alpha"],
 *   [1, "one"],
 *   ["b", "beta"]
 * ])
 * keys(mixed)
 * // ["a", 1, "b"]
 *
 * // Empty Map
 * keys(new Map())
 * // []
 *
 * // Object keys
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const objMap = new Map([[obj1, "first"], [obj2, "second"]])
 * keys(objMap)
 * // [{ id: 1 }, { id: 2 }]
 * ```
 * @pure
 * @immutable
 * @safe
 */
const keys = <K, V>(map: Map<K, V>): Array<K> => {
	return Array.from(map.keys())
}

export default keys