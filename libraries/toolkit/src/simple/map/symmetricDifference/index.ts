/**
 * Returns keys in either Map but not in both
 * 
 * Computes the symmetric difference of two Maps, returning a new Map
 * containing entries whose keys exist in exactly one of the two Maps.
 * This is the XOR operation for Map keys - entries are included if they
 * exist in the first Map or the second Map, but not in both. Useful for
 * finding unique elements, detecting changes, and set operations.
 * 
 * @curried (map1) => (map2) => result
 * @param map1 - First Map
 * @param map2 - Second Map
 * @returns A new Map with entries from either Map but not both
 * @example
 * ```typescript
 * // Basic symmetric difference
 * const map1 = new Map([
 *   ["a", 1],
 *   ["b", 2],
 *   ["c", 3]
 * ])
 * const map2 = new Map([
 *   ["b", 20],
 *   ["c", 30],
 *   ["d", 40]
 * ])
 * symmetricDifference(map1)(map2)
 * // Map { "a" => 1, "d" => 40 }
 * 
 * // No overlap - all entries included
 * const set1 = new Map([["x", 10], ["y", 20]])
 * const set2 = new Map([["z", 30], ["w", 40]])
 * symmetricDifference(set1)(set2)
 * // Map { "x" => 10, "y" => 20, "z" => 30, "w" => 40 }
 * 
 * // Complete overlap - empty result
 * const identical1 = new Map([["a", 1], ["b", 2]])
 * const identical2 = new Map([["a", 100], ["b", 200]])
 * symmetricDifference(identical1)(identical2)
 * // Map {} (all keys exist in both)
 * 
 * // One empty Map
 * const data = new Map([["a", 1], ["b", 2]])
 * symmetricDifference(data)(new Map())
 * // Map { "a" => 1, "b" => 2 }
 * symmetricDifference(new Map())(data)
 * // Map { "a" => 1, "b" => 2 }
 * 
 * // Both empty Maps
 * symmetricDifference(new Map())(new Map())
 * // Map {}
 * 
 * // Configuration differences
 * const defaultConfig = new Map([
 *   ["host", "localhost"],
 *   ["port", 3000],
 *   ["debug", false]
 * ])
 * const userConfig = new Map([
 *   ["port", 8080],
 *   ["ssl", true],
 *   ["theme", "dark"]
 * ])
 * symmetricDifference(defaultConfig)(userConfig)
 * // Map { "host" => "localhost", "debug" => false, "ssl" => true, "theme" => "dark" }
 * // Shows what's unique to each config
 * 
 * // User permissions comparison
 * const user1Perms = new Map([
 *   ["read", true],
 *   ["write", true],
 *   ["delete", false]
 * ])
 * const user2Perms = new Map([
 *   ["read", true],
 *   ["execute", true],
 *   ["admin", false]
 * ])
 * symmetricDifference(user1Perms)(user2Perms)
 * // Map { "write" => true, "delete" => false, "execute" => true, "admin" => false }
 * // Shows permissions unique to each user
 * 
 * // Inventory differences
 * const warehouse1 = new Map([
 *   ["apple", 100],
 *   ["banana", 50],
 *   ["orange", 75]
 * ])
 * const warehouse2 = new Map([
 *   ["banana", 60],
 *   ["orange", 80],
 *   ["grape", 40]
 * ])
 * symmetricDifference(warehouse1)(warehouse2)
 * // Map { "apple" => 100, "grape" => 40 }
 * // Items unique to each warehouse
 * 
 * // Using with pipe for analysis
 * import { pipe } from "../../combinator/pipe/index.ts"
 * import { size } from "../size/index.ts"
 * 
 * const before = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const after = new Map([["b", 2], ["c", 30], ["d", 4]])
 * 
 * const changes = pipe(
 *   before,
 *   symmetricDifference(after),
 *   diff => ({
 *     uniqueCount: size(diff),
 *     uniqueKeys: Array.from(diff.keys())
 *   })
 * )
 * // { uniqueCount: 2, uniqueKeys: ["a", "d"] }
 * 
 * // Feature flags comparison
 * const prodFlags = new Map([
 *   ["feature1", true],
 *   ["feature2", false],
 *   ["feature3", true]
 * ])
 * const devFlags = new Map([
 *   ["feature2", true],
 *   ["feature3", true],
 *   ["feature4", true]
 * ])
 * symmetricDifference(prodFlags)(devFlags)
 * // Map { "feature1" => true, "feature4" => true }
 * // Features unique to each environment
 * 
 * // Numeric keys
 * const nums1 = new Map([[1, "one"], [2, "two"], [3, "three"]])
 * const nums2 = new Map([[2, "zwei"], [3, "drei"], [4, "vier"]])
 * symmetricDifference(nums1)(nums2)
 * // Map { 1 => "one", 4 => "vier" }
 * 
 * // Date keys
 * const date1 = new Date("2024-01-01")
 * const date2 = new Date("2024-02-01")
 * const date3 = new Date("2024-03-01")
 * 
 * const events1 = new Map([
 *   [date1, "New Year"],
 *   [date2, "February"]
 * ])
 * const events2 = new Map([
 *   [date2, "Feb"],
 *   [date3, "March"]
 * ])
 * symmetricDifference(events1)(events2)
 * // Map { Date("2024-01-01") => "New Year", Date("2024-03-01") => "March" }
 * 
 * // Partial application for reuse
 * const findUniqueToFirst = <K, V>(baseline: Map<K, V>) =>
 *   (comparison: Map<K, V>) => {
 *     const symDiff = symmetricDifference(baseline)(comparison)
 *     const result = new Map<K, V>()
 *     for (const [key, value] of symDiff) {
 *       if (baseline.has(key)) {
 *         result.set(key, value)
 *       }
 *     }
 *     return result
 *   }
 * 
 * const base = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const other = new Map([["b", 20], ["d", 40]])
 * findUniqueToFirst(base)(other)
 * // Map { "a" => 1, "c" => 3 } (only items unique to base)
 * 
 * // Tracking changes over time
 * const snapshot1 = new Map([
 *   ["user1", "online"],
 *   ["user2", "offline"],
 *   ["user3", "online"]
 * ])
 * const snapshot2 = new Map([
 *   ["user2", "online"],
 *   ["user3", "online"],
 *   ["user4", "online"]
 * ])
 * symmetricDifference(snapshot1)(snapshot2)
 * // Map { "user1" => "online", "user4" => "online" }
 * // Users who joined or left
 * 
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const sym3 = Symbol("c")
 * 
 * const symMap1 = new Map([[sym1, 1], [sym2, 2]])
 * const symMap2 = new Map([[sym2, 20], [sym3, 30]])
 * symmetricDifference(symMap1)(symMap2)
 * // Map { Symbol(a) => 1, Symbol(c) => 30 }
 * 
 * // Set operations comparison
 * const setA = new Map([["x", 1], ["y", 2], ["z", 3]])
 * const setB = new Map([["y", 20], ["z", 30], ["w", 40]])
 * 
 * // A XOR B (symmetric difference)
 * const xor = symmetricDifference(setA)(setB)
 * // Map { "x" => 1, "w" => 40 }
 * 
 * // Migration tracking
 * const oldSchema = new Map([
 *   ["id", "number"],
 *   ["name", "string"],
 *   ["deprecated", "boolean"]
 * ])
 * const newSchema = new Map([
 *   ["id", "number"],
 *   ["name", "string"],
 *   ["created", "date"]
 * ])
 * symmetricDifference(oldSchema)(newSchema)
 * // Map { "deprecated" => "boolean", "created" => "date" }
 * // Fields to remove and add
 * 
 * // Cache invalidation
 * const cachedKeys = new Map([
 *   ["user:1", true],
 *   ["user:2", true],
 *   ["post:1", true]
 * ])
 * const currentKeys = new Map([
 *   ["user:2", true],
 *   ["post:1", true],
 *   ["post:2", true]
 * ])
 * const toInvalidate = symmetricDifference(cachedKeys)(currentKeys)
 * // Map { "user:1" => true, "post:2" => true }
 * // Keys to remove from cache and keys to add
 * 
 * // Chained symmetric differences
 * const map1s = new Map([["a", 1], ["b", 2]])
 * const map2s = new Map([["b", 20], ["c", 30]])
 * const map3s = new Map([["c", 300], ["d", 400]])
 * 
 * pipe(
 *   map1s,
 *   symmetricDifference(map2s),
 *   symmetricDifference(map3s)
 * )
 * // Result depends on order of operations
 * 
 * // Finding unique values across multiple Maps
 * const findAllUnique = <K, V>(...maps: Array<Map<K, V>>) => {
 *   const counts = new Map<K, number>()
 *   for (const map of maps) {
 *     for (const key of map.keys()) {
 *       counts.set(key, (counts.get(key) || 0) + 1)
 *     }
 *   }
 *   const result = new Map<K, V>()
 *   for (const map of maps) {
 *     for (const [key, value] of map) {
 *       if (counts.get(key) === 1) {
 *         result.set(key, value)
 *       }
 *     }
 *   }
 *   return result
 * }
 * 
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1], ["b", 2]])
 * const typed2 = new Map<string, number>([["b", 20], ["c", 30]])
 * const result: Map<string, number> = symmetricDifference(typed1)(typed2)
 * // Map<string, number> { "a" => 1, "c" => 30 }
 * 
 * // Use in change detection
 * const detectChanges = <K, V>(
 *   before: Map<K, V>,
 *   after: Map<K, V>
 * ) => {
 *   const diff = symmetricDifference(before)(after)
 *   return {
 *     hasChanges: diff.size > 0,
 *     addedKeys: Array.from(diff.keys()).filter(k => !before.has(k)),
 *     removedKeys: Array.from(diff.keys()).filter(k => !after.has(k))
 *   }
 * }
 * ```
 * @property Pure - Creates new Map, doesn't modify originals
 * @property Curried - Allows partial application
 * @property Symmetric - Order doesn't matter: symDiff(A)(B) keys = symDiff(B)(A) keys
 */
const symmetricDifference = <K, V>(map1: Map<K, V>) =>
	(map2: Map<K, V>): Map<K, V> => {
		const result = new Map<K, V>()
		
		// Add entries from map1 that aren't in map2
		for (const [key, value] of map1) {
			if (!map2.has(key)) {
				result.set(key, value)
			}
		}
		
		// Add entries from map2 that aren't in map1
		for (const [key, value] of map2) {
			if (!map1.has(key)) {
				result.set(key, value)
			}
		}
		
		return result
	}

export default symmetricDifference