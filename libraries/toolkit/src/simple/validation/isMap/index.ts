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
 * isMap(new Map([[objKey, "value"]]))  // true
 * isMap(new Map([[Symbol("key"), "value"]])) // true
 *
 * // Not Maps
 * isMap(new WeakMap())                 // false (WeakMap)
 * isMap(new Set())                     // false (Set)
 * isMap({})                            // false (plain object)
 * isMap([])                            // false (array)
 * isMap(null)                          // false
 *
 * // Type narrowing
 * function getMapSize(value: unknown): number {
 *   if (isMap(value)) {
 *     return value.size  // TypeScript knows it's a Map
 *   }
 *   return 0
 * }
 *
 * // Filter Maps from mixed collections
 * const items = [new Map(), new Set(), {}, []]
 * const maps = items.filter(isMap)  // [Map {}]
 *
 * // Safe Map operations
 * function safeGet<K, V>(value: unknown, key: K): V | undefined {
 *   return isMap(value) ? value.get(key) as V : undefined
 * }
 *
 * // Convert object to Map if needed
 * function toMap(value: unknown): Map<unknown, unknown> {
 *   if (isMap(value)) return value
 *   if (value && typeof value === "object") {
 *     return new Map(Object.entries(value))
 *   }
 *   return new Map()
 * }
 * ```
 * @pure
 * @predicate
 * @safe
 */
const isMap = (value: unknown): value is Map<unknown, unknown> =>
	value instanceof Map

export default isMap
