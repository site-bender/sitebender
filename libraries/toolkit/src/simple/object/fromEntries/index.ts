import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

/**
 * Creates an object from an array of [key, value] pairs
 *
 * Transforms an iterable of [key, value] entries into an object.
 * Later entries with the same key will override earlier ones.
 * This is the inverse operation of Object.entries().
 *
 * @pure
 * @safe
 * @param entries - Array of [key, value] tuples
 * @returns Object created from entries
 * @example
 * ```typescript
 * // Basic usage
 * fromEntries([["a", 1], ["b", 2], ["c", 3]])
 * // { a: 1, b: 2, c: 3 }
 *
 * // Duplicate keys (last wins)
 * fromEntries([["a", 1], ["b", 2], ["a", 3]])
 * // { a: 3, b: 2 }
 *
 * // Transform object via entries
 * const original = { a: 1, b: 2, c: 3 }
 * const doubled = fromEntries(
 *   Object.entries(original).map(([k, v]) => [k, v * 2])
 * )
 * // { a: 2, b: 4, c: 6 }
 *
 * // From Map
 * const map = new Map([["x", 10], ["y", 20]])
 * fromEntries(map)
 * // { x: 10, y: 20 }
 *
 * // Null/undefined handling
 * fromEntries(null)      // {}
 * fromEntries(undefined) // {}
 * ```
 */
const fromEntries = <K extends string | number | symbol, V extends Value>(
	entries: Iterable<readonly [K, V]> | null | undefined,
): Record<K, V> => {
	if (isNullish(entries)) {
		return {} as Record<K, V>
	}

	try {
		// Convert iterable to array and use reduce
		const entriesArray = Array.from(entries)

		return entriesArray.reduce((acc, entry) => {
			// Skip invalid entries
			if (isNullish(entry) || !Array.isArray(entry) || entry.length < 2) {
				return acc
			}

			const [key, value] = entry
			// Convert key to string if necessary (except symbols)
			const finalKey = (typeof key === "symbol" ? key : String(key)) as K

			return {
				...acc,
				[finalKey]: value,
			}
		}, {} as Record<K, V>)
	} catch (_err) {
		// If iteration fails, return empty object
		return {} as Record<K, V>
	}
}

export default fromEntries
