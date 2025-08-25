/**
 * Returns the size of a Map
 *
 * Gets the number of key-value pairs in a Map. This is a simple accessor
 * function that returns the Map's size property. Useful in functional
 * pipelines where you need the size as a value for further processing,
 * conditionals, or aggregations.
 *
 * @curried (map) => size
 * @param map - The Map to get the size of
 * @returns The number of entries in the Map
 * @example
 * ```typescript
 * // Basic usage
 * const scores = new Map([
 *   ["Alice", 85],
 *   ["Bob", 92],
 *   ["Charlie", 78]
 * ])
 * size(scores)
 * // 3
 *
 * // Empty Map
 * size(new Map())
 * // 0
 *
 * // Single entry
 * size(new Map([["key", "value"]]))
 * // 1
 *
 * // After operations
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { set } from "../set/index.ts"
 * import { delete as deleteKey } from "../delete/index.ts"
 *
 * const initial = new Map([["a", 1], ["b", 2]])
 * pipe(
 *   initial,
 *   set("c")(3),
 *   size
 * )
 * // 3
 *
 * pipe(
 *   initial,
 *   deleteKey("a"),
 *   size
 * )
 * // 1
 *
 * // Conditional logic based on size
 * const isEmpty = <K, V>(map: Map<K, V>): boolean => size(map) === 0
 * const hasMultiple = <K, V>(map: Map<K, V>): boolean => size(map) > 1
 * const isSingleton = <K, V>(map: Map<K, V>): boolean => size(map) === 1
 *
 * const data = new Map([["x", 10], ["y", 20]])
 * isEmpty(data)      // false
 * hasMultiple(data)  // true
 * isSingleton(data)  // false
 *
 * // Size after filtering
 * import { filter } from "../filter/index.ts"
 *
 * const numbers = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3],
 *   ["d", 4],
 *   ["e", 5]
 * ])
 *
 * pipe(
 *   numbers,
 *   filter((n: number) => n > 2),
 *   size
 * )
 * // 3
 *
 * // Comparing Map sizes
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["x", 10], ["y", 20], ["z", 30]])
 *
 * const larger = size(map1) > size(map2) ? map1 : map2
 * // map2 (has 3 entries vs 2)
 *
 * // Size tracking during operations
 * const trackSize = <K, V>(label: string) => (map: Map<K, V>) => {
 *   console.log(`${label}: ${size(map)} entries`)
 *   return map
 * }
 *
 * pipe(
 *   new Map([["a", 1]]),
 *   trackSize("Initial"),
 *   set("b")(2),
 *   trackSize("After add"),
 *   set("c")(3),
 *   trackSize("Final")
 * )
 * // Logs: Initial: 1 entries, After add: 2 entries, Final: 3 entries
 *
 * // Batch processing based on size
 * const processBatch = <K, V>(map: Map<K, V>) => {
 *   const batchSize = size(map)
 *   if (batchSize === 0) return "No data"
 *   if (batchSize < 10) return "Small batch"
 *   if (batchSize < 100) return "Medium batch"
 *   return "Large batch"
 * }
 *
 * processBatch(new Map())                          // "No data"
 * processBatch(new Map([["a", 1], ["b", 2]]))     // "Small batch"
 * processBatch(new Map(Array.from({length: 50}, (_, i) => [i, i]))) // "Medium batch"
 *
 * // Size after merge
 * import { merge } from "../merge/index.ts"
 *
 * const base = new Map([["a", 1], ["b", 2]])
 * const additions = new Map([["c", 3], ["d", 4]])
 * pipe(
 *   merge(base, additions),
 *   size
 * )
 * // 4
 *
 * // Size with duplicates (overwrites don't increase size)
 * const original = new Map([["key", "value1"]])
 * pipe(
 *   original,
 *   set("key")("value2"),
 *   size
 * )
 * // 1 (same size, value was overwritten)
 *
 * // Pagination calculations
 * const paginate = <K, V>(pageSize: number) => (map: Map<K, V>) => {
 *   const total = size(map)
 *   const pages = Math.ceil(total / pageSize)
 *   return { total, pages, pageSize }
 * }
 *
 * const items = new Map(Array.from({length: 45}, (_, i) => [`item${i}`, i]))
 * paginate(10)(items)
 * // { total: 45, pages: 5, pageSize: 10 }
 *
 * // Size validation
 * const validateSize = (min: number, max: number) => <K, V>(map: Map<K, V>) => {
 *   const s = size(map)
 *   return s >= min && s <= max
 * }
 *
 * const isValidSmall = validateSize(1, 5)
 * const isValidMedium = validateSize(10, 50)
 *
 * const small = new Map([["a", 1], ["b", 2]])
 * isValidSmall(small)   // true
 * isValidMedium(small)  // false
 *
 * // Statistical calculations
 * const stats = new Map([
 *   ["min", 10],
 *   ["max", 90],
 *   ["mean", 50],
 *   ["median", 45],
 *   ["mode", 40]
 * ])
 * const statCount = size(stats)
 * // 5 statistics available
 *
 * // Dynamic threshold based on size
 * const shouldOptimize = <K, V>(map: Map<K, V>): boolean => {
 *   const threshold = 1000
 *   return size(map) > threshold
 * }
 *
 * // Size after partition
 * import { partition } from "../partition/index.ts"
 *
 * const mixed = new Map([
 *   ["a", 1],
 *   ["b", -2],
 *   ["c", 3],
 *   ["d", -4],
 *   ["e", 5]
 * ])
 * const [positive, negative] = partition((n: number) => n > 0)(mixed)
 * console.log(`Positive: ${size(positive)}, Negative: ${size(negative)}`)
 * // Positive: 3, Negative: 2
 *
 * // Capacity checking
 * const hasCapacity = (maxSize: number) => <K, V>(map: Map<K, V>) =>
 *   size(map) < maxSize
 *
 * const cache = new Map([["key1", "data1"], ["key2", "data2"]])
 * const canAddMore = hasCapacity(5)
 * canAddMore(cache) // true (2 < 5)
 *
 * // Progress tracking
 * const progress = <K, V>(processed: Map<K, V>, total: number) => {
 *   const done = size(processed)
 *   const percentage = (done / total) * 100
 *   return { done, total, percentage: percentage.toFixed(1) }
 * }
 *
 * const completed = new Map([["task1", "done"], ["task2", "done"]])
 * progress(completed, 5)
 * // { done: 2, total: 5, percentage: "40.0" }
 *
 * // Size comparison for equality check
 * const sameSizeAs = <K, V>(map1: Map<K, V>) => (map2: Map<K, V>) =>
 *   size(map1) === size(map2)
 *
 * const a = new Map([["x", 1], ["y", 2]])
 * const b = new Map([["a", 10], ["b", 20]])
 * const c = new Map([["i", 100]])
 *
 * sameSizeAs(a)(b) // true (both size 2)
 * sameSizeAs(a)(c) // false (2 vs 1)
 *
 * // Memory estimation
 * const estimateMemory = <K, V>(map: Map<K, V>, bytesPerEntry: number = 50) => {
 *   const entries = size(map)
 *   const bytes = entries * bytesPerEntry
 *   const kb = bytes / 1024
 *   const mb = kb / 1024
 *   return { entries, bytes, kb: kb.toFixed(2), mb: mb.toFixed(2) }
 * }
 *
 * const largeMap = new Map(Array.from({length: 10000}, (_, i) => [i, i]))
 * estimateMemory(largeMap)
 * // { entries: 10000, bytes: 500000, kb: "488.28", mb: "0.48" }
 *
 * // Type safety
 * const typed = new Map<string, number>([["a", 1], ["b", 2]])
 * const count: number = size(typed)
 * // 2
 *
 * // Use in reducer
 * type State = Map<string, any>
 * type Action = { type: "GET_SIZE" }
 *
 * const reducer = (state: State, action: Action) => {
 *   switch (action.type) {
 *     case "GET_SIZE":
 *       return size(state)
 *     default:
 *       return state
 *   }
 * }
 *
 * // Chaining with other operations
 * const process = <K, V>(map: Map<K, V>) => ({
 *   originalSize: size(map),
 *   filtered: pipe(
 *     map,
 *     filter((v: any) => v != null),
 *     size
 *   ),
 *   isEmpty: size(map) === 0,
 *   isSingle: size(map) === 1,
 *   hasMany: size(map) > 1
 * })
 * ```
 * @property Pure - No side effects
 * @property Simple - Direct property access
 * @property Composable - Works well in pipelines
 */
const size = <K, V>(map: Map<K, V>): number => {
	return map.size
}

export default size
