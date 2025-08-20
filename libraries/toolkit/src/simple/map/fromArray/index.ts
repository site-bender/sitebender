/**
 * Creates a Map from an array of [key, value] pairs
 * 
 * Constructs a new Map from an array of tuples, where each tuple contains
 * a key and its corresponding value. This is the inverse of the entries
 * function. If duplicate keys exist, the last occurrence wins. The function
 * accepts any iterable of key-value pairs.
 * 
 * @param entries - Array of [key, value] tuples
 * @returns A new Map constructed from the entries
 * @example
 * ```typescript
 * // Basic usage
 * fromArray([["a", 1], ["b", 2], ["c", 3]])
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Empty array
 * fromArray([])
 * // Map {}
 * 
 * // Single entry
 * fromArray([["only", 42]])
 * // Map { "only" => 42 }
 * 
 * // Different value types
 * fromArray([
 *   ["string", "hello"],
 *   ["number", 123],
 *   ["boolean", true],
 *   ["object", { x: 1 }]
 * ])
 * // Map { "string" => "hello", "number" => 123, "boolean" => true, "object" => {x:1} }
 * 
 * // Number keys
 * fromArray([[1, "one"], [2, "two"], [3, "three"]])
 * // Map { 1 => "one", 2 => "two", 3 => "three" }
 * 
 * // Object keys
 * const obj1 = { id: 1 }
 * const obj2 = { id: 2 }
 * fromArray([[obj1, "first"], [obj2, "second"]])
 * // Map { {id:1} => "first", {id:2} => "second" }
 * 
 * // Duplicate keys (last wins)
 * fromArray([["a", 1], ["b", 2], ["a", 3]])
 * // Map { "a" => 3, "b" => 2 }
 * 
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * fromArray([[sym1, 100], [sym2, 200]])
 * // Map { Symbol(a) => 100, Symbol(b) => 200 }
 * 
 * // From Object.entries()
 * const obj = { name: "Alice", age: 30, city: "NYC" }
 * fromArray(Object.entries(obj))
 * // Map { "name" => "Alice", "age" => 30, "city" => "NYC" }
 * 
 * // Round-trip with entries
 * import { entries } from "../entries/index.ts"
 * 
 * const original = new Map([["x", 10], ["y", 20], ["z", 30]])
 * const entriesArray = entries(original)
 * const restored = fromArray(entriesArray)
 * // Map { "x" => 10, "y" => 20, "z" => 30 }
 * 
 * // Building from array transformations
 * const users = ["Alice", "Bob", "Charlie"]
 * const indexed = users.map((name, i) => [i + 1, name])
 * fromArray(indexed)
 * // Map { 1 => "Alice", 2 => "Bob", 3 => "Charlie" }
 * 
 * // From filtered entries
 * const data = [
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3],
 *   ["d", 4]
 * ] as Array<[string, number]>
 * const filtered = data.filter(([_, v]) => v > 2)
 * fromArray(filtered)
 * // Map { "c" => 3, "d" => 4 }
 * 
 * // From mapped entries
 * const prices = [
 *   ["apple", 1.99],
 *   ["banana", 0.59],
 *   ["orange", 2.49]
 * ] as Array<[string, number]>
 * const discounted = prices.map(([item, price]) => [item, price * 0.9])
 * fromArray(discounted)
 * // Map { "apple" => 1.791, "banana" => 0.531, "orange" => 2.241 }
 * 
 * // Combining multiple sources
 * const defaults = [["theme", "light"], ["lang", "en"]]
 * const userPrefs = [["theme", "dark"], ["fontSize", 14]]
 * fromArray([...defaults, ...userPrefs])
 * // Map { "theme" => "dark", "lang" => "en", "fontSize" => 14 }
 * 
 * // From JSON data
 * const jsonStr = '[["user","Alice"],["role","admin"],["active",true]]'
 * const parsed = JSON.parse(jsonStr)
 * fromArray(parsed)
 * // Map { "user" => "Alice", "role" => "admin", "active" => true }
 * 
 * // Creating from reduce
 * const words = ["hello", "world", "hello", "foo", "world", "hello"]
 * const counts = words.reduce((acc, word) => {
 *   const count = acc.find(([k]) => k === word)
 *   if (count) {
 *     count[1]++
 *   } else {
 *     acc.push([word, 1])
 *   }
 *   return acc
 * }, [] as Array<[string, number]>)
 * fromArray(counts)
 * // Map { "hello" => 3, "world" => 2, "foo" => 1 }
 * 
 * // From zip operation
 * const keys = ["a", "b", "c"]
 * const values = [1, 2, 3]
 * const zipped = keys.map((k, i) => [k, values[i]] as [string, number])
 * fromArray(zipped)
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 * 
 * // Creating lookup table
 * const employees = [
 *   { id: 1, name: "Alice", dept: "Engineering" },
 *   { id: 2, name: "Bob", dept: "Sales" },
 *   { id: 3, name: "Charlie", dept: "Engineering" }
 * ]
 * const lookup = employees.map(emp => [emp.id, emp])
 * fromArray(lookup)
 * // Map { 1 => {id:1, ...}, 2 => {id:2, ...}, 3 => {id:3, ...} }
 * 
 * // From split strings
 * const configStr = "host=localhost;port=3000;debug=true"
 * const configEntries = configStr.split(";").map(pair => {
 *   const [key, value] = pair.split("=")
 *   return [key, value]
 * }) as Array<[string, string]>
 * fromArray(configEntries)
 * // Map { "host" => "localhost", "port" => "3000", "debug" => "true" }
 * 
 * // Handling null/undefined keys
 * fromArray([
 *   [null, "null value"],
 *   [undefined, "undefined value"],
 *   ["normal", "normal value"]
 * ])
 * // Map { null => "null value", undefined => "undefined value", "normal" => "normal value" }
 * 
 * // From async results
 * const results = await Promise.all([
 *   fetch("/api/1").then(r => ["api1", r.status]),
 *   fetch("/api/2").then(r => ["api2", r.status]),
 *   fetch("/api/3").then(r => ["api3", r.status])
 * ])
 * fromArray(results)
 * // Map { "api1" => 200, "api2" => 200, "api3" => 200 }
 * 
 * // Creating from Set
 * const uniqueValues = new Set(["a", "b", "c"])
 * const withIndices = [...uniqueValues].map((v, i) => [i, v] as [number, string])
 * fromArray(withIndices)
 * // Map { 0 => "a", 1 => "b", 2 => "c" }
 * 
 * // Error recovery with fallback
 * const maybeEntries = [
 *   ["valid", 1],
 *   null,
 *   ["another", 2],
 *   undefined,
 *   ["last", 3]
 * ].filter(Boolean) as Array<[string, number]>
 * fromArray(maybeEntries)
 * // Map { "valid" => 1, "another" => 2, "last" => 3 }
 * 
 * // Creating enum-like Maps
 * const Status = fromArray([
 *   ["PENDING", 0],
 *   ["ACTIVE", 1],
 *   ["COMPLETED", 2],
 *   ["FAILED", 3]
 * ])
 * // Map { "PENDING" => 0, "ACTIVE" => 1, "COMPLETED" => 2, "FAILED" => 3 }
 * 
 * // From FormData
 * const formData = new FormData()
 * formData.append("username", "alice")
 * formData.append("email", "alice@example.com")
 * fromArray([...formData.entries()])
 * // Map { "username" => "alice", "email" => "alice@example.com" }
 * 
 * // Grouping by first letter
 * const names = ["Alice", "Bob", "Charlie", "Anna", "Brian"]
 * const grouped = names.reduce((acc, name) => {
 *   const letter = name[0]
 *   const existing = acc.find(([k]) => k === letter)
 *   if (existing) {
 *     existing[1].push(name)
 *   } else {
 *     acc.push([letter, [name]])
 *   }
 *   return acc
 * }, [] as Array<[string, Array<string>]>)
 * fromArray(grouped)
 * // Map { "A" => ["Alice", "Anna"], "B" => ["Bob", "Brian"], "C" => ["Charlie"] }
 * 
 * // Type safety
 * const typed: Array<[string, number]> = [["a", 1], ["b", 2]]
 * const typedMap: Map<string, number> = fromArray(typed)
 * // Map<string, number> { "a" => 1, "b" => 2 }
 * 
 * // Performance with large arrays
 * const large = Array.from(
 *   { length: 10000 }, 
 *   (_, i) => [`key${i}`, i] as [string, number]
 * )
 * fromArray(large)
 * // Map with 10000 entries
 * 
 * // Use in functional pipeline
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * pipe(
 *   [["a", 1], ["b", 2], ["c", 3]],
 *   fromArray,
 *   (map) => new Map([...map, ["d", 4]])
 * )
 * // Map { "a" => 1, "b" => 2, "c" => 3, "d" => 4 }
 * ```
 * @property Pure - Creates a new Map without side effects
 * @property Flexible - Accepts any array of key-value pairs
 * @property Last-wins - Duplicate keys use the last value
 */
const fromArray = <K, V>(
	entries: Array<[K, V]>
): Map<K, V> => {
	return new Map(entries)
}

export default fromArray