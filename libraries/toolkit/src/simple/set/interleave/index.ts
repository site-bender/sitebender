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
 * // Basic interleaving
 * interleave(new Set([1, 2, 3]), new Set(["a", "b", "c"]))
 * // [1, "a", 2, "b", 3, "c"]
 *
 * // Three sets
 * interleave(
 *   new Set([1, 2]),
 *   new Set(["a", "b"]),
 *   new Set([true, false])
 * )
 * // [1, "a", true, 2, "b", false]
 *
 * // Different sizes - shorter exhausted first
 * interleave(new Set([1, 2, 3, 4]), new Set(["a", "b"]))
 * // [1, "a", 2, "b", 3, 4]
 *
 * // Single set
 * interleave(new Set([1, 2, 3]))
 * // [1, 2, 3]
 *
 * // Empty sets
 * interleave(new Set(), new Set([1, 2]), new Set())
 * // [1, 2]
 *
 * // All empty
 * interleave(new Set(), new Set(), new Set())
 * // []
 *
 * // No sets
 * interleave()
 * // []
 *
 * // Sets from arrays with duplicates
 * const set1 = new Set([1, 1, 2, 2, 3])  // {1, 2, 3}
 * const set2 = new Set(["a", "a", "b", "b"])  // {"a", "b"}
 * interleave(set1, set2)
 * // [1, "a", 2, "b", 3]
 *
 * // Mixed types
 * interleave(
 *   new Set([1, 2]),
 *   new Set(["a", "b"]),
 *   new Set([true, false]),
 *   new Set([{ x: 1 }])
 * )
 * // [1, "a", true, { x: 1 }, 2, "b", false]
 *
 * // Creating alternating pattern
 * const evens = new Set([2, 4, 6, 8])
 * const odds = new Set([1, 3, 5, 7])
 * interleave(odds, evens)
 * // [1, 2, 3, 4, 5, 6, 7, 8]
 * // Note: Order depends on Set iteration order
 *
 * // Combining unique values
 * const teamA = new Set(["Alice", "Bob", "Charlie"])
 * const teamB = new Set(["David", "Eve", "Frank"])
 * interleave(teamA, teamB)
 * // ["Alice", "David", "Bob", "Eve", "Charlie", "Frank"]
 *
 * // Set operations before interleaving
 * const set1Full = new Set([1, 2, 3, 4, 5])
 * const set2Full = new Set([3, 4, 5, 6, 7])
 * const difference1 = new Set([...set1Full].filter(x => !set2Full.has(x)))
 * const difference2 = new Set([...set2Full].filter(x => !set1Full.has(x)))
 * interleave(difference1, difference2)
 * // [1, 6, 2, 7]  // Elements unique to each set
 *
 * // Character sets
 * const vowels = new Set(["a", "e", "i", "o", "u"])
 * const consonants = new Set(["b", "c", "d", "f", "g"])
 * interleave(vowels, consonants)
 * // ["a", "b", "e", "c", "i", "d", "o", "f", "u", "g"]
 *
 * // Boolean and null values
 * const bools = new Set([true, false])
 * const nullish = new Set([null, undefined])
 * interleave(bools, nullish)
 * // [true, null, false, undefined]
 *
 * // Using with Set iterator order
 * const insertionOrder = new Set()
 * insertionOrder.add("third")
 * insertionOrder.add("first")
 * insertionOrder.add("second")
 * const numbers = new Set([1, 2, 3])
 * interleave(insertionOrder, numbers)
 * // ["third", 1, "first", 2, "second", 3]
 *
 * // Large sets
 * const largeSet1 = new Set(Array.from({ length: 1000 }, (_, i) => i))
 * const largeSet2 = new Set(Array.from({ length: 1000 }, (_, i) => i + 1000))
 * const result = interleave(largeSet1, largeSet2)
 * // [0, 1000, 1, 1001, 2, 1002, ...]  // 2000 elements total
 *
 * // Symbol handling
 * const sym1 = Symbol("a")
 * const sym2 = Symbol("b")
 * interleave(new Set([sym1]), new Set([sym2]))
 * // [Symbol(a), Symbol(b)]
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input sets
 * @property Order-dependent - Result depends on Set iteration order
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
