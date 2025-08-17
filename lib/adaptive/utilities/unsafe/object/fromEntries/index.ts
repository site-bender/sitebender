import type { Value } from "../../../../types/index.ts"

/**
 * Creates an object from an array of [key, value] pairs
 * 
 * Transforms an iterable of [key, value] entries into an object.
 * Later entries with the same key will override earlier ones.
 * This is the inverse operation of Object.entries().
 * 
 * @curried Single parameter - already curried
 * @param entries - Array of [key, value] tuples
 * @returns Object created from entries
 * @example
 * ```typescript
 * // Basic usage
 * fromEntries([["a", 1], ["b", 2], ["c", 3]])
 * // { a: 1, b: 2, c: 3 }
 * 
 * fromEntries([["name", "John"], ["age", 30]])
 * // { name: "John", age: 30 }
 * 
 * fromEntries([])
 * // {}
 * 
 * // Duplicate keys (last wins)
 * fromEntries([["a", 1], ["b", 2], ["a", 3]])
 * // { a: 3, b: 2 }
 * 
 * // Mixed value types
 * fromEntries([
 *   ["str", "text"],
 *   ["num", 42],
 *   ["bool", true],
 *   ["arr", [1, 2, 3]],
 *   ["obj", { nested: "value" }]
 * ])
 * // { str: "text", num: 42, bool: true, arr: [1, 2, 3], obj: { nested: "value" } }
 * 
 * // Transform object via entries
 * const original = { a: 1, b: 2, c: 3 }
 * const doubled = fromEntries(
 *   Object.entries(original).map(([k, v]) => [k, v * 2])
 * )
 * // { a: 2, b: 4, c: 6 }
 * 
 * // Filter and reconstruct
 * const data = { a: 1, b: null, c: 3, d: undefined, e: 5 }
 * const filtered = fromEntries(
 *   Object.entries(data).filter(([_, v]) => v != null)
 * )
 * // { a: 1, c: 3, e: 5 }
 * 
 * // From Map
 * const map = new Map([["x", 10], ["y", 20]])
 * fromEntries(map)
 * // { x: 10, y: 20 }
 * 
 * // Key transformation
 * const prefixed = fromEntries(
 *   [["id", 1], ["name", "test"]].map(([k, v]) => [`user_${k}`, v])
 * )
 * // { user_id: 1, user_name: "test" }
 * 
 * // Null/undefined handling
 * fromEntries(null)                           // {}
 * fromEntries(undefined)                      // {}
 * 
 * // Invalid entries are skipped
 * fromEntries([["a", 1], null, ["b", 2], undefined, ["c", 3]])
 * // { a: 1, b: 2, c: 3 }
 * 
 * // Non-string keys are converted
 * fromEntries([[1, "one"], [true, "yes"], [null, "nothing"]])
 * // { "1": "one", "true": "yes", "null": "nothing" }
 * ```
 * @property Safe - handles null/undefined gracefully
 * @property Flexible - accepts any iterable of entries
 * @property Last wins - duplicate keys use last value
 */
const fromEntries = <K extends string | number | symbol, V extends Value>(
	entries: Iterable<readonly [K, V]> | null | undefined
): Record<K, V> => {
	if (entries == null) {
		return {} as Record<K, V>
	}
	
	const result = {} as Record<K, V>
	
	try {
		for (const entry of entries) {
			// Skip invalid entries
			if (entry == null || !Array.isArray(entry) || entry.length < 2) {
				continue
			}
			
			const [key, value] = entry
			// Convert key to string if necessary (except symbols)
			const finalKey = (typeof key === "symbol" ? key : String(key)) as K
			result[finalKey] = value
		}
	} catch (_err) {
		// If iteration fails, return what we have so far
		return result
	}
	
	return result
}

export default fromEntries