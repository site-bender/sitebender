/**
 * Maps a function over the entries of a Map
 * 
 * Transforms each key-value pair in a Map by applying a function that
 * receives the entire entry as a tuple [key, value] and returns a new
 * tuple [newKey, newValue]. This allows simultaneous transformation of
 * both keys and values in a single operation. The function creates a
 * new Map with the transformed entries.
 * 
 * @curried (fn) => (map) => result
 * @param fn - Function to transform each [key, value] pair
 * @param map - The Map to transform
 * @returns A new Map with transformed entries
 * @example
 * ```typescript
 * // Basic entry transformation
 * const scores = new Map([
 *   ["alice", 85],
 *   ["bob", 92],
 *   ["charlie", 78]
 * ])
 * const upperCaseKeys = mapEntries(
 *   ([name, score]: [string, number]) => [name.toUpperCase(), score]
 * )
 * upperCaseKeys(scores)
 * // Map { "ALICE" => 85, "BOB" => 92, "CHARLIE" => 78 }
 * 
 * // Transform both key and value
 * const inventory = new Map([
 *   ["apple", 10],
 *   ["banana", 5],
 *   ["orange", 8]
 * ])
 * mapEntries(
 *   ([item, count]: [string, number]) => [`${item}_fruit`, count * 2]
 * )(inventory)
 * // Map { "apple_fruit" => 20, "banana_fruit" => 10, "orange_fruit" => 16 }
 * 
 * // Swap keys and values
 * const codes = new Map([
 *   ["US", "United States"],
 *   ["UK", "United Kingdom"],
 *   ["FR", "France"]
 * ])
 * mapEntries(
 *   ([code, name]: [string, string]) => [name, code]
 * )(codes)
 * // Map { "United States" => "US", "United Kingdom" => "UK", "France" => "FR" }
 * 
 * // Complex transformation
 * const users = new Map([
 *   [1, { name: "Alice", role: "admin" }],
 *   [2, { name: "Bob", role: "user" }],
 *   [3, { name: "Charlie", role: "user" }]
 * ])
 * mapEntries(
 *   ([id, user]: [number, any]) => [`user_${id}`, user.name]
 * )(users)
 * // Map { "user_1" => "Alice", "user_2" => "Bob", "user_3" => "Charlie" }
 * 
 * // Prefix keys with index
 * const items = new Map([
 *   ["a", "apple"],
 *   ["b", "banana"],
 *   ["c", "cherry"]
 * ])
 * let index = 0
 * mapEntries(([key, value]: [string, string]) => {
 *   const newKey = `${index}_${key}`
 *   index++
 *   return [newKey, value]
 * })(items)
 * // Map { "0_a" => "apple", "1_b" => "banana", "2_c" => "cherry" }
 * 
 * // Filter and transform simultaneously
 * const data = new Map([
 *   ["temp", 23.5],
 *   ["humidity", 65],
 *   ["pressure", 1013]
 * ])
 * mapEntries(([key, value]: [string, number]) => {
 *   const formatted = value.toFixed(1)
 *   return [`sensor_${key}`, formatted]
 * })(data)
 * // Map { "sensor_temp" => "23.5", "sensor_humidity" => "65.0", "sensor_pressure" => "1013.0" }
 * 
 * // Empty Map
 * mapEntries(([k, v]: [any, any]) => [k, v])(new Map())
 * // Map {}
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const config = new Map([
 *   ["timeout", "5000"],
 *   ["retries", "3"],
 *   ["debug", "true"]
 * ])
 * 
 * pipe(
 *   config,
 *   mapEntries(([k, v]: [string, string]) => [`app.${k}`, parseInt(v, 10) || v]),
 *   mapEntries(([k, v]: [string, any]) => [k.toUpperCase(), v])
 * )
 * // Map { "APP.TIMEOUT" => 5000, "APP.RETRIES" => 3, "APP.DEBUG" => "true" }
 * 
 * // Date key transformation
 * const events = new Map([
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-07-04"), "Independence Day"],
 *   [new Date("2024-12-25"), "Christmas"]
 * ])
 * mapEntries(([date, name]: [Date, string]) => [
 *   date.toISOString().split("T")[0],
 *   name.toLowerCase()
 * ])(events)
 * // Map { "2024-01-01" => "new year", "2024-07-04" => "independence day", "2024-12-25" => "christmas" }
 * 
 * // Normalize entries
 * const mixed = new Map([
 *   ["  key1  ", "value1"],
 *   ["KEY2", "value2"],
 *   ["key_3", "value3"]
 * ])
 * mapEntries(([k, v]: [string, string]) => [
 *   k.trim().toLowerCase().replace(/_/g, "-"),
 *   v.trim()
 * ])(mixed)
 * // Map { "key1" => "value1", "key2" => "value2", "key-3" => "value3" }
 * 
 * // Partial application
 * const addPrefix = (prefix: string) =>
 *   mapEntries(([k, v]: [string, any]) => [`${prefix}_${k}`, v])
 * 
 * const original = new Map([["a", 1], ["b", 2], ["c", 3]])
 * addPrefix("test")(original)
 * // Map { "test_a" => 1, "test_b" => 2, "test_c" => 3 }
 * addPrefix("prod")(original)
 * // Map { "prod_a" => 1, "prod_b" => 2, "prod_c" => 3 }
 * 
 * // Combine values with keys
 * const prices = new Map([
 *   ["apple", 1.99],
 *   ["banana", 0.59],
 *   ["orange", 2.49]
 * ])
 * mapEntries(([item, price]: [string, number]) => [
 *   item,
 *   `${item}: $${price.toFixed(2)}`
 * ])(prices)
 * // Map { "apple" => "apple: $1.99", "banana" => "banana: $0.59", "orange" => "orange: $2.49" }
 * 
 * // Object key transformation
 * const obj1 = { type: "user" }
 * const obj2 = { type: "admin" }
 * const objMap = new Map([
 *   [obj1, "Alice"],
 *   [obj2, "Bob"]
 * ])
 * mapEntries(([obj, name]: [any, string]) => [
 *   obj.type,
 *   name
 * ])(objMap)
 * // Map { "user" => "Alice", "admin" => "Bob" }
 * 
 * // Numeric key operations
 * const nums = new Map([
 *   [1, "one"],
 *   [2, "two"],
 *   [3, "three"]
 * ])
 * mapEntries(([n, word]: [number, string]) => [
 *   n * 10,
 *   word.repeat(n)
 * ])(nums)
 * // Map { 10 => "one", 20 => "twotwo", 30 => "threethreethree" }
 * 
 * // Conditional transformation
 * const status = new Map([
 *   ["server1", 200],
 *   ["server2", 404],
 *   ["server3", 500]
 * ])
 * mapEntries(([name, code]: [string, number]) => {
 *   const newName = code >= 400 ? `${name}_error` : `${name}_ok`
 *   const message = code >= 400 ? "unhealthy" : "healthy"
 *   return [newName, message]
 * })(status)
 * // Map { "server1_ok" => "healthy", "server2_error" => "unhealthy", "server3_error" => "unhealthy" }
 * 
 * // Parse and transform
 * const encoded = new Map([
 *   ["user:1:name", "Alice"],
 *   ["user:1:age", "30"],
 *   ["user:2:name", "Bob"],
 *   ["user:2:age", "25"]
 * ])
 * mapEntries(([key, value]: [string, string]) => {
 *   const parts = key.split(":")
 *   const newKey = `${parts[1]}_${parts[2]}`
 *   const newValue = parts[2] === "age" ? parseInt(value, 10) : value
 *   return [newKey, newValue]
 * })(encoded)
 * // Map { "1_name" => "Alice", "1_age" => 30, "2_name" => "Bob", "2_age" => 25 }
 * 
 * // Symbol key handling
 * const sym1 = Symbol("key1")
 * const sym2 = Symbol("key2")
 * const symMap = new Map([
 *   [sym1, "value1"],
 *   [sym2, "value2"]
 * ])
 * mapEntries(([sym, val]: [symbol, string]) => [
 *   Symbol(val),
 *   sym.toString()
 * ])(symMap)
 * // Map { Symbol(value1) => "Symbol(key1)", Symbol(value2) => "Symbol(key2)" }
 * 
 * // Type safety
 * const typed = new Map<string, number>([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const transformed: Map<number, string> = mapEntries<string, number, number, string>(
 *   ([k, v]) => [v, k]
 * )(typed)
 * // Map<number, string> { 1 => "a", 2 => "b", 3 => "c" }
 * 
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = { type: "UPPERCASE_KEYS" }
 * 
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "UPPERCASE_KEYS":
 *       return mapEntries(([k, v]: [string, any]) => [k.toUpperCase(), v])(state)
 *     default:
 *       return state
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Flexible - Can transform both keys and values simultaneously
 */
const mapEntries = <K, V, NK, NV>(
	fn: (entry: [K, V]) => [NK, NV]
) =>
	(map: Map<K, V>): Map<NK, NV> => {
		const result = new Map<NK, NV>()
		for (const entry of map) {
			const [newKey, newValue] = fn(entry)
			result.set(newKey, newValue)
		}
		return result
	}

export default mapEntries