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
 * const scores = new Map([
 *   [1, 95],
 *   [2, 87],
 *   [3, 92]
 * ])
 * keys(scores)
 * // [1, 2, 3]
 *
 * // Mixed key types
 * const mixed = new Map<string | number, string>([
 *   ["a", "alpha"],
 *   [1, "one"],
 *   ["b", "beta"],
 *   [2, "two"]
 * ])
 * keys(mixed)
 * // ["a", 1, "b", 2]
 *
 * // Object keys
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * const objMap = new Map([
 *   [obj1, "first"],
 *   [obj2, "second"]
 * ])
 * keys(objMap)
 * // [{ id: 1 }, { id: 2 }]
 *
 * // Date keys
 * const events = new Map([
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-07-04"), "Independence Day"],
 *   [new Date("2024-12-25"), "Christmas"]
 * ])
 * const eventDates = keys(events)
 * // [Date("2024-01-01"), Date("2024-07-04"), Date("2024-12-25")]
 *
 * // Empty Map
 * keys(new Map())
 * // []
 *
 * // Using with pipe for transformation
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { map as arrayMap } from "../../array/map/index.ts"
 *
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["app.version", "1.0.0"],
 *   ["app.debug", "true"]
 * ])
 *
 * pipe(
 *   config,
 *   keys,
 *   arrayMap((k: string) => k.split(".")[1])
 * )
 * // ["name", "version", "debug"]
 *
 * // Extract and filter keys
 * const inventory = new Map([
 *   ["apple", 50],
 *   ["banana", 0],
 *   ["orange", 25],
 *   ["grape", 0]
 * ])
 *
 * pipe(
 *   inventory,
 *   keys,
 *   (ks: Array<string>) => ks.filter(k => inventory.get(k)! > 0)
 * )
 * // ["apple", "orange"]
 *
 * // Check for specific keys
 * const permissions = new Map([
 *   ["read", true],
 *   ["write", false],
 *   ["delete", false]
 * ])
 *
 * const hasPermission = (perm: string) =>
 *   keys(permissions).includes(perm)
 *
 * hasPermission("read")   // true
 * hasPermission("execute") // false
 *
 * // Count keys matching pattern
 * const cache = new Map([
 *   ["user:1", { name: "Alice" }],
 *   ["user:2", { name: "Bob" }],
 *   ["post:1", { title: "Hello" }],
 *   ["user:3", { name: "Charlie" }]
 * ])
 *
 * const userKeyCount = pipe(
 *   cache,
 *   keys,
 *   (ks: Array<string>) => ks.filter(k => k.startsWith("user:")).length
 * )
 * // 3
 *
 * // Symbol keys
 * const sym1 = Symbol("key1")
 * const sym2 = Symbol("key2")
 * const symbolMap = new Map([
 *   [sym1, "value1"],
 *   [sym2, "value2"]
 * ])
 * keys(symbolMap)
 * // [Symbol(key1), Symbol(key2)]
 *
 * // Use for validation
 * const requiredFields = new Map([
 *   ["name", ""],
 *   ["email", ""],
 *   ["age", ""]
 * ])
 *
 * const validateKeys = (data: Map<string, any>) => {
 *   const required = keys(requiredFields)
 *   const provided = keys(data)
 *   return required.every(k => provided.includes(k))
 * }
 *
 * validateKeys(new Map([["name", "Alice"], ["email", "alice@example.com"]]))
 * // false (missing "age")
 *
 * // Generate lookup
 * const users = new Map([
 *   [101, { name: "Alice", role: "admin" }],
 *   [102, { name: "Bob", role: "user" }],
 *   [103, { name: "Charlie", role: "user" }]
 * ])
 *
 * const userIds = keys(users)
 * const firstUserId = userIds[0]  // 101
 * const lastUserId = userIds[userIds.length - 1]  // 103
 *
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const typedKeys: Array<string> = keys(typed)
 * // Array<string> ["a", "b", "c"]
 *
 * // Compose with Set operations
 * const map1 = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const map2 = new Map([["b", 4], ["c", 5], ["d", 6]])
 *
 * const commonKeys = pipe(
 *   map1,
 *   keys,
 *   (k1: Array<string>) => k1.filter(k => keys(map2).includes(k))
 * )
 * // ["b", "c"]
 *
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = { type: "GET_KEYS" }
 *
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "GET_KEYS":
 *       return keys(state)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Does not modify the original Map
 * @property Order-preserving - Maintains Map's iteration order
 * @property Type-safe - Preserves key type information
 */
const keys = <K, V>(map: Map<K, V>): Array<K> => {
	return Array.from(map.keys())
}

export default keys
