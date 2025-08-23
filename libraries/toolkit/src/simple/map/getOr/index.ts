/**
 * Gets a value from a Map with a default fallback
 * 
 * Retrieves the value associated with a given key from a Map, returning
 * a default value if the key doesn't exist. This function is curried to
 * allow partial application and composition. Unlike get(), it guarantees
 * a non-undefined return value.
 * 
 * @curried (defaultValue) => (key) => (map) => value
 * @param defaultValue - The value to return if key is not found
 * @param key - The key to look up
 * @param map - The Map to get the value from
 * @returns The value associated with the key, or defaultValue if not found
 * @example
 * ```typescript
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const getWithDefault = getOr(0)
 * getWithDefault("a")(map) // 1
 * getWithDefault("z")(map) // 0
 * 
 * // Direct application
 * getOr("default")("missing")(new Map([["exists", "value"]]))
 * // "default"
 * 
 * // Key exists
 * const users = new Map([["alice", { age: 30 }], ["bob", { age: 25 }]])
 * getOr({ age: 0 })("alice")(users)
 * // { age: 30 }
 * 
 * // Key doesn't exist
 * getOr({ age: 0 })("charlie")(users)
 * // { age: 0 }
 * 
 * // Empty Map
 * getOr("fallback")("any")(new Map())
 * // "fallback"
 * 
 * // Different default types
 * const data = new Map([["count", 5], ["name", "Test"]])
 * 
 * getOr(0)("count")(data)        // 5
 * getOr(0)("missing")(data)      // 0
 * getOr("")("name")(data)        // "Test"
 * getOr("")("missing")(data)     // ""
 * getOr(null)("missing")(data)   // null
 * getOr([])("missing")(data)     // []
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const config = new Map([
 *   ["host", "localhost"],
 *   ["port", 3000]
 * ])
 * 
 * const settings = {
 *   host: pipe(config, getOr("127.0.0.1")("host")),
 *   port: pipe(config, getOr(8080)("port")),
 *   ssl: pipe(config, getOr(false)("ssl"))
 * }
 * // { host: "localhost", port: 3000, ssl: false }
 * 
 * // Partial application patterns
 * const getOrEmpty = getOr("")
 * const getOrZero = getOr(0)
 * const getOrEmptyArray = getOr([])
 * 
 * const map = new Map([["value", "hello"], ["count", 42]])
 * getOrEmpty("value")(map)      // "hello"
 * getOrEmpty("missing")(map)    // ""
 * getOrZero("count")(map)       // 42
 * getOrZero("missing")(map)     // 0
 * 
 * // Configuration with defaults
 * const defaults = {
 *   theme: "light",
 *   fontSize: 14,
 *   language: "en"
 * }
 * 
 * const userConfig = new Map([
 *   ["theme", "dark"],
 *   ["fontSize", 16]
 * ])
 * 
 * const finalConfig = {
 *   theme: getOr(defaults.theme)("theme")(userConfig),
 *   fontSize: getOr(defaults.fontSize)("fontSize")(userConfig),
 *   language: getOr(defaults.language)("language")(userConfig)
 * }
 * // { theme: "dark", fontSize: 16, language: "en" }
 * 
 * // Safe navigation
 * const users = new Map([
 *   [1, { name: "Alice", email: "alice@example.com" }],
 *   [2, { name: "Bob", email: "bob@example.com" }]
 * ])
 * 
 * const getUser = getOr({ name: "Unknown", email: "" })
 * getUser(1)(users)
 * // { name: "Alice", email: "alice@example.com" }
 * getUser(999)(users)
 * // { name: "Unknown", email: "" }
 * 
 * // Number keys
 * const scores = new Map([[1, 100], [2, 85], [3, 92]])
 * getOr(0)(4)(scores)
 * // 0
 * 
 * // Object keys
 * const key1 = { id: 1 }
 * const key2 = { id: 2 }
 * const objMap = new Map([[key1, "first"], [key2, "second"]])
 * getOr("not found")(key1)(objMap)
 * // "first"
 * getOr("not found")({ id: 1 })(objMap) // Different object
 * // "not found"
 * 
 * // Symbol keys
 * const sym = Symbol("key")
 * const symMap = new Map([[sym, "value"]])
 * getOr("default")(sym)(symMap)
 * // "value"
 * getOr("default")(Symbol("key"))(symMap) // Different symbol
 * // "default"
 * 
 * // Null/undefined handling
 * const nullable = new Map([
 *   ["a", null],
 *   ["b", undefined],
 *   ["c", 0],
 *   ["d", ""]
 * ])
 * 
 * // Values are returned as-is, even if null/undefined
 * getOr("default")("a")(nullable) // null
 * getOr("default")("b")(nullable) // undefined
 * getOr("default")("c")(nullable) // 0
 * getOr("default")("d")(nullable) // ""
 * getOr("default")("e")(nullable) // "default"
 * 
 * // Cache with fallback
 * const cache = new Map([
 *   ["user:1", { name: "Alice", cached: true }],
 *   ["user:2", { name: "Bob", cached: true }]
 * ])
 * 
 * const fetchUser = async (id: number) => {
 *   const cached = getOr(null)(`user:${id}`)(cache)
 *   if (cached) return cached
 *   
 *   // Fetch from API
 *   const user = await fetch(`/api/users/${id}`).then(r => r.json())
 *   cache.set(`user:${id}`, user)
 *   return user
 * }
 * 
 * // Translation fallbacks
 * const translations = new Map([
 *   ["hello", "Bonjour"],
 *   ["goodbye", "Au revoir"]
 * ])
 * 
 * const translate = (key: string) => 
 *   getOr(key)(key)(translations) // Falls back to key itself
 * 
 * translate("hello")    // "Bonjour"
 * translate("welcome")  // "welcome" (no translation, returns key)
 * 
 * // Feature flags with defaults
 * const features = new Map([
 *   ["darkMode", true],
 *   ["betaFeature", false]
 * ])
 * 
 * const isEnabled = (feature: string) =>
 *   getOr(false)(feature)(features)
 * 
 * isEnabled("darkMode")     // true
 * isEnabled("betaFeature")  // false
 * isEnabled("newFeature")   // false (default)
 * 
 * // Environment variables
 * const env = new Map([
 *   ["NODE_ENV", "production"],
 *   ["PORT", "3000"]
 * ])
 * 
 * const getEnv = (key: string, fallback: string) =>
 *   getOr(fallback)(key)(env)
 * 
 * getEnv("NODE_ENV", "development")  // "production"
 * getEnv("HOST", "localhost")        // "localhost"
 * 
 * // Building safe accessors
 * const makeGetter = <K, V>(defaultVal: V) => 
 *   (key: K) => 
 *   (map: Map<K, V>) => 
 *     getOr(defaultVal)(key)(map)
 * 
 * const getString = makeGetter("")
 * const getNumber = makeGetter(0)
 * const getBoolean = makeGetter(false)
 * 
 * const settings = new Map<string, any>([
 *   ["name", "App"],
 *   ["version", 2],
 *   ["debug", true]
 * ])
 * 
 * getString("name")(settings)     // "App"
 * getString("missing")(settings)  // ""
 * getNumber("version")(settings)  // 2
 * getNumber("missing")(settings)  // 0
 * 
 * // Chaining with other operations
 * import { map } from "../map/index.ts"
 * import { filter } from "../filter/index.ts"
 * 
 * const inventory = new Map([
 *   ["apple", 5],
 *   ["banana", 0],
 *   ["orange", 3]
 * ])
 * 
 * const restockLevel = 10
 * const getStock = getOr(0)
 * 
 * const needsRestock = pipe(
 *   inventory,
 *   filter((qty: number) => qty < 5),
 *   map((qty: number) => restockLevel - qty)
 * )
 * // Map { "banana" => 10, "orange" => 7 }
 * 
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2]])
 * const value: number = getOr<string, number>(0)("c")(typed)
 * // 0 (type-safe default)
 * 
 * // Complex default objects
 * interface User {
 *   id: number
 *   name: string
 *   role: string
 * }
 * 
 * const defaultUser: User = { id: 0, name: "Guest", role: "viewer" }
 * const users = new Map<number, User>([
 *   [1, { id: 1, name: "Alice", role: "admin" }]
 * ])
 * 
 * getOr(defaultUser)(1)(users)
 * // { id: 1, name: "Alice", role: "admin" }
 * getOr(defaultUser)(999)(users)
 * // { id: 0, name: "Guest", role: "viewer" }
 * 
 * // Performance note
 * const large = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * getOr(-1)("key5000")(large) // O(1) lookup
 * // 5000
 * getOr(-1)("missing")(large) // O(1) lookup
 * // -1
 * ```
 * @property Pure - Doesn't modify the Map
 * @property Curried - Allows partial application
 * @property Safe - Always returns a value (never undefined)
 */
const getOr = <K, V>(defaultValue: V) =>
	(key: K) =>
	(map: Map<K, V>): V => {
		return map.has(key) ? map.get(key)! : defaultValue
	}

export default getOr