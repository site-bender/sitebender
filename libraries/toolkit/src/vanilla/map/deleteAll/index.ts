/**
 * Removes multiple keys from a Map immutably
 *
 * Creates a new Map with all specified keys removed. The original Map
 * remains unchanged. This function is curried to allow partial application
 * and composition in functional pipelines. Keys that don't exist in the
 * Map are ignored.
 *
 * @param keys - Array of keys to remove from the Map
 * @param map - The Map to remove keys from
 * @returns A new Map without the specified keys
 * @example
 * ```typescript
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * const removeBC = deleteAll(["b", "c"])
 * removeBC(map)
 * // Map { "a" => 1, "d" => 4 }
 *
 * // Some keys don't exist
 * deleteAll(["b", "c", "d"])(new Map([["a", 1], ["b", 2]]))
 * // Map { "a" => 1 } (only "b" was removed)
 *
 * // Using with pipe
 * import pipe from "../../combinator/pipe/index.ts"
 *
 * pipe(
 *   new Map([
 *     ["id", 123],
 *     ["name", "Alice"],
 *     ["password", "secret"],
 *     ["token", "xyz"]
 *   ]),
 *   deleteAll(["password", "token"])
 * )
 * // Map { "id" => 123, "name" => "Alice" }
 *
 * // Partial application for reuse
 * const removeSensitive = deleteAll(["password", "ssn", "creditCard"])
 * removeSensitive(new Map([["name", "Alice"], ["password", "secret"]]))
 * // Map { "name" => "Alice" }
 *
 * // Cache cleanup
 * const cache = new Map([
 *   ["session:abc", { user: "Alice" }],
 *   ["session:def", { user: "Bob" }],
 *   ["config", { theme: "dark" }]
 * ])
 * deleteAll(["session:abc", "session:def"])(cache)
 * // Map { "config" => {...} }
 *
 * // Cleanup helper
 * const cleanupMap = <K, V>(map: Map<K, V>, predicate: (key: K) => boolean) =>
 *   deleteAll([...map.keys()].filter(predicate))(map)
 *
 * cleanupMap(new Map([
 *   ["_temp", 1],
 *   ["real", 3],
 *   ["_debug", 4]
 * ]), k => k.startsWith("_"))
 * // Map { "real" => 3 }
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const deleteAll = <K, V>(keys: Array<K>) => (map: Map<K, V>): Map<K, V> => {
	return keys.reduce((acc, key) => {
		const newMap = new Map(acc)
		newMap.delete(key)
		return newMap
	}, map)
}

export default deleteAll
