/**
 * Removes a key-value pair from a Map immutably
 * 
 * Creates a new Map with the specified key removed. The original Map
 * remains unchanged. This function is curried to allow partial application
 * and composition in functional pipelines. If the key doesn't exist,
 * returns a copy of the original Map.
 * 
 * @curried (key) => (map) => result
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
 * // original map is unchanged
 * 
 * // Direct application
 * deleteKey("x")(new Map([["x", 10], ["y", 20]]))
 * // Map { "y" => 20 }
 * 
 * // Key doesn't exist
 * const map = new Map([["a", 1], ["b", 2]])
 * deleteKey("z")(map)
 * // Map { "a" => 1, "b" => 2 } (copy of original)
 * 
 * // Empty Map
 * deleteKey("a")(new Map())
 * // Map {}
 * 
 * // Single entry Map
 * deleteKey("only")(new Map([["only", 42]]))
 * // Map {}
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const map = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * pipe(
 *   map,
 *   deleteKey("b"),
 *   deleteKey("d")
 * )
 * // Map { "a" => 1, "c" => 3 }
 * 
 * // Partial application for reuse
 * const removeUserId = deleteKey("userId")
 * const session1 = new Map([["userId", 123], ["token", "abc"]])
 * const session2 = new Map([["userId", 456], ["token", "def"]])
 * 
 * removeUserId(session1)
 * // Map { "token" => "abc" }
 * removeUserId(session2)
 * // Map { "token" => "def" }
 * 
 * // With number keys
 * const numMap = new Map([[1, "one"], [2, "two"], [3, "three"]])
 * deleteKey(2)(numMap)
 * // Map { 1 => "one", 3 => "three" }
 * 
 * // With object keys
 * const key1 = { id: 1 }
 * const key2 = { id: 2 }
 * const objMap = new Map([[key1, "first"], [key2, "second"]])
 * deleteKey(key1)(objMap)
 * // Map { {id:2} => "second" }
 * 
 * // Conditional deletion
 * const maybeDelete = <K, V>(condition: boolean, key: K) =>
 *   condition ? deleteKey<K, V>(key) : (map: Map<K, V>) => new Map(map)
 * 
 * const data = new Map([["temp", 1], ["permanent", 2]])
 * maybeDelete(true, "temp")(data)
 * // Map { "permanent" => 2 }
 * maybeDelete(false, "temp")(data)
 * // Map { "temp" => 1, "permanent" => 2 }
 * 
 * // Building a key filter
 * const removeKeys = <K, V>(keys: Array<K>) =>
 *   (map: Map<K, V>) =>
 *     keys.reduce((m, key) => deleteKey(key)(m), map)
 * 
 * const map = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * removeKeys(["b", "d"])(map)
 * // Map { "a" => 1, "c" => 3 }
 * 
 * // Cache eviction
 * const cache = new Map([
 *   ["user:1", { name: "Alice", age: 30 }],
 *   ["user:2", { name: "Bob", age: 25 }],
 *   ["user:3", { name: "Charlie", age: 35 }]
 * ])
 * const evictUser = deleteKey("user:2")
 * evictUser(cache)
 * // Map { "user:1" => {...}, "user:3" => {...} }
 * 
 * // Symbol keys
 * const sym = Symbol("key")
 * const symMap = new Map([[sym, "value"], ["regular", "text"]])
 * deleteKey(sym)(symMap)
 * // Map { "regular" => "text" }
 * 
 * // Chaining deletions
 * const cleanSession = pipe(
 *   deleteKey("password"),
 *   deleteKey("tempToken"),
 *   deleteKey("_internal")
 * )
 * 
 * const session = new Map([
 *   ["username", "alice"],
 *   ["password", "secret"],
 *   ["tempToken", "xyz"],
 *   ["_internal", {}],
 *   ["sessionId", "abc123"]
 * ])
 * cleanSession(session)
 * // Map { "username" => "alice", "sessionId" => "abc123" }
 * 
 * // Type safety
 * const typedMap = new Map<string, number>([["a", 1], ["b", 2]])
 * deleteKey<string, number>("a")(typedMap)
 * // Map<string, number> { "b" => 2 }
 * 
 * // Use in reducer pattern
 * type Action = { type: "DELETE"; key: string }
 * const reducer = (state: Map<string, any>, action: Action) => {
 *   switch (action.type) {
 *     case "DELETE":
 *       return deleteKey(action.key)(state)
 *     default:
 *       return state
 *   }
 * }
 * 
 * // Performance note: Creates new Map
 * const large = new Map(Array.from({ length: 1000 }, (_, i) => [i, i]))
 * const result = deleteKey(500)(large)
 * // Creates new Map with 999 entries
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Type-safe - Preserves Map key and value types
 */
const deleteKey = <K, V>(key: K) =>
	(map: Map<K, V>): Map<K, V> => {
		const newMap = new Map(map)
		newMap.delete(key)
		return newMap
	}

export default deleteKey