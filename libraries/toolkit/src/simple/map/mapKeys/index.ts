/**
 * Maps a function over the keys of a Map
 *
 * Transforms each key in a Map by applying a function to it, creating
 * a new Map with transformed keys but unchanged values. The mapping function
 * receives both the key and value for each entry, allowing key transformations
 * that can use value context. If the transformation produces duplicate keys,
 * later entries will overwrite earlier ones.
 *
 * @param fn - Function to transform each key
 * @param map - The Map to transform
 * @returns A new Map with transformed keys
 * @example
 * ```typescript
 * // Basic key transformation
 * const scores = new Map([["alice", 85], ["bob", 92], ["charlie", 78]])
 * const upperKeys = mapKeys((key: string) => key.toUpperCase())
 * upperKeys(scores)
 * // Map { "ALICE" => 85, "BOB" => 92, "CHARLIE" => 78 }
 *
 * // Transform using both key and value
 * const inventory = new Map([["apple", 10], ["banana", 5]])
 * mapKeys((item: string, count: number) => `${item}_${count}`)(inventory)
 * // Map { "apple_10" => 10, "banana_5" => 5 }
 *
 * // Prefix keys
 * const config = new Map([["timeout", 5000], ["retries", 3]])
 * mapKeys((key: string) => `app.${key}`)(config)
 * // Map { "app.timeout" => 5000, "app.retries" => 3 }
 *
 * // String to number keys
 * const stringKeyed = new Map([["1", "first"], ["2", "second"]])
 * mapKeys((k: string) => parseInt(k, 10))(stringKeyed)
 * // Map { 1 => "first", 2 => "second" }
 *
 * // Key collision (later overwrites earlier)
 * const colliding = new Map([["a", 1], ["b", 2], ["c", 3]])
 * mapKeys(() => "same")(colliding)
 * // Map { "same" => 3 }
 * ```
 * @pure
 * @immutable
 * @curried
 */
const mapKeys = <K, V, NK>(
	fn: (key: K, value: V) => NK,
) =>
(map: Map<K, V>): Map<NK, V> =>
	new Map(
		Array.from(map).map(([key, value]) => [fn(key, value), value])
	)

export default mapKeys