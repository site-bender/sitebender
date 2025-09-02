/**
 * Count occurrences of each value across all Map values
 *
 * Creates a frequency map that counts how many times each unique value
 * appears across all values in the Map. Returns a Map where keys are the
 * unique values found and values are their occurrence counts. This is useful
 * for analyzing value distribution and finding the most common values.
 *
 * @param map - The Map to analyze values from
 * @returns Map with values as keys and counts as values
 * @example
 * // Basic usage - count value occurrences
 * const scores = new Map([["Alice", 90], ["Bob", 85], ["Charlie", 90]])
 * frequency(scores)  // Map { 90 => 2, 85 => 1 }
 *
 * // String values
 * const roles = new Map([["u1", "admin"], ["u2", "user"], ["u3", "admin"]])
 * frequency(roles)  // Map { "admin" => 2, "user" => 1 }
 *
 * // Finding most common value
 * const votes = new Map([["v1", "A"], ["v2", "B"], ["v3", "A"]])
 * const freq = frequency(votes)
 * const mostCommon = [...freq.entries()].reduce((a, b) => b[1] > a[1] ? b : a)
 * // ["A", 2]
 *
 * // Mixed types
 * const mixed = new Map([["a", 1], ["b", "1"], ["c", 1]])
 * frequency(mixed)  // Map { 1 => 2, "1" => 1 }
 *
 * // Empty Map
 * frequency(new Map())  // Map {}
 *
 * @pure
 * @immutable
 * @safe
 */
const frequency = <K, V>(map: Map<K, V>): Map<V, number> => {
	return [...map.values()].reduce((freq, value) => {
		freq.set(value, (freq.get(value) ?? 0) + 1)
		return freq
	}, new Map<V, number>())
}

export default frequency
