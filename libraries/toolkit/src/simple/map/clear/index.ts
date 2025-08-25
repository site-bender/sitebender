/**
 * Creates a new empty Map
 *
 * Returns a new empty Map instance. This is useful for clearing a Map
 * while maintaining immutability, or for creating a fresh Map in a
 * functional pipeline. The function is pure and always returns a new
 * Map instance.
 *
 * @returns A new empty Map
 * @example
 * ```typescript
 * // Basic usage
 * clear()
 * // Map {}
 *
 * // Clearing an existing Map immutably
 * const original = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const cleared = clear()
 * // original is unchanged: Map { "a" => 1, "b" => 2, "c" => 3 }
 * // cleared is new empty: Map {}
 *
 * // Use in functional pipeline
 * import { pipe } from "../../combinator/pipe/index.ts"
 *
 * const processMap = (map: Map<string, number>) =>
 *   map.size > 10 ? clear() : map
 *
 * const small = new Map([["x", 1], ["y", 2]])
 * processMap(small)
 * // Map { "x" => 1, "y" => 2 }
 *
 * const large = new Map(Array.from({ length: 15 }, (_, i) => [String(i), i]))
 * processMap(large)
 * // Map {}
 *
 * // Reset state
 * let cache = new Map([["user:1", { name: "Alice" }]])
 * cache = clear()
 * // cache is now Map {}
 *
 * // Type-safe empty Maps
 * const emptyNumbers: Map<string, number> = clear()
 * const emptyUsers: Map<number, { name: string }> = clear()
 *
 * // Use with conditional logic
 * const resetIfError = (map: Map<string, any>, hasError: boolean) =>
 *   hasError ? clear() : map
 *
 * const data = new Map([["status", "ok"], ["count", 5]])
 * resetIfError(data, false)
 * // Map { "status" => "ok", "count" => 5 }
 * resetIfError(data, true)
 * // Map {}
 *
 * // Chain with other operations
 * const initializeMap = () => {
 *   const map = clear()
 *   map.set("initialized", true)
 *   map.set("timestamp", Date.now())
 *   return map
 * }
 *
 * // Create multiple independent Maps
 * const maps = Array.from({ length: 3 }, () => clear())
 * maps[0].set("a", 1)
 * maps[1].set("b", 2)
 * // Each Map is independent
 *
 * // Use as default/fallback
 * const getMap = (data: Map<string, any> | null) =>
 *   data ?? clear()
 *
 * getMap(null)
 * // Map {}
 * getMap(new Map([["x", 10]]))
 * // Map { "x" => 10 }
 *
 * // Reset between iterations
 * const results = []
 * for (const batch of batches) {
 *   let temp = clear()
 *   for (const item of batch) {
 *     temp.set(item.id, item)
 *   }
 *   results.push(temp)
 * }
 *
 * // Factory pattern
 * const createEmptyCache = () => clear()
 * const cache1 = createEmptyCache()
 * const cache2 = createEmptyCache()
 * // cache1 !== cache2 (different instances)
 *
 * // Type inference
 * const inferredMap = clear()
 * inferredMap.set("key", "value")
 * // TypeScript infers Map<string, string>
 *
 * // Comparison with constructor
 * clear()          // More functional, explicit intent
 * new Map()        // Traditional approach
 * // Both create Map {}
 *
 * // Memory efficiency - creates new instance
 * const maps = Array.from({ length: 1000 }, () => clear())
 * // Creates 1000 independent empty Maps
 *
 * // Use in reducers
 * const reducer = (state: Map<string, any>, action: { type: string }) => {
 *   switch (action.type) {
 *     case "RESET":
 *       return clear()
 *     default:
 *       return state
 *   }
 * }
 *
 * // Immutable clear operation
 * const immutableClear = <K, V>(map: Map<K, V>): Map<K, V> =>
 *   clear()
 *
 * const original = new Map([["a", 1], ["b", 2]])
 * const cleared = immutableClear(original)
 * // original: Map { "a" => 1, "b" => 2 }
 * // cleared: Map {}
 * ```
 * @property Pure - Always returns a new empty Map
 * @property Immutable - Does not modify any existing Map
 * @property Type-safe - Works with any key/value types
 */
const clear = <K = any, V = any>(): Map<K, V> => {
	return new Map<K, V>()
}

export default clear
