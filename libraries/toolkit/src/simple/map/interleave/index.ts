/**
 * Alternate entries from multiple Maps
 *
 * Creates a new Map by taking entries alternately from each input Map.
 * Takes one entry from the first Map, then one from the second, and so on,
 * cycling through all Maps until all entries are consumed. If Maps have
 * different sizes, continues with remaining Maps after shorter ones are
 * exhausted. Duplicate keys use the last occurrence.
 *
 * @param maps - Array of Maps to interleave
 * @returns A new Map with interleaved entries
 * @example
 * ```typescript
 * // Basic usage - interleave two Maps
 * const map1 = new Map([["a", 1], ["b", 2]])
 * const map2 = new Map([["c", 3], ["d", 4]])
 * interleave([map1, map2])
 * // Map { "a" => 1, "c" => 3, "b" => 2, "d" => 4 }
 *
 * // Different sized Maps
 * const short = new Map([["a", 1]])
 * const long = new Map([["x", 10], ["y", 20], ["z", 30]])
 * interleave([short, long])
 * // Map { "a" => 1, "x" => 10, "y" => 20, "z" => 30 }
 *
 * // Three Maps
 * const m1 = new Map([["1", "a"]])
 * const m2 = new Map([["2", "b"]])
 * const m3 = new Map([["3", "c"]])
 * interleave([m1, m2, m3])
 * // Map { "1" => "a", "2" => "b", "3" => "c" }
 *
 * // Empty array
 * interleave([])
 * // Map {}
 *
 * // With duplicate keys (later wins)
 * const first = new Map([["key", "old"]])
 * const second = new Map([["key", "new"]])
 * interleave([first, second])
 * // Map { "key" => "new" }
 * ```
 * @pure
 * @immutable
 */
const interleave = <K, V>(maps: Array<Map<K, V>>): Map<K, V> => {
	if (maps.length === 0) {
		return new Map<K, V>()
	}

	// Convert each Map to an array of entries
	const iterators = maps.map((m) => Array.from(m.entries()))
	const maxLength = Math.max(...iterators.map((it) => it.length))

	// Generate interleaved entries functionally
	const interleavedEntries = Array.from(
		{ length: maxLength },
		(_, i) =>
			iterators
				.map((iterator) => (i < iterator.length ? iterator[i] : null))
				.filter((entry): entry is [K, V] => entry !== null),
	).flat()

	return new Map(interleavedEntries)
}

export default interleave
