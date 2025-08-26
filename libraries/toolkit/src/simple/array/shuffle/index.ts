/**
 * Returns a new array with elements randomly shuffled
 *
 * Creates a new array with all elements randomly reordered using the
 * Fisher-Yates shuffle algorithm. Produces a uniform distribution where
 * each permutation has equal probability. The original array is not modified.
 *
 * @param array - Array to shuffle
 * @returns New array with elements in random order
 * @impure
 * @safe
 * @example
 * ```typescript
 * // Basic shuffle
 * shuffle([1, 2, 3, 4, 5])  // [3, 1, 5, 2, 4] (random order)
 *
 * // String array
 * shuffle(["a", "b", "c", "d"])  // ["c", "a", "d", "b"]
 *
 * // Object array
 * const items = [{ id: 1 }, { id: 2 }, { id: 3 }]
 * shuffle(items)  // Random order, original unchanged
 *
 * // Edge cases
 * shuffle([42])        // [42] (single element)
 * shuffle([1, 2])      // [2, 1] or [1, 2]
 * shuffle([])          // []
 * shuffle(null)        // []
 * ```
 */
const shuffle = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Fisher-Yates shuffle (pure functional approach)
	const shuffleRecursive = (arr: Array<T>, i: number): Array<T> => {
		if (i <= 0) return arr
		const j = Math.floor(Math.random() * (i + 1))
		// Create new array with swapped elements (no mutation)
		const shuffled = arr.map((item, idx) => {
			if (idx === i) return arr[j]
			if (idx === j) return arr[i]
			return item
		})
		return shuffleRecursive(shuffled, i - 1)
	}

	return shuffleRecursive([...array], array.length - 1)
}

export default shuffle
