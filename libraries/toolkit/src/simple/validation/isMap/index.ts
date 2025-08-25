/**
 * Type guard that checks if a value is a Map object
 *
 * Determines whether a value is an instance of the Map constructor. Maps are
 * collections of key-value pairs where keys can be any type (including objects),
 * unlike plain objects which only support string/symbol keys. This function uses
 * instanceof checking and provides TypeScript type narrowing to Map<unknown, unknown>.
 *
 * Map detection:
 * - Map instances: created with new Map()
 * - Includes Maps created from entries: new Map([...])
 * - Works with Maps of any key/value types
 * - Not included: WeakMaps (use isWeakMap)
 * - Not included: plain objects or other collections
 * - Cross-realm: may fail for Maps from different contexts
 *
 * @param value - The value to check
 * @returns True if the value is a Map, false otherwise
 * @example
 * ```typescript
 * // Map instances
 * isMap(new Map())                     // true
 * isMap(new Map([["key", "value"]]))   // true
 * isMap(new Map([[1, "one"], [2, "two"]])) // true
 *
 * // Maps with various key types
 * const objKey = { id: 1 }
 * const mapWithObjKey = new Map([[objKey, "value"]])
 * isMap(mapWithObjKey)                 // true
 *
 * const symbolMap = new Map([[Symbol("key"), "value"]])
 * isMap(symbolMap)                     // true
 *
 * // Not Maps
 * isMap(new WeakMap())                 // false (WeakMap)
 * isMap(new Set())                     // false (Set)
 * isMap({})                           // false (plain object)
 * isMap(Object.create(null))          // false
 * isMap([])                           // false (array)
 * isMap(null)                         // false
 * isMap(undefined)                    // false
 * isMap("Map")                        // false
 *
 * // Map-like objects are not Maps
 * isMap({
 *   set: () => {},
 *   get: () => {},
 *   has: () => false,
 *   size: 0
 * })                                  // false
 *
 * // Type narrowing in TypeScript
 * function getMapSize(value: unknown): number {
 *   if (isMap(value)) {
 *     // TypeScript knows value is Map here
 *     return value.size
 *   }
 *   return 0
 * }
 *
 * getMapSize(new Map([["a", 1]]))     // 1
 * getMapSize(new Set([1, 2, 3]))      // 0
 * getMapSize({})                      // 0
 *
 * // Filtering Maps from mixed collections
 * const collections = [
 *   new Map(),
 *   new Set(),
 *   new WeakMap(),
 *   {},
 *   [],
 *   new Map([["key", "value"]])
 * ]
 *
 * const maps = collections.filter(isMap)
 * // [Map {}, Map { "key" => "value" }]
 *
 * // Cache implementation
 * class Cache {
 *   private storage: unknown
 *
 *   constructor(storage: unknown) {
 *     if (!isMap(storage)) {
 *       this.storage = new Map()
 *     } else {
 *       this.storage = storage
 *     }
 *   }
 *
 *   get(key: unknown): unknown {
 *     if (isMap(this.storage)) {
 *       return this.storage.get(key)
 *     }
 *   }
 * }
 *
 * // Map operations safety
 * function safeMapGet<K, V>(
 *   value: unknown,
 *   key: K
 * ): V | undefined {
 *   if (isMap(value)) {
 *     return value.get(key) as V
 *   }
 *   return undefined
 * }
 *
 * const myMap = new Map([["name", "Alice"]])
 * safeMapGet(myMap, "name")           // "Alice"
 * safeMapGet({}, "name")              // undefined
 *
 * // Converting objects to Maps
 * function toMap(value: unknown): Map<unknown, unknown> {
 *   if (isMap(value)) {
 *     return value
 *   }
 *   if (value && typeof value === "object") {
 *     return new Map(Object.entries(value))
 *   }
 *   return new Map()
 * }
 *
 * toMap(new Map([["a", 1]]))          // Map { "a" => 1 }
 * toMap({ a: 1, b: 2 })               // Map { "a" => 1, "b" => 2 }
 * toMap(null)                         // Map {}
 *
 * // Map merging
 * function mergeMaps(...values: Array<unknown>): Map<unknown, unknown> {
 *   const result = new Map()
 *
 *   for (const value of values) {
 *     if (isMap(value)) {
 *       for (const [key, val] of value) {
 *         result.set(key, val)
 *       }
 *     }
 *   }
 *
 *   return result
 * }
 *
 * mergeMaps(
 *   new Map([["a", 1]]),
 *   new Map([["b", 2]]),
 *   { c: 3 },  // ignored, not a Map
 *   new Map([["a", 10]])  // overwrites "a"
 * )
 * // Map { "a" => 10, "b" => 2 }
 *
 * // Map to array conversion
 * function mapToArray<K, V>(value: unknown): Array<[K, V]> {
 *   if (isMap(value)) {
 *     return Array.from(value) as Array<[K, V]>
 *   }
 *   return []
 * }
 *
 * mapToArray(new Map([[1, "one"], [2, "two"]]))
 * // [[1, "one"], [2, "two"]]
 *
 * // Frequency counter using Map
 * function countFrequencies(items: Array<unknown>): Map<unknown, number> | null {
 *   const freq = new Map<unknown, number>()
 *
 *   for (const item of items) {
 *     freq.set(item, (freq.get(item) || 0) + 1)
 *   }
 *
 *   return isMap(freq) ? freq : null
 * }
 *
 * countFrequencies(["a", "b", "a", "c", "b", "a"])
 * // Map { "a" => 3, "b" => 2, "c" => 1 }
 *
 * // Map key validation
 * function hasMapKey(value: unknown, key: unknown): boolean {
 *   return isMap(value) && value.has(key)
 * }
 *
 * const data = new Map([["id", 123]])
 * hasMapKey(data, "id")               // true
 * hasMapKey(data, "name")             // false
 * hasMapKey({}, "id")                 // false
 *
 * // Map iteration helper
 * function forEachMapEntry<K, V>(
 *   value: unknown,
 *   callback: (value: V, key: K) => void
 * ): void {
 *   if (isMap(value)) {
 *     value.forEach((v, k) => callback(v as V, k as K))
 *   }
 * }
 *
 * forEachMapEntry(
 *   new Map([["a", 1], ["b", 2]]),
 *   (value, key) => console.log(`${key}: ${value}`)
 * )
 * // Logs: "a: 1", "b: 2"
 *
 * // Map cloning
 * function cloneMap(value: unknown): Map<unknown, unknown> | null {
 *   if (isMap(value)) {
 *     return new Map(value)
 *   }
 *   return null
 * }
 *
 * const original = new Map([["key", "value"]])
 * const cloned = cloneMap(original)
 * // cloned is a new Map with same entries
 *
 * // Map vs Object performance comparison setup
 * function createLookup(
 *   entries: Array<[unknown, unknown]>,
 *   useMap: boolean
 * ): unknown {
 *   if (useMap) {
 *     return new Map(entries)
 *   }
 *   return Object.fromEntries(
 *     entries.filter(([k]) => typeof k === "string" || typeof k === "symbol")
 *   )
 * }
 *
 * const lookup = createLookup([["key", "value"]], true)
 * isMap(lookup)                       // true
 *
 * // Redux state normalization
 * interface State {
 *   entities: unknown
 * }
 *
 * function selectEntity(state: State, id: unknown): unknown {
 *   if (isMap(state.entities)) {
 *     return state.entities.get(id)
 *   }
 *   if (state.entities && typeof state.entities === "object") {
 *     return (state.entities as any)[id]
 *   }
 *   return undefined
 * }
 *
 * // GraphQL resolver with Map support
 * function resolveField(source: unknown, field: string): unknown {
 *   if (isMap(source)) {
 *     return source.get(field)
 *   }
 *   if (source && typeof source === "object") {
 *     return (source as any)[field]
 *   }
 *   return undefined
 * }
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to Map<unknown, unknown>
 * @property Instanceof - Uses instanceof Map internally
 * @property Specific - Only returns true for Map, not WeakMap or other collections
 */
const isMap = (value: unknown): value is Map<unknown, unknown> =>
	value instanceof Map

export default isMap
