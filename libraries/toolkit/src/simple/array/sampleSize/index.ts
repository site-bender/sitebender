/**
 * Returns n random elements from the array
 *
 * Selects n random elements from the array without replacement. Each element
 * can be selected at most once. If n is greater than array length, returns
 * all elements in random order. Uses Fisher-Yates algorithm for efficient
 * random sampling.
 *
 * @param n - Number of elements to sample
 * @param array - Array to sample from
 * @returns Array of n random elements (or all elements if n > length)
 * @impure
 * @curried
 * @safe
 * @example
 * ```typescript
 * // Basic sampling
 * sampleSize(3)([1, 2, 3, 4, 5, 6, 7, 8])  // [7, 2, 5] (3 random)
 *
 * // Random team selection
 * const players = ["Alice", "Bob", "Charlie", "David", "Eve"]
 * sampleSize(3)(players)  // ["Charlie", "Alice", "Eve"]
 *
 * // Request more than available (returns all in random order)
 * sampleSize(10)([1, 2, 3])  // [3, 1, 2]
 *
 * // Edge cases
 * sampleSize(0)([1, 2, 3])     // []
 * sampleSize(1)([1, 2, 3])     // [2] (single element)
 * sampleSize(3)([])            // []
 * sampleSize(3)(null)          // []
 * ```
 */
const sampleSize = <T>(
	n: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0 || n <= 0) {
		return []
	}

	// If requesting more than available, return all in random order
	const sampleCount = Math.min(n, array.length)

	// Fisher-Yates shuffle algorithm (functional approach)
	const indices = Array.from({ length: array.length }, (_, i) => i)
	const selected: Array<number> = []
	
	const selectRandom = (remaining: Array<number>, count: number): Array<number> => {
		if (count === 0 || remaining.length === 0) return selected
		const randomIndex = Math.floor(Math.random() * remaining.length)
		selected.push(remaining[randomIndex])
		return selectRandom(
			[...remaining.slice(0, randomIndex), ...remaining.slice(randomIndex + 1)],
			count - 1
		)
	}
	
	selectRandom(indices, sampleCount)
	return selected.map(i => array[i])
}

export default sampleSize
