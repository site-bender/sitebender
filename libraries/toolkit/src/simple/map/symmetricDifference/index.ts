/**
 * Returns keys in either Map but not in both
 *
 * Computes the symmetric difference of two Maps, returning a new Map
 * containing entries whose keys exist in exactly one of the two Maps.
 * This is the XOR operation for Map keys - entries are included if they
 * exist in the first Map or the second Map, but not in both. Useful for
 * finding unique elements, detecting changes, and set operations.
 *
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
 * // Empty Maps
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
 * ```
 * @pure
 * @immutable
 * @curried
 * @commutative
 */
const symmetricDifference =
	<K, V>(map1: Map<K, V>) => (map2: Map<K, V>): Map<K, V> =>
		new Map([
			...Array.from(map1).filter(([key]) => !map2.has(key)),
			...Array.from(map2).filter(([key]) => !map1.has(key))
		])

export default symmetricDifference
