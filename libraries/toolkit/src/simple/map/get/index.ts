/**
 * Gets a value from a Map by key
 * 
 * Retrieves the value associated with a given key from a Map. Returns
 * undefined if the key doesn't exist. This function is curried to allow
 * partial application and composition in functional pipelines. It provides
 * a functional alternative to the Map.get() method.
 * 
 * @curried (key) => (map) => value | undefined
 * @param key - The key to look up
 * @param map - The Map to get the value from
 * @returns The value associated with the key, or undefined if not found
 * @example
 * ```typescript
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const getA = get("a")
 * getA(map)
 * // 1
 * 
 * // Direct application
 * get("b")(new Map([["a", 10], ["b", 20], ["c", 30]]))
 * // 20
 * 
 * // Key doesn't exist
 * const map = new Map([["x", 100], ["y", 200]])
 * get("z")(map)
 * // undefined
 * 
 * // Empty Map
 * get("any")(new Map())
 * // undefined
 * 
 * // Different value types
 * const mixed = new Map([
 *   ["string", "hello"],
 *   ["number", 123],
 *   ["boolean", true],
 *   ["object", { x: 1 }],
 *   ["array", [1, 2, 3]]
 * ])
 * get("object")(mixed)
 * // { x: 1 }
 * get("array")(mixed)
 * // [1, 2, 3]
 * 
 * // Number keys
 * const numMap = new Map([[1, "one"], [2, "two"], [3, "three"]])
 * get(2)(numMap)
 * // "two"
 * 
 * // Object keys
 * const key1 = { id: 1 }
 * const key2 = { id: 2 }
 * const objMap = new Map([[key1, "first"], [key2, "second"]])
 * get(key1)(objMap)
 * // "first"
 * get({ id: 1 })(objMap) // Different object
 * // undefined
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const userData = new Map([
 *   ["name", "Alice"],
 *   ["age", 30],
 *   ["email", "alice@example.com"]
 * ])
 * 
 * const getName = pipe(
 *   userData,
 *   get("name")
 * )
 * // "Alice"
 * 
 * // Partial application for reuse
 * const getUserId = get("userId")
 * 
 * const session1 = new Map([["userId", 123], ["token", "abc"]])
 * const session2 = new Map([["userId", 456], ["token", "def"]])
 * 
 * getUserId(session1) // 123
 * getUserId(session2) // 456
 * 
 * // Configuration lookup
 * const config = new Map([
 *   ["host", "localhost"],
 *   ["port", 3000],
 *   ["ssl", true],
 *   ["debug", false]
 * ])
 * 
 * const getHost = get("host")
 * const getPort = get("port")
 * const getTimeout = get("timeout")
 * 
 * getHost(config)    // "localhost"
 * getPort(config)    // 3000
 * getTimeout(config) // undefined
 * 
 * // Cache retrieval
 * const cache = new Map([
 *   ["user:1", { name: "Alice", age: 30 }],
 *   ["user:2", { name: "Bob", age: 25 }],
 *   ["post:1", { title: "Hello", content: "..." }]
 * ])
 * 
 * get("user:1")(cache)
 * // { name: "Alice", age: 30 }
 * get("user:3")(cache)
 * // undefined
 * 
 * // Symbol keys
 * const sym1 = Symbol("key")
 * const sym2 = Symbol("key")
 * const symMap = new Map([[sym1, "value1"], [sym2, "value2"]])
 * get(sym1)(symMap)
 * // "value1"
 * get(sym2)(symMap)
 * // "value2"
 * 
 * // Null and undefined keys
 * const nullable = new Map([
 *   [null, "null value"],
 *   [undefined, "undefined value"],
 *   ["normal", "normal value"]
 * ])
 * get(null)(nullable)
 * // "null value"
 * get(undefined)(nullable)
 * // "undefined value"
 * 
 * // Date keys
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-02")
 * const dateMap = new Map([
 *   [date1, "New Year"],
 *   [date2, "Day after"]
 * ])
 * get(date1)(dateMap)
 * // "New Year"
 * get(new Date("2024-01-01"))(dateMap) // Different Date object
 * // undefined
 * 
 * // Function values
 * const handlers = new Map([
 *   ["click", () => console.log("clicked")],
 *   ["hover", () => console.log("hovered")]
 * ])
 * const clickHandler = get("click")(handlers)
 * if (clickHandler) clickHandler()
 * // Logs: "clicked"
 * 
 * // Chaining lookups
 * const nested = new Map([
 *   ["user", new Map([
 *     ["profile", new Map([
 *       ["name", "Alice"],
 *       ["age", 30]
 *     ])]
 *   ])]
 * ])
 * 
 * const userMap = get("user")(nested)
 * const profileMap = userMap ? get("profile")(userMap) : undefined
 * const name = profileMap ? get("name")(profileMap) : undefined
 * // "Alice"
 * 
 * // Building accessor functions
 * const makeGetter = <K, V>(key: K) => (map: Map<K, V>) => get(key)(map)
 * 
 * const getId = makeGetter("id")
 * const getName = makeGetter("name")
 * 
 * const entity = new Map([["id", 123], ["name", "Entity"]])
 * getId(entity)   // 123
 * getName(entity) // "Entity"
 * 
 * // Using with conditional logic
 * const settings = new Map([
 *   ["theme", "dark"],
 *   ["fontSize", 14]
 * ])
 * 
 * const theme = get("theme")(settings) ?? "light"
 * const lang = get("language")(settings) ?? "en"
 * // theme: "dark", lang: "en"
 * 
 * // Validation helper
 * const hasRequiredFields = (map: Map<string, any>, fields: Array<string>) =>
 *   fields.every(field => get(field)(map) !== undefined)
 * 
 * const form = new Map([
 *   ["username", "alice"],
 *   ["email", "alice@example.com"]
 * ])
 * hasRequiredFields(form, ["username", "email"])     // true
 * hasRequiredFields(form, ["username", "password"])  // false
 * 
 * // Dynamic key lookup
 * const data = new Map([
 *   ["en", "Hello"],
 *   ["es", "Hola"],
 *   ["fr", "Bonjour"]
 * ])
 * const language = "es"
 * get(language)(data)
 * // "Hola"
 * 
 * // Map as dictionary
 * const dictionary = new Map([
 *   ["cat", "a small domesticated carnivorous mammal"],
 *   ["dog", "a domesticated carnivorous mammal"],
 *   ["fish", "a limbless cold-blooded vertebrate"]
 * ])
 * const define = (word: string) => get(word)(dictionary)
 * define("cat")
 * // "a small domesticated carnivorous mammal"
 * define("bird")
 * // undefined
 * 
 * // Error handling pattern
 * const safeGet = <K, V>(key: K) => (map: Map<K, V>): V | null => {
 *   const value = get(key)(map)
 *   return value !== undefined ? value : null
 * }
 * 
 * const inventory = new Map([["apple", 5], ["banana", 0]])
 * safeGet("apple")(inventory)  // 5
 * safeGet("orange")(inventory) // null
 * 
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2]])
 * const value: number | undefined = get<string, number>("a")(typed)
 * // 1
 * 
 * // Performance note
 * const large = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * get("key5000")(large) // O(1) lookup
 * // 5000
 * ```
 * @property Pure - Doesn't modify the Map
 * @property Curried - Allows partial application
 * @property Safe - Returns undefined for missing keys
 */
const get = <K, V>(key: K) =>
	(map: Map<K, V>): V | undefined => {
		return map.get(key)
	}

export default get