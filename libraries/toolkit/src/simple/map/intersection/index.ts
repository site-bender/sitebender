/**
 * Returns a Map with keys present in both Maps
 *
 * Creates a new Map containing only the key-value pairs whose keys exist
 * in both input Maps. The values are taken from the first Map. This is
 * the set intersection operation for Map keys. The comparison uses the
 * standard Map equality (SameValueZero algorithm).
 *
 * @param second - The Map to intersect with
 * @param first - The Map to take values from
 * @returns A new Map with keys present in both Maps, values from first
 * @example
 * ```typescript
 * // Basic usage
 * const map1 = new Map([["a", 1], ["b", 2], ["c", 3]])
 * const map2 = new Map([["b", 20], ["c", 30], ["d", 40]])
 * intersection(map2)(map1)
 * // Map { "b" => 2, "c" => 3 }
 *
 * // No overlap
 * const noCommon1 = new Map([["a", 1]])
 * const noCommon2 = new Map([["b", 2]])
 * intersection(noCommon2)(noCommon1)
 * // Map {}
 *
 * // Empty Maps
 * intersection(new Map())(new Map([["a", 1]]))
 * // Map {}
 *
 * // Filtering by allowlist
 * const permissions = new Map([["read", "user"], ["write", "admin"]])
 * const allowlist = new Map([["read", true], ["admin", true]])
 * intersection(allowlist)(permissions)
 * // Map { "read" => "user" }
 *
 * // Complete overlap
 * const all1 = new Map([["x", 1], ["y", 2]])
 * const all2 = new Map([["x", 10], ["y", 20]])
 * intersection(all2)(all1)
 * // Map { "x" => 1, "y" => 2 }
 * ```
 * @pure
 * @immutable
 * @curried
 */
const intersection =
	<K, V, V2>(second: Map<K, V2>) => (first: Map<K, V>): Map<K, V> =>
		new Map(
			Array.from(first).filter(([key]) => second.has(key))
		)

export default intersection
