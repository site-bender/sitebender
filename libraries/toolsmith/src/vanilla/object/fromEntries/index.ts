import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"
import isSymbol from "../../validation/isSymbol/index.ts"

//++ Creates an object from an array of [key, value] pairs
export default function fromEntries<K extends string | number | symbol, V extends Value>(
	entries: Iterable<readonly [K, V]> | null | undefined,
): Record<K, V> {
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
			const finalKey = (isSymbol(key) ? key : String(key)) as K

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
