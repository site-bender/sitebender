/**
 * Returns a Map with keys in the first Map but not in the second
 *
 * Creates a new Map containing only the key-value pairs from the first Map
 * whose keys are not present in the second Map. This is the set difference
 * operation for Map keys. The comparison uses the standard Map equality
 * (SameValueZero algorithm).
 *
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
 * // Employee filtering example
 * const employees = new Map([["alice", "Engineering"], ["bob", "Marketing"]])
 * const managers = new Map([["alice", "VP"]])
 * difference(managers)(employees)
 * // Map { "bob" => "Marketing" }
 *
 * // Using with pipe
 * import pipe from "../../combinator/pipe/index.ts"
 *
 * const allUsers = new Map([[1, "Alice"], [2, "Bob"], [3, "Charlie"], [4, "Diana"]])
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
 * excludeSystemKeys(new Map([
 *   ["_id", "123"],
 *   ["name", "Alice"],
 *   ["age", 30]
 * ]))
 * // Map { "name" => "Alice", "age" => 30 }
 *
 * // Cache invalidation
 * const cache = new Map([
 *   ["user:1", { name: "Alice" }],
 *   ["user:2", { name: "Bob" }],
 *   ["post:1", { title: "Hello" }]
 * ])
 * const invalidated = new Map([["user:2", 1]])
 * difference(invalidated)(cache)
 * // Map { "user:1" => {...}, "post:1" => {...} }
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
 * ```
 * @pure
 * @curried
 * @immutable
 */
const difference =
	<K, V, V2>(subtrahend: Map<K, V2>) => (minuend: Map<K, V>): Map<K, V> => {
		return new Map(
			[...minuend.entries()].filter(([key]) => !subtrahend.has(key)),
		)
	}

export default difference
