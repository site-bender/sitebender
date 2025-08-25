/**
 * Removes multiple keys from a Map immutably
 *
 * Creates a new Map with all specified keys removed. The original Map
 * remains unchanged. This function is curried to allow partial application
 * and composition in functional pipelines. Keys that don't exist in the
 * Map are ignored.
 *
 * @curried (keys) => (map) => result
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
 * // original map is unchanged
 *
 * // Direct application
 * deleteAll(["x", "y"])(new Map([["x", 10], ["y", 20], ["z", 30]]))
 * // Map { "z" => 30 }
 *
 * // Some keys don't exist
 * const map = new Map([["a", 1], ["b", 2]])
 * deleteAll(["b", "c", "d"])(map)
 * // Map { "a" => 1 } (only "b" was removed)
 *
 * // Empty array of keys
 * const map = new Map([["a", 1], ["b", 2]])
 * deleteAll([])(map)
 * // Map { "a" => 1, "b" => 2 } (copy of original)
 *
 * // Empty Map
 * deleteAll(["a", "b"])(new Map())
 * // Map {}
 *
 * // Remove all keys
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * deleteAll(["a", "b", "c"])(map)
 * // Map {}
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const map = new Map([
 *   ["id", 123],
 *   ["name", "Alice"],
 *   ["email", "alice@example.com"],
 *   ["password", "secret"],
 *   ["token", "xyz"]
 * ])
 *
 * pipe(
 *   map,
 *   deleteAll(["password", "token"])
 * )
 * // Map { "id" => 123, "name" => "Alice", "email" => "alice@example.com" }
 *
 * // Partial application for reuse
 * const removeSensitive = deleteAll(["password", "ssn", "creditCard"])
 *
 * const user1 = new Map([
 *   ["name", "Alice"],
 *   ["password", "secret1"],
 *   ["ssn", "123-45-6789"]
 * ])
 * removeSensitive(user1)
 * // Map { "name" => "Alice" }
 *
 * const user2 = new Map([
 *   ["name", "Bob"],
 *   ["password", "secret2"],
 *   ["creditCard", "4111111111111111"]
 * ])
 * removeSensitive(user2)
 * // Map { "name" => "Bob" }
 *
 * // With number keys
 * const numMap = new Map([[1, "one"], [2, "two"], [3, "three"], [4, "four"]])
 * deleteAll([2, 4])(numMap)
 * // Map { 1 => "one", 3 => "three" }
 *
 * // With mixed key types
 * const mixed = new Map<string | number, any>([
 *   ["a", 1],
 *   [2, "two"],
 *   ["c", 3],
 *   [4, "four"]
 * ])
 * deleteAll<string | number, any>(["a", 2, 4])(mixed)
 * // Map { "c" => 3 }
 *
 * // Conditional deletion
 * const maybeDeleteAll = <K, V>(condition: boolean, keys: Array<K>) =>
 *   condition ? deleteAll<K, V>(keys) : (map: Map<K, V>) => new Map(map)
 *
 * const data = new Map([["temp1", 1], ["temp2", 2], ["permanent", 3]])
 * maybeDeleteAll(true, ["temp1", "temp2"])(data)
 * // Map { "permanent" => 3 }
 * maybeDeleteAll(false, ["temp1", "temp2"])(data)
 * // Map { "temp1" => 1, "temp2" => 2, "permanent" => 3 }
 *
 * // Filtering by key prefix
 * const map = new Map([
 *   ["user:1", "Alice"],
 *   ["user:2", "Bob"],
 *   ["admin:1", "Charlie"],
 *   ["admin:2", "Diana"]
 * ])
 * const userKeys = [...map.keys()].filter(k => k.startsWith("user:"))
 * deleteAll(userKeys)(map)
 * // Map { "admin:1" => "Charlie", "admin:2" => "Diana" }
 *
 * // Cache cleanup
 * const cache = new Map([
 *   ["session:abc", { user: "Alice" }],
 *   ["session:def", { user: "Bob" }],
 *   ["session:ghi", { user: "Charlie" }],
 *   ["config", { theme: "dark" }]
 * ])
 * const expiredSessions = ["session:abc", "session:def"]
 * deleteAll(expiredSessions)(cache)
 * // Map { "session:ghi" => {...}, "config" => {...} }
 *
 * // Set operations
 * const keysToRemove = new Set(["a", "b", "c"])
 * const map = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4], ["e", 5]])
 * deleteAll([...keysToRemove])(map)
 * // Map { "d" => 4, "e" => 5 }
 *
 * // Cleanup helper
 * const cleanupMap = <K, V>(map: Map<K, V>, predicate: (key: K) => boolean) =>
 *   deleteAll([...map.keys()].filter(predicate))(map)
 *
 * const data = new Map([
 *   ["_temp", 1],
 *   ["_cache", 2],
 *   ["real", 3],
 *   ["_debug", 4]
 * ])
 * cleanupMap(data, k => k.startsWith("_"))
 * // Map { "real" => 3 }
 *
 * // Batch operations
 * const updates = [
 *   { action: "delete", keys: ["a", "b"] },
 *   { action: "delete", keys: ["c"] }
 * ]
 * const map = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * const result = updates.reduce(
 *   (m, update) => deleteAll(update.keys)(m),
 *   map
 * )
 * // Map { "d" => 4 }
 *
 * // Type safety
 * const typedMap = new Map<string, number>([["a", 1], ["b", 2], ["c", 3]])
 * deleteAll<string, number>(["a", "c"])(typedMap)
 * // Map<string, number> { "b" => 2 }
 *
 * // Use in reducer pattern
 * type Action =
 *   | { type: "DELETE_BATCH"; keys: Array<string> }
 *   | { type: "OTHER" }
 *
 * const reducer = (state: Map<string, any>, action: Action) => {
 *   switch (action.type) {
 *     case "DELETE_BATCH":
 *       return deleteAll(action.keys)(state)
 *     default:
 *       return state
 *   }
 * }
 *
 * // Performance consideration
 * const large = new Map(Array.from({ length: 1000 }, (_, i) => [i, i]))
 * const toRemove = Array.from({ length: 100 }, (_, i) => i * 10)
 * deleteAll(toRemove)(large)
 * // Creates new Map with 900 entries
 *
 * // Duplicate keys in array (handled gracefully)
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * deleteAll(["a", "b", "a", "b"])(map)
 * // Map { "c" => 3 }
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Safe - Ignores non-existent keys
 */
const deleteAll = <K, V>(keys: Array<K>) => (map: Map<K, V>): Map<K, V> => {
	const newMap = new Map(map)
	for (const key of keys) {
		newMap.delete(key)
	}
	return newMap
}

export default deleteAll
