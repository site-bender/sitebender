/**
 * Sets multiple key-value pairs in a Map
 *
 * Creates a new Map with multiple key-value pairs added or updated from
 * an iterable of entries. Existing keys are overwritten with new values.
 * This maintains immutability by returning a new Map instance. Useful for
 * batch updates, merging configurations, and efficient multi-key operations.
 *
 * @curried (entries) => (map) => result
 * @param entries - Iterable of [key, value] pairs to set
 * @param map - The Map to update
 * @returns A new Map with all entries set
 * @example
 * ```typescript
 * // Basic usage - add multiple entries
 * const scores = new Map([["Alice", 85], ["Bob", 92]])
 * const newScores: Array<[string, number]> = [
 *   ["Charlie", 78],
 *   ["David", 88]
 * ]
 * setAll(newScores)(scores)
 * // Map { "Alice" => 85, "Bob" => 92, "Charlie" => 78, "David" => 88 }
 *
 * // Update existing entries
 * const updates: Array<[string, number]> = [["Alice", 90], ["Bob", 95]]
 * setAll(updates)(scores)
 * // Map { "Alice" => 90, "Bob" => 95 }
 *
 * // Set from another Map
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["b", 20], ["c", 30]])
 * setAll(map2)(map1)
 * // Map { "a" => 1, "b" => 20, "c" => 30 }
 *
 * // Set from object entries
 * const obj = { x: 10, y: 20, z: 30 }
 * setAll(Object.entries(obj))(new Map())
 * // Map { "x" => 10, "y" => 20, "z" => 30 }
 *
 * // Empty entries (no change)
 * setAll([])(new Map([["key", "value"]]))
 * // Map { "key" => "value" }
 * ```
 * @curried
 * @pure
 * @immutable
 */
const setAll =
	<K, V>(entries: Iterable<[K, V]>) => (map: Map<K, V>): Map<K, V> => {
		const result = new Map(map)
		for (const [key, value] of entries) {
			result.set(key, value)
		}
		return result
	}

export default setAll