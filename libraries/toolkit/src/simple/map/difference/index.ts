/**
 * Returns a Map with keys in the first Map but not in the second
 * 
 * Creates a new Map containing only the key-value pairs from the first Map
 * whose keys are not present in the second Map. This is the set difference
 * operation for Map keys. The comparison uses the standard Map equality
 * (SameValueZero algorithm).
 * 
 * @curried (subtrahend) => (minuend) => result
 * @param subtrahend - The Map whose keys to exclude
 * @param minuend - The Map to subtract from
 * @returns A new Map with keys from minuend not in subtrahend
 * @example
 * ```typescript
 * // Basic usage
 * const map1 = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const map2 = new Map([["b", 20], ["c", 30], ["d", 40]])
 * difference(map2)(map1)
 * // Map { "a" => 1 }
 * // Keys "b" and "c" are in map2, so they're excluded
 * 
 * // Direct application
 * const employees = new Map([
 *   ["alice", "Engineering"],
 *   ["bob", "Marketing"],
 *   ["charlie", "Sales"]
 * ])
 * const managers = new Map([["alice", "VP"], ["diana", "CEO"]])
 * difference(managers)(employees)
 * // Map { "bob" => "Marketing", "charlie" => "Sales" }
 * 
 * // No overlap
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["c", 3], ["d", 4]])
 * difference(map2)(map1)
 * // Map { "a" => 1, "b" => 2 }
 * 
 * // Complete overlap
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["a", 10], ["b", 20], ["c", 30]])
 * difference(map2)(map1)
 * // Map {}
 * 
 * // Empty subtrahend
 * const map = new Map([["a", 1], ["b", 2]])
 * difference(new Map())(map)
 * // Map { "a" => 1, "b" => 2 }
 * 
 * // Empty minuend
 * const map = new Map([["a", 1], ["b", 2]])
 * difference(map)(new Map())
 * // Map {}
 * 
 * // Using with pipe
 * import { pipe } from "../../combinator/pipe/index.ts"
 * 
 * const allUsers = new Map([
 *   [1, "Alice"],
 *   [2, "Bob"],
 *   [3, "Charlie"],
 *   [4, "Diana"]
 * ])
 * const admins = new Map([[1, true], [3, true]])
 * const banned = new Map([[2, true]])
 * 
 * pipe(
 *   allUsers,
 *   difference(admins),
 *   difference(banned)
 * )
 * // Map { 4 => "Diana" } (not admin, not banned)
 * 
 * // Partial application for filtering
 * const excludeSystemKeys = difference(
 *   new Map([["_id", 1], ["_rev", 1], ["_type", 1]])
 * )
 * 
 * const doc1 = new Map([
 *   ["_id", "123"],
 *   ["_rev", "2"],
 *   ["name", "Alice"],
 *   ["age", 30]
 * ])
 * excludeSystemKeys(doc1)
 * // Map { "name" => "Alice", "age" => 30 }
 * 
 * // Number keys
 * const scores = new Map([[1, 95], [2, 87], [3, 92], [4, 88]])
 * const passed = new Map([[1, true], [3, true], [4, true]])
 * difference(passed)(scores)
 * // Map { 2 => 87 } (didn't pass)
 * 
 * // Finding unique keys
 * const shopA = new Map([
 *   ["apples", 1.99],
 *   ["bananas", 0.59],
 *   ["oranges", 2.49]
 * ])
 * const shopB = new Map([
 *   ["bananas", 0.69],
 *   ["grapes", 3.99],
 *   ["oranges", 2.29]
 * ])
 * difference(shopB)(shopA)
 * // Map { "apples" => 1.99 } (only in shopA)
 * 
 * // Cache invalidation
 * const cache = new Map([
 *   ["user:1", { name: "Alice" }],
 *   ["user:2", { name: "Bob" }],
 *   ["user:3", { name: "Charlie" }],
 *   ["post:1", { title: "Hello" }]
 * ])
 * const invalidated = new Map([["user:2", 1], ["user:3", 1]])
 * difference(invalidated)(cache)
 * // Map { "user:1" => {...}, "post:1" => {...} }
 * 
 * // Permissions filtering
 * const allPermissions = new Map([
 *   ["read", true],
 *   ["write", true],
 *   ["delete", true],
 *   ["admin", true]
 * ])
 * const restricted = new Map([["delete", 1], ["admin", 1]])
 * difference(restricted)(allPermissions)
 * // Map { "read" => true, "write" => true }
 * 
 * // Symbol keys
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * const map1 = new Map([[sym1, 1], [sym2, 2], ["c", 3]])
 * const map2 = new Map([[sym1, 10], ["c", 30]])
 * difference(map2)(map1)
 * // Map { Symbol(b) => 2 }
 * 
 * // Chaining differences
 * const inventory = new Map([
 *   ["apple", 50],
 *   ["banana", 30],
 *   ["orange", 25],
 *   ["grape", 40]
 * ])
 * const sold = new Map([["apple", 10], ["banana", 5]])
 * const spoiled = new Map([["orange", 3]])
 * 
 * pipe(
 *   inventory,
 *   difference(sold),
 *   difference(spoiled)
 * )
 * // Map { "grape" => 40 }
 * 
 * // Set operations comparison
 * const setA = new Set(["a", "b", "c"])
 * const setB = new Set(["b", "c", "d"])
 * // For sets: A - B = {a}
 * const mapA = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const mapB = new Map([["b", 20], ["c", 30], ["d", 40]])
 * difference(mapB)(mapA)
 * // Map { "a" => 1 } (same logic as sets)
 * 
 * // Type safety
 * const typed1 = new Map<string, number>([["a", 1], ["b", 2]])
 * const typed2 = new Map<string, boolean>([["b", true]])
 * difference<string, number, boolean>(typed2)(typed1)
 * // Map<string, number> { "a" => 1 }
 * 
 * // Use in reducer
 * type Action = { type: "EXCLUDE"; keys: Map<string, any> }
 * const reducer = (state: Map<string, any>, action: Action) => {
 *   switch (action.type) {
 *     case "EXCLUDE":
 *       return difference(action.keys)(state)
 *     default:
 *       return state
 *   }
 * }
 * 
 * // Performance with large Maps
 * const large1 = new Map(Array.from({ length: 1000 }, (_, i) => [i, i]))
 * const large2 = new Map(Array.from({ length: 500 }, (_, i) => [i * 2, i]))
 * difference(large2)(large1)
 * // Map with ~500 entries (odd numbers)
 * ```
 * @property Pure - Creates new Map, doesn't modify inputs
 * @property Curried - Allows partial application
 * @property Set-like - Implements set difference for Map keys
 */
const difference = <K, V, V2>(subtrahend: Map<K, V2>) =>
	(minuend: Map<K, V>): Map<K, V> => {
		const result = new Map<K, V>()
		for (const [key, value] of minuend) {
			if (!subtrahend.has(key)) {
				result.set(key, value)
			}
		}
		return result
	}

export default difference