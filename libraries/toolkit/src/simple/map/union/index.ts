/**
 * Combines multiple Maps (alias for merge)
 *
 * Creates a new Map containing all entries from the provided Maps.
 * When keys appear in multiple Maps, values from later Maps override
 * those from earlier ones. This is an alias for the merge function,
 * providing a more familiar name for set union operations. Follows
 * left-to-right precedence for consistent, predictable results.
 *
 * @curried (...maps) => result
 * @param maps - Maps to combine
 * @returns A new Map containing all entries
 * @example
 * ```typescript
 * // Basic union of two Maps
 * const map1 = new Map([
 *   ["a", 1],
 *   ["b", 2]
 * ])
 * const map2 = new Map([
 *   ["c", 3],
 *   ["d", 4]
 * ])
 * union(map1, map2)
 * // Map { "a" => 1, "b" => 2, "c" => 3, "d" => 4 }
 *
 * // Union with overlapping keys (later wins)
 * const first = new Map([
 *   ["x", 10],
 *   ["y", 20]
 * ])
 * const second = new Map([
 *   ["y", 200],
 *   ["z", 300]
 * ])
 * union(first, second)
 * // Map { "x" => 10, "y" => 200, "z" => 300 }
 *
 * // Multiple Maps
 * const m1 = new Map([["a", 1]])
 * const m2 = new Map([["b", 2]])
 * const m3 = new Map([["c", 3]])
 * union(m1, m2, m3)
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 *
 * // Empty Maps
 * union(new Map(), new Map())
 * // Map {}
 *
 * // Single Map
 * union(new Map([["key", "value"]]))
 * // Map { "key" => "value" }
 *
 * // No arguments
 * union()
 * // Map {}
 *
 * // Configuration merging
 * const defaults = new Map([
 *   ["host", "localhost"],
 *   ["port", 3000],
 *   ["debug", false]
 * ])
 * const environment = new Map([
 *   ["host", "production.example.com"],
 *   ["ssl", true]
 * ])
 * const userOverrides = new Map([
 *   ["port", 8080],
 *   ["debug", true]
 * ])
 * union(defaults, environment, userOverrides)
 * // Map { "host" => "production.example.com", "port" => 8080, "debug" => true, "ssl" => true }
 *
 * // User permissions union
 * const basePerms = new Map([
 *   ["read", true],
 *   ["write", false]
 * ])
 * const rolePerms = new Map([
 *   ["write", true],
 *   ["delete", false]
 * ])
 * const specialPerms = new Map([
 *   ["admin", true]
 * ])
 * union(basePerms, rolePerms, specialPerms)
 * // Map { "read" => true, "write" => true, "delete" => false, "admin" => true }
 *
 * // Data aggregation
 * const dataset1 = new Map([
 *   ["2024-01", 100],
 *   ["2024-02", 200]
 * ])
 * const dataset2 = new Map([
 *   ["2024-02", 250],
 *   ["2024-03", 300]
 * ])
 * const dataset3 = new Map([
 *   ["2024-03", 350],
 *   ["2024-04", 400]
 * ])
 * union(dataset1, dataset2, dataset3)
 * // Map { "2024-01" => 100, "2024-02" => 250, "2024-03" => 350, "2024-04" => 400 }
 *
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { filter } from "../filter/index.ts"
 *
 * const active = new Map([["user1", true], ["user2", true]])
 * const inactive = new Map([["user3", false], ["user4", false]])
 * const pending = new Map([["user5", null]])
 *
 * pipe(
 *   union(active, inactive, pending),
 *   filter((status: any) => status !== null)
 * )
 * // Map without null values
 *
 * // Building incrementally
 * const headers = [
 *   new Map([["Content-Type", "application/json"]]),
 *   new Map([["Accept", "application/json"]]),
 *   new Map([["Authorization", "Bearer token"]])
 * ]
 * union(...headers)
 * // Map with all headers
 *
 * // Object-like usage
 * const obj1 = new Map(Object.entries({ a: 1, b: 2 }))
 * const obj2 = new Map(Object.entries({ b: 20, c: 30 }))
 * union(obj1, obj2)
 * // Map { "a" => 1, "b" => 20, "c" => 30 }
 *
 * // Numeric keys
 * const nums1 = new Map([[1, "one"], [2, "two"]])
 * const nums2 = new Map([[3, "three"], [4, "four"]])
 * union(nums1, nums2)
 * // Map { 1 => "one", 2 => "two", 3 => "three", 4 => "four" }
 *
 * // Date keys
 * const events1 = new Map([
 *   [new Date("2024-01-01"), "New Year"],
 *   [new Date("2024-07-04"), "Independence Day"]
 * ])
 * const events2 = new Map([
 *   [new Date("2024-12-25"), "Christmas"]
 * ])
 * union(events1, events2)
 * // Map with all dates
 *
 * // Partial application pattern
 * const withDefaults = (defaults: Map<string, any>) =>
 *   (...overrides: Array<Map<string, any>>) =>
 *     union(defaults, ...overrides)
 *
 * const defaultSettings = new Map([
 *   ["theme", "light"],
 *   ["fontSize", 14],
 *   ["autoSave", true]
 * ])
 *
 * const applyUserSettings = withDefaults(defaultSettings)
 *
 * applyUserSettings(
 *   new Map([["theme", "dark"]]),
 *   new Map([["fontSize", 16]])
 * )
 * // Map { "theme" => "dark", "fontSize" => 16, "autoSave" => true }
 *
 * // Cache layers
 * const l1Cache = new Map([["key1", "fast"]])
 * const l2Cache = new Map([["key1", "medium"], ["key2", "medium"]])
 * const l3Cache = new Map([["key1", "slow"], ["key2", "slow"], ["key3", "slow"]])
 *
 * // Priority: L1 > L2 > L3
 * union(l3Cache, l2Cache, l1Cache)
 * // Map { "key1" => "fast", "key2" => "medium", "key3" => "slow" }
 *
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const symMap1 = new Map([[sym1, 1]])
 * const symMap2 = new Map([[sym2, 2]])
 * union(symMap1, symMap2)
 * // Map { Symbol(a) => 1, Symbol(b) => 2 }
 *
 * // Feature flags union
 * const coreFeatures = new Map([
 *   ["login", true],
 *   ["signup", true]
 * ])
 * const betaFeatures = new Map([
 *   ["newUI", false],
 *   ["analytics", true]
 * ])
 * const experimentalFeatures = new Map([
 *   ["aiAssist", false]
 * ])
 * union(coreFeatures, betaFeatures, experimentalFeatures)
 * // Map with all features
 *
 * // Response headers union
 * const commonHeaders = new Map([
 *   ["X-Powered-By", "Node.js"],
 *   ["Server", "Express"]
 * ])
 * const securityHeaders = new Map([
 *   ["X-Frame-Options", "DENY"],
 *   ["X-Content-Type-Options", "nosniff"]
 * ])
 * const customHeaders = new Map([
 *   ["X-Request-ID", "abc123"]
 * ])
 * union(commonHeaders, securityHeaders, customHeaders)
 * // Map with all response headers
 *
 * // Spreading Maps
 * const spread = (...maps: Array<Map<string, number>>) => {
 *   const total = new Map<string, number>()
 *   for (const [key, value] of union(...maps)) {
 *     total.set(key, value)
 *   }
 *   return total
 * }
 *
 * // Reducer pattern
 * const maps = [
 *   new Map([["a", 1]]),
 *   new Map([["b", 2]]),
 *   new Map([["c", 3]])
 * ]
 * const combined = maps.reduce(
 *   (acc, curr) => union(acc, curr),
 *   new Map()
 * )
 * // Map { "a" => 1, "b" => 2, "c" => 3 }
 *
 * // Conditional union
 * const conditionalUnion = <K, V>(
 *   condition: boolean,
 *   map1: Map<K, V>,
 *   map2: Map<K, V>
 * ) => condition ? union(map1, map2) : map1
 *
 * const base = new Map([["a", 1]])
 * const extra = new Map([["b", 2]])
 * conditionalUnion(true, base, extra)  // Includes extra
 * conditionalUnion(false, base, extra) // Only base
 *
 * // Priority union (first non-null wins)
 * const priorityUnion = <K, V>(...maps: Array<Map<K, V | null>>) => {
 *   const result = new Map<K, V>()
 *   for (const map of maps) {
 *     for (const [key, value] of map) {
 *       if (value !== null && !result.has(key)) {
 *         result.set(key, value as V)
 *       }
 *     }
 *   }
 *   return result
 * }
 *
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1]])
 * const typed2 = new Map<string, number>([["b", 2]])
 * const result: Map<string, number> = union(typed1, typed2)
 * // Map<string, number> { "a" => 1, "b" => 2 }
 *
 * // Use in state management
 * type State = Map<string, any>
 * type Action =
 *   | { type: "MERGE_STATE"; payload: Map<string, any> }
 *   | { type: "OTHER" }
 *
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "MERGE_STATE":
 *       return union(state, action.payload)
 *     default:
 *       return state
 *   }
 * }
 *
 * // Validation that it's an alias for merge
 * import { merge } from "../merge/index.ts"
 * const test1 = new Map([["x", 1]])
 * const test2 = new Map([["y", 2]])
 *
 * const viaUnion = union(test1, test2)
 * const viaMerge = merge(test1, test2)
 * // Both produce identical results
 * ```
 * @property Pure - Creates new Map, doesn't modify originals
 * @property Left-to-right - Later Maps override earlier ones
 * @property Variadic - Accepts any number of Maps
 * @property Alias - Same behavior as merge function
 */
import merge from "../merge/index.ts"

const union = merge

export default union
