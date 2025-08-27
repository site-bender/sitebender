/**
 * Maps a function over the entries of a Map
 *
 * Transforms each key-value pair in a Map by applying a function that
 * receives the entire entry as a tuple [key, value] and returns a new
 * tuple [newKey, newValue]. This allows simultaneous transformation of
 * both keys and values in a single operation. The function creates a
 * new Map with the transformed entries.
 *
 * @curried (fn) => (map) => result
 * @param fn - Function to transform each [key, value] pair
 * @param map - The Map to transform
 * @returns A new Map with transformed entries
 * @example
 * ```typescript
 * // Basic entry transformation
 * const scores = new Map([
 *   ["alice", 85],
 *   ["bob", 92],
 *   ["charlie", 78]
 * ])
 * const upperCaseKeys = mapEntries(
 *   ([name, score]: [string, number]) => [name.toUpperCase(), score]
 * )
 * upperCaseKeys(scores)
 * // Map { "ALICE" => 85, "BOB" => 92, "CHARLIE" => 78 }
 *
 * // Transform both key and value
 * const inventory = new Map([["apple", 10], ["banana", 5]])
 * mapEntries(
 *   ([item, count]: [string, number]) => [`${item}_fruit`, count * 2]
 * )(inventory)
 * // Map { "apple_fruit" => 20, "banana_fruit" => 10 }
 *
 * // Swap keys and values
 * const codes = new Map([["US", "United States"], ["UK", "United Kingdom"]])
 * mapEntries(
 *   ([code, name]: [string, string]) => [name, code]
 * )(codes)
 * // Map { "United States" => "US", "United Kingdom" => "UK" }
 *
 * // Complex transformation
 * const users = new Map([[1, { name: "Alice", role: "admin" }]])
 * mapEntries(
 *   ([id, user]: [number, any]) => [`user_${id}`, user.name]
 * )(users)
 * // Map { "user_1" => "Alice" }
 *
 * // Empty Map
 * mapEntries(([k, v]: [any, any]) => [k, v])(new Map())
 * // Map {}
 * ```
 * @curried
 * @pure
 * @immutable
 */
const mapEntries = <K, V, NK, NV>(
	fn: (entry: [K, V]) => [NK, NV],
) =>
(map: Map<K, V>): Map<NK, NV> => {
	const result = new Map<NK, NV>()
	for (const entry of map) {
		const [newKey, newValue] = fn(entry)
		result.set(newKey, newValue)
	}
	return result
}

export default mapEntries