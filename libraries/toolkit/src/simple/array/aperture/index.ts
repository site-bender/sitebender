/**
 * Returns a new array of consecutive n-tuples (sliding window)
 *
 * Creates a sliding window of specified size over an array, returning
 * an array of consecutive n-tuples. Each tuple contains n consecutive
 * elements from the original array. The window moves one position at
 * a time, creating overlapping groups. Returns empty array if the
 * window size is larger than the array length.
 *
 * @curried (n) => (array) => result
 * @param n - Size of each tuple (window size)
 * @param array - Array to create sliding window over
 * @returns Array of n-tuples from consecutive elements
 * @example
 * ```typescript
 * // Sliding window of size 2 (pairs)
 * aperture(2)([1, 2, 3, 4, 5])
 * // [[1, 2], [2, 3], [3, 4], [4, 5]]
 *
 * // Sliding window of size 3 (triples)
 * aperture(3)([1, 2, 3, 4, 5])
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * // Window size 1 (wraps each element)
 * aperture(1)([1, 2, 3])
 * // [[1], [2], [3]]
 *
 * // Window larger than array (returns empty)
 * aperture(5)([1, 2, 3])
 * // []
 *
 * // Window equals array length (returns single tuple)
 * aperture(3)([1, 2, 3])
 * // [[1, 2, 3]]
 *
 * // String array
 * aperture(2)(["a", "b", "c", "d"])
 * // [["a", "b"], ["b", "c"], ["c", "d"]]
 *
 * // Moving averages calculation
 * const numbers = [10, 20, 30, 40, 50, 60]
 * const windows = aperture(3)(numbers)
 * // [[10, 20, 30], [20, 30, 40], [30, 40, 50], [40, 50, 60]]
 * const movingAverages = windows.map(w => w.reduce((a, b) => a + b, 0) / w.length)
 * // [20, 30, 40, 50]
 *
 * // Text analysis - bigrams
 * const words = ["the", "quick", "brown", "fox", "jumps"]
 * aperture(2)(words)
 * // [["the", "quick"], ["quick", "brown"], ["brown", "fox"], ["fox", "jumps"]]
 *
 * // Text analysis - trigrams
 * aperture(3)(words)
 * // [["the", "quick", "brown"], ["quick", "brown", "fox"], ["brown", "fox", "jumps"]]
 *
 * // Pattern detection
 * const data = [1, 2, 3, 2, 1, 2, 3]
 * const patterns = aperture(3)(data)
 * // [[1, 2, 3], [2, 3, 2], [3, 2, 1], [2, 1, 2], [1, 2, 3]]
 *
 * // Time series analysis
 * const temperatures = [20, 22, 25, 24, 23, 26, 28]
 * aperture(2)(temperatures).map(([prev, curr]) => curr - prev)
 * // [2, 3, -1, -1, 3, 2] (temperature changes)
 *
 * // Overlapping date ranges
 * const dates = ["2024-01", "2024-02", "2024-03", "2024-04"]
 * aperture(2)(dates).map(([start, end]) => `${start} to ${end}`)
 * // ["2024-01 to 2024-02", "2024-02 to 2024-03", "2024-03 to 2024-04"]
 *
 * // Empty array
 * aperture(2)([])
 * // []
 *
 * // Single element (window too large)
 * aperture(2)([1])
 * // []
 *
 * // Zero window size (returns empty)
 * aperture(0)([1, 2, 3])
 * // []
 *
 * // Negative window size (returns empty)
 * aperture(-1)([1, 2, 3])
 * // []
 *
 * // Partial application for specific window sizes
 * const pairwise = aperture(2)
 * pairwise([1, 2, 3, 4])
 * // [[1, 2], [2, 3], [3, 4]]
 *
 * const triplewise = aperture(3)
 * triplewise(["a", "b", "c", "d", "e"])
 * // [["a", "b", "c"], ["b", "c", "d"], ["c", "d", "e"]]
 *
 * // Detect sequences
 * const isIncreasing = ([a, b]: [number, number]) => b > a
 * const sequence = [1, 2, 3, 2, 3, 4, 5]
 * aperture(2)(sequence).map(isIncreasing)
 * // [true, true, false, true, true, true]
 *
 * // Find local minima/maxima
 * const values = [3, 1, 4, 1, 5, 9, 2]
 * aperture(3)(values).map(([a, b, c]) =>
 *   b < a && b < c ? "min" : b > a && b > c ? "max" : "neither"
 * )
 * // ["min", "max", "min", "neither", "max"]
 *
 * // Handle null/undefined gracefully
 * aperture(2)(null)       // []
 * aperture(2)(undefined)  // []
 *
 * // Mixed types
 * aperture(2)([1, "two", 3, "four"])
 * // [[1, "two"], ["two", 3], [3, "four"]]
 *
 * // Objects in tuples
 * const items = [
 *   { id: 1, value: "a" },
 *   { id: 2, value: "b" },
 *   { id: 3, value: "c" }
 * ]
 * aperture(2)(items)
 * // [
 * //   [{ id: 1, value: "a" }, { id: 2, value: "b" }],
 * //   [{ id: 2, value: "b" }, { id: 3, value: "c" }]
 * // ]
 *
 * // Build context-aware transformations
 * const context = aperture(3)(["start", "middle", "end", "extra"])
 * // [["start", "middle", "end"], ["middle", "end", "extra"]]
 * context.map(([prev, curr, next]) => ({
 *   previous: prev,
 *   current: curr,
 *   next: next
 * }))
 * // [
 * //   { previous: "start", current: "middle", next: "end" },
 * //   { previous: "middle", current: "end", next: "extra" }
 * // ]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Sliding - creates overlapping windows
 * @property Type-safe - preserves element types in tuples
 */
const aperture = <T>(
	n: number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array)) {
		return []
	}

	if (n <= 0 || n > array.length) {
		return []
	}

	const result: Array<Array<T>> = []

	// Create sliding window of size n
	for (let i = 0; i <= array.length - n; i++) {
		result.push(array.slice(i, i + n))
	}

	return result
}

export default aperture
