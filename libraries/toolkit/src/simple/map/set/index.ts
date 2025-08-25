/**
 * Sets a key-value pair in a Map
 *
 * Creates a new Map with the specified key-value pair added or updated.
 * If the key already exists, its value is replaced. This maintains
 * immutability by returning a new Map instance rather than modifying
 * the original. Useful for functional updates in state management and
 * data transformations.
 *
 * @curried (key) => (value) => (map) => result
 * @param key - The key to set
 * @param value - The value to associate with the key
 * @param map - The Map to update
 * @returns A new Map with the key-value pair set
 * @example
 * ```typescript
 * // Basic usage - add new entry
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92]
 * ])
 * set("Charlie")(78)(scores)
 * // Map { "Alice" => 85, "Bob" => 92, "Charlie" => 78 }
 *
 * // Update existing entry
 * const updated = set("Alice")(90)(scores)
 * // Map { "Alice" => 90, "Bob" => 92 }
 * // Original scores Map unchanged
 *
 * // Add to empty Map
 * set("key")("value")(new Map())
 * // Map { "key" => "value" }
 *
 * // Numeric keys
 * const numbered = new Map([
 *   [1, "one"],
 *   [2, "two"]
 * ])
 * set(3)("three")(numbered)
 * // Map { 1 => "one", 2 => "two", 3 => "three" }
 *
 * // Object values
 * const users = new Map([
 *   [1, { name: "Alice", age: 30 }]
 * ])
 * set(2)({ name: "Bob", age: 25 })(users)
 * // Map { 1 => {...}, 2 => {name:"Bob", age:25} }
 *
 * // Update object value
 * const config = new Map([
 *   ["database", { host: "localhost", port: 5432 }]
 * ])
 * set("database")({ host: "192.168.1.1", port: 5432 })(config)
 * // Map { "database" => {host:"192.168.1.1", port:5432} }
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const initial = new Map([["a", 1]])
 * pipe(
 *   initial,
 *   set("b")(2),
 *   set("c")(3),
 *   set("a")(10)  // Update existing
 * )
 * // Map { "a" => 10, "b" => 2, "c" => 3 }
 *
 * // Partial application for repeated use
 * const setActive = set("active")
 * const setInactive = set("active")(false)
 *
 * const status1 = new Map([["user", "Alice"]])
 * const status2 = new Map([["user", "Bob"]])
 *
 * setActive(true)(status1)
 * // Map { "user" => "Alice", "active" => true }
 * setInactive(status2)
 * // Map { "user" => "Bob", "active" => false }
 *
 * // Building Maps incrementally
 * const buildUser = pipe(
 *   new Map<string, any>(),
 *   set("id")(123),
 *   set("name")("Alice"),
 *   set("email")("alice@example.com"),
 *   set("role")("admin")
 * )
 * // Map { "id" => 123, "name" => "Alice", "email" => "...", "role" => "admin" }
 *
 * // Date keys
 * const events = new Map<Date, string>()
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-07-04")
 * pipe(
 *   events,
 *   set(date1)("New Year"),
 *   set(date2)("Independence Day")
 * )
 * // Map with Date keys
 *
 * // Symbol keys
 * const sym = Symbol("key")
 * const symMap = new Map<symbol, string>()
 * set(sym)("value")(symMap)
 * // Map { Symbol(key) => "value" }
 *
 * // Conditional setting
 * const conditionalSet = <K, V>(
 *   condition: boolean,
 *   key: K,
 *   value: V
 * ) => (map: Map<K, V>) =>
 *   condition ? set(key)(value)(map) : map
 *
 * const data = new Map([["existing", "value"]])
 * conditionalSet(true, "new", "data")(data)
 * // Map { "existing" => "value", "new" => "data" }
 * conditionalSet(false, "skip", "this")(data)
 * // Map { "existing" => "value" } - unchanged
 *
 * // Setting with transformation
 * const setWithTransform = <K, V>(
 *   key: K,
 *   transform: (oldVal: V | undefined) => V
 * ) => (map: Map<K, V>) =>
 *   set(key)(transform(map.get(key)))(map)
 *
 * const counts = new Map([["clicks", 5]])
 * setWithTransform("clicks", (old = 0) => old + 1)(counts)
 * // Map { "clicks" => 6 }
 * setWithTransform("views", (old = 0) => old + 1)(counts)
 * // Map { "clicks" => 5, "views" => 1 }
 *
 * // Array values
 * const lists = new Map<string, Array<number>>()
 * pipe(
 *   lists,
 *   set("evens")([2, 4, 6]),
 *   set("odds")([1, 3, 5])
 * )
 * // Map { "evens" => [2,4,6], "odds" => [1,3,5] }
 *
 * // Function values
 * const operations = new Map<string, Function>()
 * pipe(
 *   operations,
 *   set("add")((a: number, b: number) => a + b),
 *   set("multiply")((a: number, b: number) => a * b)
 * )
 * // Map with function values
 *
 * // Nested Maps
 * const nested = new Map<string, Map<string, number>>()
 * const innerMap = new Map([["x", 1], ["y", 2]])
 * set("coordinates")(innerMap)(nested)
 * // Map { "coordinates" => Map { "x" => 1, "y" => 2 } }
 *
 * // Settings management
 * const defaultSettings = new Map([
 *   ["theme", "light"],
 *   ["fontSize", 14]
 * ])
 *
 * const applyUserPreference = (key: string, value: any) =>
 *   set(key)(value)
 *
 * const userSettings = pipe(
 *   defaultSettings,
 *   applyUserPreference("theme", "dark"),
 *   applyUserPreference("fontSize", 16),
 *   applyUserPreference("language", "en")
 * )
 * // Map with updated and new settings
 *
 * // Cache update pattern
 * const cache = new Map([
 *   ["user:1", { name: "Alice", cached: Date.now() }]
 * ])
 * const updateCache = (key: string, data: any) =>
 *   set(key)({ ...data, cached: Date.now() })
 *
 * updateCache("user:2", { name: "Bob" })(cache)
 * // Map with new cached entry
 *
 * // Type safety
 * const typed = new Map<string, number>([["a", 1]])
 * const result: Map<string, number> = set<string, number>("b")(2)(typed)
 * // Map<string, number> { "a" => 1, "b" => 2 }
 *
 * // Composition with other Map functions
 * import { filter } from "../filter/index.ts"
 * import { map } from "../map/index.ts"
 *
 * const process = pipe(
 *   new Map([["a", 1], ["b", 2]]),
 *   set("c")(3),
 *   filter((v: number) => v > 1),
 *   map((v: number) => v * 2)
 * )
 * // Map { "b" => 4, "c" => 6 }
 *
 * // Use in reducer
 * type State = Map<string, any>
 * type Action =
 *   | { type: "SET"; key: string; value: any }
 *   | { type: "OTHER" }
 *
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "SET":
 *       return set(action.key)(action.value)(state)
 *     default:
 *       return state
 *   }
 * }
 *
 * // Immutability verification
 * const original = new Map([["key", "value"]])
 * const modified = set("key")("new value")(original)
 * console.log(original.get("key"))  // "value" - unchanged
 * console.log(modified.get("key"))  // "new value"
 * console.log(original === modified) // false - different instances
 * ```
 * @property Pure - Creates new Map, doesn't modify original
 * @property Curried - Allows partial application
 * @property Immutable - Original Map remains unchanged
 */
const set = <K, V>(key: K) => (value: V) => (map: Map<K, V>): Map<K, V> => {
	const result = new Map(map)
	result.set(key, value)
	return result
}

export default set
