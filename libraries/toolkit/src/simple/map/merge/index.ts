/**
 * Merges multiple Maps into a single Map
 *
 * Combines entries from multiple Maps into a new Map. When keys appear
 * in multiple Maps, values from later Maps override those from earlier ones.
 * This follows left-to-right precedence, making it predictable for configuration
 * merging and similar use cases. The function is curried and accepts either
 * an array of Maps or individual Maps via rest parameters.
 *
 * @curried (...maps) => result
 * @param maps - Maps to merge together
 * @returns A new Map containing all entries, with later values overriding earlier ones
 * @example
 * ```typescript
 * // Basic merge of two Maps
 * const defaults = new Map([
 *   ["timeout", 5000],
 *   ["retries", 3],
 *   ["debug", false]
 * ])
 * const overrides = new Map([
 *   ["timeout", 10000],
 *   ["debug", true]
 * ])
 * merge(defaults, overrides)
 * // Map { "timeout" => 10000, "retries" => 3, "debug" => true }
 *
 * // Merge multiple Maps
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["b", 3], ["c", 4]])
 * const map3 = new Map([["c", 5], ["d", 6]])
 * merge(map1, map2, map3)
 * // Map { "a" => 1, "b" => 3, "c" => 5, "d" => 6 }
 *
 * // Merge with array of Maps
 * const maps = [
 *   new Map([["x", 10]]),
 *   new Map([["y", 20]]),
 *   new Map([["z", 30]])
 * ]
 * merge(...maps)
 * // Map { "x" => 10, "y" => 20, "z" => 30 }
 *
 * // Configuration merging
 * const baseConfig = new Map([
 *   ["apiUrl", "https://api.example.com"],
 *   ["timeout", 5000],
 *   ["retries", 3]
 * ])
 * const envConfig = new Map([
 *   ["apiUrl", "https://staging.api.example.com"],
 *   ["debug", true]
 * ])
 * const userConfig = new Map([
 *   ["timeout", 10000],
 *   ["theme", "dark"]
 * ])
 * merge(baseConfig, envConfig, userConfig)
 * // Map { "apiUrl" => "https://staging.api.example.com", "timeout" => 10000, "retries" => 3, "debug" => true, "theme" => "dark" }
 *
 * // Merge Maps with different value types
 * const strings = new Map<string, string>([["a", "alpha"], ["b", "beta"]])
 * const numbers = new Map<string, number>([["c", 3], ["d", 4]])
 * const mixed = new Map<string, string | number>([["b", 100], ["e", "echo"]])
 * merge<string, string | number>(strings, numbers, mixed)
 * // Map { "a" => "alpha", "b" => 100, "c" => 3, "d" => 4, "e" => "echo" }
 *
 * // Empty Maps
 * merge(new Map(), new Map())
 * // Map {}
 *
 * // Single Map
 * const single = new Map([["key", "value"]])
 * merge(single)
 * // Map { "key" => "value" }
 *
 * // No arguments
 * merge()
 * // Map {}
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { map } from "../map/index.ts"
 *
 * const base = new Map([["a", 1], ["b", 2]])
 * const updates = new Map([["b", 20], ["c", 30]])
 *
 * pipe(
 *   merge(base, updates),
 *   map((v: number) => v * 2)
 * )
 * // Map { "a" => 2, "b" => 40, "c" => 60 }
 *
 * // Object value merging
 * const users1 = new Map([
 *   [1, { name: "Alice", age: 30 }],
 *   [2, { name: "Bob", age: 25 }]
 * ])
 * const users2 = new Map([
 *   [2, { name: "Robert", age: 26 }],
 *   [3, { name: "Charlie", age: 35 }]
 * ])
 * merge(users1, users2)
 * // Map { 1 => {name:"Alice", age:30}, 2 => {name:"Robert", age:26}, 3 => {name:"Charlie", age:35} }
 *
 * // Date keys
 * const events1 = new Map([
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-07-04"), "Independence Day"]
 * ])
 * const events2 = new Map([
 *   [new Date("2024-12-25"), "Christmas"],
 *   [new Date("2024-01-01"), "New Year's Day"] // Same date, different value
 * ])
 * merge(events1, events2)
 * // Map with dates as keys, later values override
 *
 * // Partial application for defaults
 * const withDefaults = (defaults: Map<string, any>) =>
 *   (overrides: Map<string, any>) => merge(defaults, overrides)
 *
 * const defaultHeaders = new Map([
 *   ["Content-Type", "application/json"],
 *   ["Accept", "application/json"]
 * ])
 *
 * const addHeaders = withDefaults(defaultHeaders)
 *
 * addHeaders(new Map([["Authorization", "Bearer token"]]))
 * // Map { "Content-Type" => "application/json", "Accept" => "application/json", "Authorization" => "Bearer token" }
 *
 * // Merge with spreading
 * const permissions = new Map([["read", true]])
 * const additionalPerms = [
 *   new Map([["write", true]]),
 *   new Map([["delete", false]]),
 *   new Map([["admin", true]])
 * ]
 * merge(permissions, ...additionalPerms)
 * // Map { "read" => true, "write" => true, "delete" => false, "admin" => true }
 *
 * // Numeric keys
 * const scores1 = new Map([[1, 100], [2, 200]])
 * const scores2 = new Map([[2, 250], [3, 300]])
 * const scores3 = new Map([[3, 350], [4, 400]])
 * merge(scores1, scores2, scores3)
 * // Map { 1 => 100, 2 => 250, 3 => 350, 4 => 400 }
 *
 * // Symbol keys
 * const sym1 = Symbol("key1")
 * const sym2 = Symbol("key2")
 * const symMap1 = new Map([[sym1, "value1"]])
 * const symMap2 = new Map([[sym2, "value2"]])
 * merge(symMap1, symMap2)
 * // Map { Symbol(key1) => "value1", Symbol(key2) => "value2" }
 *
 * // Accumulating values
 * const dailyStats = [
 *   new Map([["visits", 100], ["clicks", 50]]),
 *   new Map([["visits", 150], ["conversions", 5]]),
 *   new Map([["clicks", 75], ["conversions", 8]])
 * ]
 *
 * // Note: merge overwrites, doesn't accumulate
 * merge(...dailyStats)
 * // Map { "visits" => 150, "clicks" => 75, "conversions" => 8 }
 *
 * // Layered configuration
 * const systemDefaults = new Map([
 *   ["logLevel", "info"],
 *   ["maxConnections", 100],
 *   ["timeout", 30000]
 * ])
 * const appDefaults = new Map([
 *   ["logLevel", "warn"],
 *   ["appName", "MyApp"]
 * ])
 * const runtimeConfig = new Map([
 *   ["logLevel", "debug"],
 *   ["timeout", 60000]
 * ])
 *
 * merge(systemDefaults, appDefaults, runtimeConfig)
 * // Map { "logLevel" => "debug", "maxConnections" => 100, "timeout" => 60000, "appName" => "MyApp" }
 *
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1]])
 * const typed2 = new Map<string, number>([["b", 2]])
 * const result: Map<string, number> = merge(typed1, typed2)
 * // Map<string, number> { "a" => 1, "b" => 2 }
 *
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = { type: "MERGE"; payload: Map<string, any> }
 *
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "MERGE":
 *       return merge(state, action.payload)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify originals
 * @property Left-to-right - Later Maps override earlier ones
 * @property Variadic - Accepts any number of Maps
 */
const merge = <K, V>(...maps: Array<Map<K, V>>): Map<K, V> => {
	const result = new Map<K, V>()
	for (const map of maps) {
		for (const [key, value] of map) {
			result.set(key, value)
		}
	}
	return result
}

export default merge
