/**
 * Groups Map entries by a key function result
 *
 * Creates a new Map where keys are the results of the grouping function
 * and values are Maps containing all entries that produced that group key.
 * This is useful for categorizing, partitioning, or organizing Map data
 * based on computed properties.
 *
 * @param keyFn - Function that computes the group key from each entry
 * @param map - The Map to group
 * @returns Map of group keys to Maps of original entries
 * @example
 * // Basic usage - group by value property
 * const users = new Map([
 *   ["alice", { dept: "Engineering" }],
 *   ["bob", { dept: "Sales" }],
 *   ["charlie", { dept: "Engineering" }]
 * ])
 * groupBy((user: any) => user.dept)(users)
 * // Map { "Engineering" => Map {...}, "Sales" => Map {...} }
 * 
 * // Group by computed property
 * const scores = new Map([["alice", 95], ["bob", 72], ["charlie", 88]])
 * const byGrade = groupBy((score: number) =>
 *   score >= 90 ? "A" : score >= 80 ? "B" : "C"
 * )
 * byGrade(scores)  // Map { "A" => Map {...}, "C" => Map {...}, "B" => Map {...} }
 * 
 * // Using both key and value
 * const items = new Map([["item1", 10], ["test2", 20]])
 * groupBy((v: number, k: string) => k.startsWith("item") ? "items" : "other")(items)
 * 
 * // Empty Map
 * groupBy((v: any) => "group")(new Map())  // Map {}
 * 
 * // Group by boolean condition
 * const nums = new Map([["a", 1], ["b", 2], ["c", 3]])
 * groupBy((n: number) => n % 2 === 0 ? "even" : "odd")(nums)
 * // Map { "odd" => Map {...}, "even" => Map {...} }
 * 
 * @pure
 * @curried
 * @immutable
 */
const groupBy = <K, V, G>(
	keyFn: (value: V, key: K) => G,
) =>
(map: Map<K, V>): Map<G, Map<K, V>> => {
	return [...map.entries()].reduce((groups, [key, value]) => {
		const groupKey = keyFn(value, key)
		const existing = groups.get(groupKey) || new Map<K, V>()
		existing.set(key, value)
		groups.set(groupKey, existing)
		return groups
	}, new Map<G, Map<K, V>>())
}

export default groupBy