/**
 * Alternate elements from multiple sets
 *
 * Takes multiple Sets and interleaves their elements, taking one element
 * from each Set in turn. Since Sets are unordered in specification (though
 * ordered by insertion in practice), the iteration order follows the Set's
 * internal ordering. Returns an array with interleaved elements.
 *
 * @param sets - Sets to interleave
 * @returns Array with interleaved elements from all sets
 * @example
 * ```typescript
 * // Basic usage
 * interleave(new Set([1, 2, 3]), new Set(["a", "b", "c"]))
 * // [1, "a", 2, "b", 3, "c"]
 *
 * // Multiple sets
 * interleave(new Set([1, 2]), new Set(["a", "b"]), new Set([true, false]))
 * // [1, "a", true, 2, "b", false]
 *
 * // Different sizes
 * interleave(new Set([1, 2, 3, 4]), new Set(["a", "b"]))
 * // [1, "a", 2, "b", 3, 4]
 *
 * // Edge cases
 * interleave()                          // []
 * interleave(new Set())                 // []
 * interleave(new Set(), new Set([1]))   // [1]
 * ```
 * @pure
 * @immutable
 */
const interleave = <T>(...sets: Array<Set<T>>): Array<T> => {
	if (sets.length === 0) return []

	const iterators = sets.map((set) => set.values())
	const result: Array<T> = []
	let hasMore = true

	while (hasMore) {
		hasMore = false
		for (const iterator of iterators) {
			const next = iterator.next()
			if (!next.done) {
				result.push(next.value)
				hasMore = true
			}
		}
	}

	return result
}

export default interleave
