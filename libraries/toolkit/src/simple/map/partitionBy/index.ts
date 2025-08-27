/**
 * Partition Map by consecutive entries satisfying predicate
 *
 * Splits a Map into an array of Maps where each Map contains consecutive
 * entries (in iteration order) that produce the same result when passed to
 * the predicate function. Unlike regular partition which creates two groups,
 * this creates multiple groups based on runs of entries with the same
 * predicate result. Useful for grouping consecutive similar entries,
 * segmenting data, and analyzing patterns in ordered Maps.
 *
 * @curried (predicate) => (map) => partitions
 * @param predicate - Function that determines grouping
 * @param map - Map to partition
 * @returns Array of Maps with consecutive similar entries
 * @example
 * ```typescript
 * // Group consecutive entries by value range
 * const scores = new Map([
 *   ["alice", 95],
 *   ["bob", 92],
 *   ["charlie", 75],
 *   ["david", 72],
 *   ["eve", 88]
 * ])
 * const isHighScore = (score: number) => score >= 90
 * partitionBy(isHighScore)(scores)
 * // [
 * //   Map { "alice" => 95, "bob" => 92 },
 * //   Map { "charlie" => 75, "david" => 72 },
 * //   Map { "eve" => 88 }
 * // ]
 *
 * // Group by object property
 * const users = new Map([
 *   [1, { name: "Alice", active: true }],
 *   [2, { name: "Bob", active: true }],
 *   [3, { name: "Charlie", active: false }]
 * ])
 * partitionBy((user: any) => user.active)(users)
 * // [
 * //   Map { 1 => {...}, 2 => {...} },
 * //   Map { 3 => {...} }
 * // ]
 *
 * // Group by key pattern
 * const config = new Map([
 *   ["app.name", "MyApp"],
 *   ["app.version", "1.0"],
 *   ["db.host", "localhost"]
 * ])
 * partitionBy((_: any, key: string) => key.split(".")[0])(config)
 * // [
 * //   Map { "app.name" => "MyApp", "app.version" => "1.0" },
 * //   Map { "db.host" => "localhost" }
 * // ]
 *
 * // Empty Map
 * partitionBy((v: any) => v > 0)(new Map())
 * // []
 *
 * // All same group
 * const positive = new Map([["a", 1], ["b", 2]])
 * partitionBy((n: number) => n > 0)(positive)
 * // [Map { "a" => 1, "b" => 2 }]
 * ```
 * @curried
 * @pure
 * @immutable
 */
const partitionBy = <K, V>(
	predicate: (value: V, key: K) => unknown,
) =>
(map: Map<K, V>): Array<Map<K, V>> => {
	const entries = Array.from(map.entries())
	if (entries.length === 0) return []

	// Group consecutive entries with same predicate result
	const groups = entries.reduce<Array<Array<[K, V]>>>((acc, entry, index) => {
		const [key, value] = entry
		const predicateResult = predicate(value, key)
		
		if (index === 0) {
			return [[entry]]
		}
		
		const [prevKey, prevValue] = entries[index - 1]
		const prevPredicateResult = predicate(prevValue, prevKey)
		
		if (predicateResult === prevPredicateResult) {
			acc[acc.length - 1].push(entry)
		} else {
			acc.push([entry])
		}
		
		return acc
	}, [])

	return groups.map(group => new Map(group))
}

export default partitionBy