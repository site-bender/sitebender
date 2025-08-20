/**
 * Sets multiple key-value pairs in a Map
 * 
 * Creates a new Map with multiple key-value pairs added or updated from
 * an iterable of entries. Existing keys are overwritten with new values.
 * This maintains immutability by returning a new Map instance. Useful for
 * batch updates, merging configurations, and efficient multi-key operations.
 * 
 * @curried (entries) => (map) => result
 * @param entries - Iterable of [key, value] pairs to set
 * @param map - The Map to update
 * @returns A new Map with all entries set
 * @example
 * ```typescript
 * // Basic usage - add multiple entries
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92]
 * ])
 * const newScores: Array<[string, number]> = [
 *   ["Charlie", 78],
 *   ["David", 88]
 * ]
 * setAll(newScores)(scores)
 * // Map { "Alice" => 85, "Bob" => 92, "Charlie" => 78, "David" => 88 }
 * 
 * // Update existing entries
 * const updates: Array<[string, number]> = [
 *   ["Alice", 90],
 *   ["Bob", 95]
 * ]
 * setAll(updates)(scores)
 * // Map { "Alice" => 90, "Bob" => 95 }
 * 
 * // Mix of new and updates
 * const mixed: Array<[string, number]> = [
 *   ["Alice", 87],    // update
 *   ["Charlie", 91],  // new
 *   ["Eve", 83]       // new
 * ]
 * setAll(mixed)(scores)
 * // Map { "Alice" => 87, "Bob" => 92, "Charlie" => 91, "Eve" => 83 }
 * 
 * // Set from another Map
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["b", 20], ["c", 30]])
 * setAll(map2)(map1)
 * // Map { "a" => 1, "b" => 20, "c" => 30 }
 * 
 * // Set from object entries
 * const obj = { x: 10, y: 20, z: 30 }
 * setAll(Object.entries(obj))(new Map())
 * // Map { "x" => 10, "y" => 20, "z" => 30 }
 * 
 * // Empty entries
 * const original = new Map([["key", "value"]])
 * setAll([])(original)
 * // Map { "key" => "value" } - unchanged
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const initial = new Map([["a", 1]])
 * pipe(
 *   initial,
 *   setAll([["b", 2], ["c", 3]]),
 *   setAll([["d", 4], ["e", 5]]),
 *   setAll([["a", 10]]) // update existing
 * )
 * // Map { "a" => 10, "b" => 2, "c" => 3, "d" => 4, "e" => 5 }
 * 
 * // Configuration merging
 * const defaultConfig = new Map([
 *   ["host", "localhost"],
 *   ["port", 3000],
 *   ["debug", false]
 * ])
 * const envConfig: Array<[string, any]> = [
 *   ["host", "production.example.com"],
 *   ["ssl", true],
 *   ["debug", true]
 * ]
 * setAll(envConfig)(defaultConfig)
 * // Map { "host" => "production.example.com", "port" => 3000, "debug" => true, "ssl" => true }
 * 
 * // Batch user updates
 * const users = new Map([
 *   [1, { name: "Alice", status: "active" }],
 *   [2, { name: "Bob", status: "active" }],
 *   [3, { name: "Charlie", status: "active" }]
 * ])
 * const statusUpdates: Array<[number, any]> = [
 *   [2, { name: "Bob", status: "inactive" }],
 *   [3, { name: "Charlie", status: "suspended" }]
 * ]
 * setAll(statusUpdates)(users)
 * // Map with updated user statuses
 * 
 * // Setting from array with transformation
 * const items = ["apple", "banana", "cherry"]
 * const itemEntries: Array<[number, string]> = items.map((item, i) => [i, item])
 * setAll(itemEntries)(new Map())
 * // Map { 0 => "apple", 1 => "banana", 2 => "cherry" }
 * 
 * // Numeric keys
 * const numeric = new Map([[1, "one"]])
 * setAll([[2, "two"], [3, "three"], [4, "four"]])(numeric)
 * // Map { 1 => "one", 2 => "two", 3 => "three", 4 => "four" }
 * 
 * // Date keys
 * const events = new Map<Date, string>()
 * const newEvents: Array<[Date, string]> = [
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-07-04"), "Independence Day"],
 *   [new Date("2024-12-25"), "Christmas"]
 * ]
 * setAll(newEvents)(events)
 * // Map with Date keys and event names
 * 
 * // Symbol keys
 * const sym1 = Symbol("key1")
 * const sym2 = Symbol("key2")
 * const symEntries: Array<[symbol, string]> = [
 *   [sym1, "value1"],
 *   [sym2, "value2"]
 * ]
 * setAll(symEntries)(new Map())
 * // Map { Symbol(key1) => "value1", Symbol(key2) => "value2" }
 * 
 * // Partial application for common updates
 * const applyDefaults = setAll([
 *   ["timeout", 5000],
 *   ["retries", 3],
 *   ["async", true]
 * ])
 * 
 * const config1 = new Map([["url", "api1.example.com"]])
 * const config2 = new Map([["url", "api2.example.com"]])
 * 
 * applyDefaults(config1)
 * // Map { "url" => "api1.example.com", "timeout" => 5000, ... }
 * applyDefaults(config2)
 * // Map { "url" => "api2.example.com", "timeout" => 5000, ... }
 * 
 * // Building Maps incrementally
 * const buildHeaders = pipe(
 *   new Map<string, string>(),
 *   setAll([
 *     ["Content-Type", "application/json"],
 *     ["Accept", "application/json"]
 *   ]),
 *   setAll([
 *     ["Authorization", "Bearer token"],
 *     ["X-Request-ID", "123456"]
 *   ])
 * )
 * // Map with all headers
 * 
 * // Conditional batch setting
 * const conditionalSetAll = <K, V>(
 *   condition: boolean,
 *   entries: Iterable<[K, V]>
 * ) => (map: Map<K, V>) =>
 *   condition ? setAll(entries)(map) : map
 * 
 * const data = new Map([["existing", "value"]])
 * conditionalSetAll(true, [["new1", "data1"], ["new2", "data2"]])(data)
 * // Map with new entries
 * conditionalSetAll(false, [["skip", "this"]])(data)
 * // Original Map unchanged
 * 
 * // Overwriting with Set entries
 * const uniqueKeys = new Set(["a", "b", "c"])
 * const keyValuePairs: Array<[string, number]> = 
 *   Array.from(uniqueKeys).map((k, i) => [k, i])
 * setAll(keyValuePairs)(new Map())
 * // Map { "a" => 0, "b" => 1, "c" => 2 }
 * 
 * // Cache refresh pattern
 * const cache = new Map([
 *   ["user:1", { data: "old", timestamp: 0 }],
 *   ["user:2", { data: "old", timestamp: 0 }]
 * ])
 * const freshData: Array<[string, any]> = [
 *   ["user:1", { data: "new1", timestamp: Date.now() }],
 *   ["user:2", { data: "new2", timestamp: Date.now() }],
 *   ["user:3", { data: "new3", timestamp: Date.now() }]
 * ]
 * setAll(freshData)(cache)
 * // Map with all fresh cache entries
 * 
 * // Merging form data
 * const formDefaults = new Map([
 *   ["name", ""],
 *   ["email", ""],
 *   ["subscribe", false]
 * ])
 * const userInput: Array<[string, any]> = [
 *   ["name", "Alice"],
 *   ["email", "alice@example.com"],
 *   ["subscribe", true],
 *   ["comment", "Hello!"] // additional field
 * ]
 * setAll(userInput)(formDefaults)
 * // Map with user input merged with defaults
 * 
 * // Setting from filtered entries
 * const allData = new Map([
 *   ["a", 1],
 *   ["b", -2],
 *   ["c", 3],
 *   ["d", -4]
 * ])
 * const positiveEntries = Array.from(allData.entries())
 *   .filter(([_, v]) => v > 0)
 * setAll(positiveEntries)(new Map())
 * // Map { "a" => 1, "c" => 3 }
 * 
 * // Accumulating updates
 * const accumulate = (maps: Array<Map<string, number>>) => {
 *   const entries = maps.flatMap(m => Array.from(m.entries()))
 *   return setAll(entries)(new Map())
 * }
 * 
 * const map1Data = new Map([["a", 1], ["b", 2]])
 * const map2Data = new Map([["b", 3], ["c", 4]])
 * const map3Data = new Map([["c", 5], ["d", 6]])
 * accumulate([map1Data, map2Data, map3Data])
 * // Map { "a" => 1, "b" => 3, "c" => 5, "d" => 6 }
 * 
 * // Type safety
 * const typed = new Map<string, number>([["a", 1]])
 * const typedEntries: Array<[string, number]> = [["b", 2], ["c", 3]]
 * const result: Map<string, number> = setAll(typedEntries)(typed)
 * // Map<string, number> { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Generator entries
 * function* generateEntries(): Generator<[string, number]> {
 *   yield ["gen1", 100]
 *   yield ["gen2", 200]
 *   yield ["gen3", 300]
 * }
 * setAll(generateEntries())(new Map())
 * // Map { "gen1" => 100, "gen2" => 200, "gen3" => 300 }
 * 
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = 
 *   | { type: "SET_ALL"; entries: Array<[string, any]> }
 *   | { type: "OTHER" }
 * 
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "SET_ALL":
 *       return setAll(action.entries)(state)
 *     default:
 *       return state
 *   }
 * }
 * 
 * // Immutability verification
 * const original = new Map([["key", "value"]])
 * const modified = setAll([["key", "new"], ["other", "data"]])(original)
 * console.log(original.size)  // 1 - unchanged
 * console.log(modified.size)  // 2
 * console.log(original === modified) // false - different instances
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Batch - Efficiently sets multiple entries at once
 */
const setAll = <K, V>(entries: Iterable<[K, V]>) =>
	(map: Map<K, V>): Map<K, V> => {
		const result = new Map(map)
		for (const [key, value] of entries) {
			result.set(key, value)
		}
		return result
	}

export default setAll