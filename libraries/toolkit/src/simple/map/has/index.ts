/**
 * Checks if a Map contains a key
 * 
 * Tests whether a key exists in a Map. Returns true if the key is present,
 * false otherwise. This function is curried to allow partial application
 * and composition in functional pipelines. It provides a functional
 * alternative to the Map.has() method.
 * 
 * @curried (key) => (map) => boolean
 * @param key - The key to check for
 * @param map - The Map to check
 * @returns True if the key exists, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * const map = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const hasA = has("a")
 * hasA(map)
 * // true
 * 
 * // Direct application
 * has("b")(new Map([["a", 10], ["b", 20], ["c", 30]]))
 * // true
 * 
 * // Key doesn't exist
 * const map = new Map([["x", 100], ["y", 200]])
 * has("z")(map)
 * // false
 * 
 * // Empty Map
 * has("any")(new Map())
 * // false
 * 
 * // Different key types
 * const mixed = new Map([
 *   ["string", "value"],
 *   [123, "number key"],
 *   [true, "boolean key"],
 *   [null, "null key"],
 *   [undefined, "undefined key"]
 * ])
 * has("string")(mixed)    // true
 * has(123)(mixed)         // true
 * has(true)(mixed)        // true
 * has(null)(mixed)        // true
 * has(undefined)(mixed)   // true
 * has(false)(mixed)       // false
 * 
 * // Number keys
 * const numMap = new Map([[1, "one"], [2, "two"], [3, "three"]])
 * has(2)(numMap)  // true
 * has(4)(numMap)  // false
 * 
 * // Object keys (reference equality)
 * const key1 = { id: 1 }
 * const key2 = { id: 2 }
 * const objMap = new Map([[key1, "first"], [key2, "second"]])
 * has(key1)(objMap)        // true
 * has(key2)(objMap)        // true
 * has({ id: 1 })(objMap)   // false (different object)
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const config = new Map([
 *   ["host", "localhost"],
 *   ["port", 3000],
 *   ["debug", true]
 * ])
 * 
 * const hasDebug = pipe(
 *   config,
 *   has("debug")
 * )
 * // true
 * 
 * // Partial application for validation
 * const hasUserId = has("userId")
 * const hasToken = has("token")
 * 
 * const session1 = new Map([["userId", 123], ["token", "abc"]])
 * const session2 = new Map([["userId", 456]])
 * 
 * hasUserId(session1)  // true
 * hasToken(session1)   // true
 * hasUserId(session2)  // true
 * hasToken(session2)   // false
 * 
 * // Required fields validation
 * const requiredFields = ["name", "email", "password"]
 * const validateForm = (formData: Map<string, any>) =>
 *   requiredFields.every(field => has(field)(formData))
 * 
 * const validForm = new Map([
 *   ["name", "Alice"],
 *   ["email", "alice@example.com"],
 *   ["password", "secret"]
 * ])
 * validateForm(validForm)  // true
 * 
 * const invalidForm = new Map([
 *   ["name", "Bob"],
 *   ["email", "bob@example.com"]
 * ])
 * validateForm(invalidForm)  // false (missing password)
 * 
 * // Feature detection
 * const features = new Map([
 *   ["darkMode", true],
 *   ["notifications", false],
 *   ["offline", true]
 * ])
 * 
 * const isFeatureAvailable = (feature: string) =>
 *   has(feature)(features) && features.get(feature)
 * 
 * isFeatureAvailable("darkMode")      // true
 * isFeatureAvailable("notifications") // false (exists but false)
 * isFeatureAvailable("sync")          // false (doesn't exist)
 * 
 * // Cache checking
 * const cache = new Map([
 *   ["user:1", { name: "Alice", ttl: 3600 }],
 *   ["user:2", { name: "Bob", ttl: 1800 }]
 * ])
 * 
 * const isCached = (key: string) => has(key)(cache)
 * 
 * isCached("user:1")  // true
 * isCached("user:3")  // false
 * 
 * // Symbol keys
 * const sym1 = Symbol("key")
 * const sym2 = Symbol("key")
 * const symMap = new Map([[sym1, "value1"], [sym2, "value2"]])
 * has(sym1)(symMap)              // true
 * has(sym2)(symMap)              // true
 * has(Symbol("key"))(symMap)     // false (different symbol)
 * 
 * // Null and undefined keys
 * const nullable = new Map([
 *   [null, "null value"],
 *   [undefined, "undefined value"],
 *   ["", "empty string"]
 * ])
 * has(null)(nullable)       // true
 * has(undefined)(nullable)  // true
 * has("")(nullable)         // true
 * has(0)(nullable)          // false
 * 
 * // Date keys
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-01-02")
 * const dateMap = new Map([
 *   [date1, "New Year"],
 *   [date2, "Day after"]
 * ])
 * has(date1)(dateMap)                    // true
 * has(new Date("2024-01-01"))(dateMap)   // false (different Date object)
 * 
 * // Conditional operations
 * const settings = new Map([
 *   ["theme", "dark"],
 *   ["fontSize", 14]
 * ])
 * 
 * const getIfExists = <K, V>(key: K) => (map: Map<K, V>) =>
 *   has(key)(map) ? map.get(key) : null
 * 
 * getIfExists("theme")(settings)     // "dark"
 * getIfExists("language")(settings)  // null
 * 
 * // Building filters
 * const filterByKeys = <K, V>(keys: Array<K>) => (map: Map<K, V>) =>
 *   new Map([...map].filter(([k]) => keys.some(key => has(key)(new Map([[k, true]])))))
 * 
 * const data = new Map([["a", 1], ["b", 2], ["c", 3], ["d", 4]])
 * const subset = filterByKeys(["a", "c", "e"])(data)
 * // Map { "a" => 1, "c" => 3 }
 * 
 * // Permission checking
 * const permissions = new Map([
 *   ["read", true],
 *   ["write", false],
 *   ["delete", false]
 * ])
 * 
 * const canPerform = (action: string) =>
 *   has(action)(permissions) && permissions.get(action) === true
 * 
 * canPerform("read")    // true
 * canPerform("write")   // false (exists but false)
 * canPerform("execute") // false (doesn't exist)
 * 
 * // Environment variable checking
 * const env = new Map([
 *   ["NODE_ENV", "production"],
 *   ["PORT", "3000"],
 *   ["DEBUG", ""]
 * ])
 * 
 * const hasEnvVar = (name: string) => has(name)(env)
 * const isProduction = hasEnvVar("NODE_ENV") && env.get("NODE_ENV") === "production"
 * // true
 * 
 * // Set operations
 * const set1 = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const set2 = new Map([["b", 20], ["c", 30], ["d", 40]])
 * 
 * const inBoth = [...set1.keys()].filter(k => has(k)(set2))
 * // ["b", "c"]
 * 
 * // Dictionary/lookup pattern
 * const dictionary = new Map([
 *   ["cat", "feline"],
 *   ["dog", "canine"],
 *   ["bird", "avian"]
 * ])
 * 
 * const isDefined = (word: string) => has(word)(dictionary)
 * 
 * isDefined("cat")   // true
 * isDefined("fish")  // false
 * 
 * // Lazy evaluation helper
 * const getOrCompute = <K, V>(key: K, compute: () => V) => (map: Map<K, V>) =>
 *   has(key)(map) ? map.get(key)! : compute()
 * 
 * const expensive = new Map([["cached", "result"]])
 * getOrCompute("cached", () => {
 *   console.log("Computing...")
 *   return "computed"
 * })(expensive)
 * // "result" (doesn't compute)
 * 
 * getOrCompute("missing", () => {
 *   console.log("Computing...")
 *   return "computed"
 * })(expensive)
 * // "computed" (computes)
 * 
 * // Chaining checks
 * const hasAll = <K>(keys: Array<K>) => (map: Map<K, any>) =>
 *   keys.every(key => has(key)(map))
 * 
 * const hasAny = <K>(keys: Array<K>) => (map: Map<K, any>) =>
 *   keys.some(key => has(key)(map))
 * 
 * const data = new Map([["a", 1], ["b", 2], ["c", 3]])
 * hasAll(["a", "b"])(data)      // true
 * hasAll(["a", "d"])(data)      // false
 * hasAny(["d", "e", "a"])(data) // true
 * hasAny(["d", "e", "f"])(data) // false
 * 
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2]])
 * const exists: boolean = has<string, number>("a")(typed)
 * // true
 * 
 * // Performance note
 * const large = new Map(
 *   Array.from({ length: 10000 }, (_, i) => [`key${i}`, i])
 * )
 * has("key5000")(large)  // O(1) lookup
 * // true
 * has("missing")(large)  // O(1) lookup
 * // false
 * ```
 * @property Pure - Doesn't modify the Map
 * @property Curried - Allows partial application
 * @property Fast - O(1) complexity for key lookup
 */
const has = <K, V>(key: K) =>
	(map: Map<K, V>): boolean => {
		return map.has(key)
	}

export default has