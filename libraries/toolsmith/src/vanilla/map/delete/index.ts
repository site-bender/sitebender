/**
 * Removes a key-value pair from a Map immutably
 *
 * Creates a new Map with the specified key removed. The original Map
 * remains unchanged. This function is curried to allow partial application
 * and composition in functional pipelines. If the key doesn't exist,
 * returns a copy of the original Map.
 *
 * @param key - The key to remove from the Map
 * @param map - The Map to remove the key from
 * @returns A new Map without the specified key
 * @example
 * ```typescript
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const deleteB = deleteKey("b")
 * deleteB(map)
 * // Map { "a" => 1, "c" => 3 }
 *
 * // Key doesn't exist
 * deleteKey("z")(new Map([["a", 1], ["b", 2]]))
 * // Map { "a" => 1, "b" => 2 } (copy of original)
 *
 * // Using with pipe
 * import pipe from "../../combinator/pipe/index.ts"
 *
 * pipe(
 *   new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]]),
 *   deleteKey("b"),
 *   deleteKey("d")
 * )
 * // Map { "a" => 1, "c" => 3 }
 *
 * // Partial application
 * const removeUserId = deleteKey("userId")
 * removeUserId(new Map([["userId", 123], ["token", "abc"]]))
 * // Map { "token" => "abc" }
 *
 * // Building a key filter
 * const removeKeys = <K, V>(keys: Array<K>) =>
 *   (map: Map<K, V>) =>
 *     keys.reduce((m, key) => deleteKey(key)(m), map)
 *
 * removeKeys(["b", "d"])(new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]]))
 * // Map { "a" => 1, "c" => 3 }
 *
 * // Chaining deletions
 * const cleanSession = pipe(
 *   deleteKey("password"),
 *   deleteKey("tempToken"),
 *   deleteKey("_internal")
 * )
 *
 * cleanSession(new Map([
 *   ["username", "alice"],
 *   ["password", "secret"],
 *   ["tempToken", "xyz"],
 *   ["_internal", {}],
 *   ["sessionId", "abc123"]
 * ]))
 * // Map { "username" => "alice", "sessionId" => "abc123" }
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const deleteKey = <K, V>(key: K) => (map: Map<K, V>): Map<K, V> => {
	const newMap = new Map(map)
	newMap.delete(key)
	return newMap
}

export default deleteKey
