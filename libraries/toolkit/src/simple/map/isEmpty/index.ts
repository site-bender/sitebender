/**
 * Checks if a Map is empty
 *
 * Tests whether a Map has any entries. Returns true if the Map has no
 * key-value pairs, false otherwise. This is more semantic than checking
 * size === 0 and consistent with isEmpty functions for other data types.
 *
 * @param map - The Map to check
 * @returns True if the Map is empty, false otherwise
 * @example
 * ```typescript
 * // Basic usage
 * isEmpty(new Map())
 * // true
 *
 * isEmpty(new Map([["a", 1]]))
 * // false
 *
 * // Multiple entries
 * isEmpty(new Map([["a", 1], ["b", 2], ["c", 3]]))
 * // false
 *
 * // After clearing
 * const map = new Map([["x", 10], ["y", 20]])
 * map.clear()
 * isEmpty(map)
 * // true
 *
 * // After deleting all entries
 * const map = new Map([["a", 1], ["b", 2]])
 * map.delete("a")
 * map.delete("b")
 * isEmpty(map)
 * // true
 *
 * // Different value types don't matter
 * isEmpty(new Map([["key", null]]))
 * // false
 *
 * isEmpty(new Map([["key", undefined]]))
 * // false
 *
 * isEmpty(new Map([[null, "value"]]))
 * // false
 *
 * isEmpty(new Map([[undefined, "value"]]))
 * // false
 *
 * // Conditional operations
 * const cache = new Map()
 *
 * if (isEmpty(cache)) {
 *   console.log("Cache is empty, populating...")
 *   cache.set("data", fetchData())
 * }
 *
 * // Guard clause pattern
 * const processMap = (map: Map<string, any>) => {
 *   if (isEmpty(map)) {
 *     return "No data to process"
 *   }
 *   // Process the map...
 *   return `Processing ${map.size} entries`
 * }
 *
 * processMap(new Map())
 * // "No data to process"
 *
 * processMap(new Map([["a", 1]]))
 * // "Processing 1 entries"
 *
 * // Validation helper
 * const validateConfig = (config: Map<string, any>) => {
 *   if (isEmpty(config)) {
 *     throw new Error("Configuration cannot be empty")
 *   }
 *   return true
 * }
 *
 * // Default values
 * const getMapOrDefault = <K, V>(
 *   map: Map<K, V>,
 *   defaultMap: Map<K, V>
 * ): Map<K, V> => {
 *   return isEmpty(map) ? defaultMap : map
 * }
 *
 * const userPrefs = new Map()
 * const defaults = new Map([["theme", "light"], ["lang", "en"]])
 * getMapOrDefault(userPrefs, defaults)
 * // Map { "theme" => "light", "lang" => "en" }
 *
 * // Filtering empty Maps from array
 * const maps = [
 *   new Map([["a", 1]]),
 *   new Map(),
 *   new Map([["b", 2]]),
 *   new Map(),
 *   new Map([["c", 3]])
 * ]
 * const nonEmpty = maps.filter(m => !isEmpty(m))
 * // [Map{"a"=>1}, Map{"b"=>2}, Map{"c"=>3}]
 *
 * // Cache management
 * class Cache<K, V> {
 *   private store = new Map<K, V>()
 *
 *   hasData(): boolean {
 *     return !isEmpty(this.store)
 *   }
 *
 *   clear(): void {
 *     if (!isEmpty(this.store)) {
 *       console.log(`Clearing ${this.store.size} entries`)
 *       this.store.clear()
 *     }
 *   }
 * }
 *
 * // State management
 * const state = {
 *   users: new Map(),
 *   posts: new Map([["post1", { title: "Hello" }]]),
 *   comments: new Map()
 * }
 *
 * const hasContent = Object.entries(state)
 *   .some(([_, map]) => !isEmpty(map))
 * // true (posts has content)
 *
 * // Lazy initialization
 * let lazyMap: Map<string, any> | null = null
 *
 * const getMap = () => {
 *   if (!lazyMap || isEmpty(lazyMap)) {
 *     lazyMap = new Map([
 *       ["initialized", true],
 *       ["timestamp", Date.now()]
 *     ])
 *   }
 *   return lazyMap
 * }
 *
 * // Aggregation check
 * const results = [
 *   new Map([["error", "Failed"]]),
 *   new Map(),
 *   new Map([["success", "OK"]])
 * ]
 *
 * const hasErrors = results.some(r =>
 *   !isEmpty(r) && r.has("error")
 * )
 * // true
 *
 * // Pipeline with empty check
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { filter } from "../filter/index.ts"
 *
 * const process = (map: Map<string, number>) => {
 *   if (isEmpty(map)) {
 *     return new Map([["status", -1]])
 *   }
 *
 *   return pipe(
 *     map,
 *     filter((v: number) => v > 0)
 *   )
 * }
 *
 * process(new Map())
 * // Map { "status" => -1 }
 *
 * process(new Map([["a", 5], ["b", -2]]))
 * // Map { "a" => 5 }
 *
 * // Combining with other checks
 * const isValid = <K, V>(map: Map<K, V>) =>
 *   !isEmpty(map) && map.size <= 100
 *
 * isValid(new Map())                    // false (empty)
 * isValid(new Map([["a", 1]]))         // true
 * // isValid(new Map with 101 entries) // false (too large)
 *
 * // Batch operations
 * const batches = [
 *   new Map([["batch1", "data"]]),
 *   new Map(),
 *   new Map([["batch3", "data"]])
 * ]
 *
 * const processBatches = () => {
 *   const validBatches = batches.filter(b => !isEmpty(b))
 *   console.log(`Processing ${validBatches.length} non-empty batches`)
 *   return validBatches
 * }
 *
 * // Different Map types
 * const stringMap = new Map<string, string>()
 * const numberMap = new Map<number, number>()
 * const mixedMap = new Map<any, any>()
 *
 * isEmpty(stringMap)  // true
 * isEmpty(numberMap)  // true
 * isEmpty(mixedMap)   // true
 *
 * // Symbol keys
 * const sym = Symbol("key")
 * isEmpty(new Map([[sym, "value"]]))
 * // false
 *
 * // Object keys
 * const obj = { id: 1 }
 * isEmpty(new Map([[obj, "value"]]))
 * // false
 *
 * // Date keys
 * isEmpty(new Map([[new Date(), "today"]]))
 * // false
 *
 * // Early return pattern
 * const findInMaps = (maps: Array<Map<string, any>>, key: string) => {
 *   for (const map of maps) {
 *     if (isEmpty(map)) continue
 *
 *     if (map.has(key)) {
 *       return map.get(key)
 *     }
 *   }
 *   return null
 * }
 *
 * findInMaps([
 *   new Map(),
 *   new Map([["a", 1]]),
 *   new Map([["b", 2]])
 * ], "b")
 * // 2
 *
 * // Assertion helper
 * const assertNotEmpty = <K, V>(map: Map<K, V>, message?: string) => {
 *   if (isEmpty(map)) {
 *     throw new Error(message || "Map cannot be empty")
 *   }
 * }
 *
 * // Optional chaining replacement
 * const getFirstValue = <K, V>(map: Map<K, V> | null | undefined): V | null => {
 *   if (!map || isEmpty(map)) {
 *     return null
 *   }
 *   return map.values().next().value
 * }
 *
 * getFirstValue(null)                        // null
 * getFirstValue(new Map())                   // null
 * getFirstValue(new Map([["a", "first"]]))  // "first"
 *
 * // Type narrowing
 * const processIfNotEmpty = <K, V>(map: Map<K, V>) => {
 *   if (!isEmpty(map)) {
 *     // TypeScript knows map has at least one entry here
 *     const firstKey = map.keys().next().value
 *     return `First key: ${firstKey}`
 *   }
 *   return "Map is empty"
 * }
 *
 * // Performance note
 * const hugeMap = new Map() // Imagine millions of entries
 * isEmpty(hugeMap)  // O(1) - just checks size property
 * // true (or false if populated)
 * ```
 * @property Pure - Doesn't modify the Map
 * @property Fast - O(1) complexity
 * @property Type-safe - Works with any Map type
 */
const isEmpty = <K, V>(map: Map<K, V>): boolean => {
	return map.size === 0
}

export default isEmpty
