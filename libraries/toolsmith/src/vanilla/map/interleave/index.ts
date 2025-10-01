import isNotNull from "../../validation/isNotNull/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function interleave<K, V>(maps: Array<Map<K, V>>): Map<K, V> {
	if (maps.length === 0) {
		return new Map<K, V>()
	}

	// Convert each Map to an array of entries
	const iterators = maps.map(function toEntries(m) {
		return Array.from(m.entries())
	})
	const maxLength = Math.max(...iterators.map(function getLength(it) {
		return it.length
	}))

	// Generate interleaved entries functionally
	const interleavedEntries = Array.from(
		{ length: maxLength },
		function createInterleavedRow(_, i) {
			return iterators
				.map(function getEntryAtIndex(iterator) {
					return i < iterator.length ? iterator[i] : null
				})
				.filter(function isValidEntry(entry): entry is [K, V] {
					return isNotNull(entry)
				})
		},
	).flat()

	return new Map(interleavedEntries)
}
