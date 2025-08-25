/**
 * Returns an array of adjacent pairs from the input array
 *
 * Creates a new array where each element is a tuple of two consecutive
 * elements from the original array. This is equivalent to a sliding window
 * of size 2 with step 1. Returns empty array if input has fewer than 2
 * elements. Useful for comparing adjacent elements, calculating differences,
 * or processing sequences pairwise.
 *
 * @param array - Array to create pairs from
 * @returns Array of adjacent pairs [element, nextElement]
 * @example
 * ```typescript
 * // Basic pairing
 * pairwise([1, 2, 3, 4, 5])
 * // [[1, 2], [2, 3], [3, 4], [4, 5]]
 *
 * // String pairs
 * pairwise(["a", "b", "c", "d"])
 * // [["a", "b"], ["b", "c"], ["c", "d"]]
 *
 * // Calculate differences between adjacent elements
 * const numbers = [10, 15, 12, 20, 18]
 * pairwise(numbers).map(([a, b]) => b - a)
 * // [5, -3, 8, -2]
 *
 * // Detect transitions
 * const states = ["idle", "idle", "active", "active", "idle"]
 * pairwise(states).map(([prev, curr]) =>
 *   prev !== curr ? `${prev}->${curr}` : "no change"
 * )
 * // ["no change", "idle->active", "no change", "active->idle"]
 *
 * // Find increasing pairs
 * const values = [3, 1, 4, 1, 5, 9, 2]
 * pairwise(values).filter(([a, b]) => b > a)
 * // [[1, 4], [1, 5], [5, 9]]
 *
 * // Date comparisons
 * const dates = [
 *   new Date("2024-01-01"),
 *   new Date("2024-01-05"),
 *   new Date("2024-01-03"),
 *   new Date("2024-01-10")
 * ]
 * pairwise(dates).map(([d1, d2]) => ({
 *   from: d1.toISOString().split("T")[0],
 *   to: d2.toISOString().split("T")[0],
 *   days: (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)
 * }))
 * // [
 * //   { from: "2024-01-01", to: "2024-01-05", days: 4 },
 * //   { from: "2024-01-05", to: "2024-01-03", days: -2 },
 * //   { from: "2024-01-03", to: "2024-01-10", days: 7 }
 * // ]
 *
 * // Build ranges
 * const points = [0, 10, 25, 50, 100]
 * pairwise(points).map(([start, end]) => ({ start, end, size: end - start }))
 * // [
 * //   { start: 0, end: 10, size: 10 },
 * //   { start: 10, end: 25, size: 15 },
 * //   { start: 25, end: 50, size: 25 },
 * //   { start: 50, end: 100, size: 50 }
 * // ]
 *
 * // Two elements (single pair)
 * pairwise([1, 2])
 * // [[1, 2]]
 *
 * // Single element (no pairs)
 * pairwise([42])
 * // []
 *
 * // Empty array
 * pairwise([])
 * // []
 *
 * // Movement detection
 * const positions = [
 *   { x: 0, y: 0 },
 *   { x: 1, y: 0 },
 *   { x: 1, y: 1 },
 *   { x: 0, y: 1 }
 * ]
 * pairwise(positions).map(([from, to]) => ({
 *   dx: to.x - from.x,
 *   dy: to.y - from.y,
 *   distance: Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2)
 * }))
 * // [
 * //   { dx: 1, dy: 0, distance: 1 },
 * //   { dx: 0, dy: 1, distance: 1 },
 * //   { dx: -1, dy: 0, distance: 1 }
 * // ]
 *
 * // Check sorted property
 * const nums = [1, 2, 3, 2, 1]
 * pairwise(nums).every(([a, b]) => a <= b)
 * // false (not sorted)
 *
 * // Create edges for graph
 * const nodes = ["A", "B", "C", "D", "E"]
 * const edges = pairwise(nodes)
 * // [["A", "B"], ["B", "C"], ["C", "D"], ["D", "E"]]
 *
 * // Time intervals
 * const timestamps = [1000, 1500, 1800, 2500, 3000]
 * pairwise(timestamps).map(([start, end]) => ({
 *   interval: [start, end],
 *   duration: end - start
 * }))
 * // [
 * //   { interval: [1000, 1500], duration: 500 },
 * //   { interval: [1500, 1800], duration: 300 },
 * //   { interval: [1800, 2500], duration: 700 },
 * //   { interval: [2500, 3000], duration: 500 }
 * // ]
 *
 * // Pattern matching
 * const pattern = ["A", "B", "A", "B", "A"]
 * pairwise(pattern).map(([a, b]) => `${a}${b}`)
 * // ["AB", "BA", "AB", "BA"]
 *
 * // Sliding average
 * const temps = [20, 22, 25, 24, 23, 26]
 * pairwise(temps).map(([a, b]) => (a + b) / 2)
 * // [21, 23.5, 24.5, 23.5, 24.5]
 *
 * // Mixed types
 * pairwise([1, "two", 3, "four"])
 * // [[1, "two"], ["two", 3], [3, "four"]]
 *
 * // Handle null/undefined gracefully
 * pairwise(null)       // []
 * pairwise(undefined)  // []
 *
 * // Detect duplicates
 * const items = ["a", "a", "b", "c", "c", "c", "d"]
 * pairwise(items).filter(([a, b]) => a === b)
 * // [["a", "a"], ["c", "c"], ["c", "c"]]
 *
 * // Build comparison table
 * const scores = [85, 90, 88, 92, 87]
 * pairwise(scores).map(([prev, curr], i) => ({
 *   from: i,
 *   to: i + 1,
 *   change: curr - prev,
 *   trend: curr > prev ? "up" : curr < prev ? "down" : "same"
 * }))
 * // [
 * //   { from: 0, to: 1, change: 5, trend: "up" },
 * //   { from: 1, to: 2, change: -2, trend: "down" },
 * //   { from: 2, to: 3, change: 4, trend: "up" },
 * //   { from: 3, to: 4, change: -5, trend: "down" }
 * // ]
 *
 * // Animation frames
 * const frames = ["frame1", "frame2", "frame3", "frame4"]
 * pairwise(frames).map(([current, next]) => ({
 *   from: current,
 *   to: next,
 *   transition: `${current}-to-${next}`
 * }))
 * // [
 * //   { from: "frame1", to: "frame2", transition: "frame1-to-frame2" },
 * //   { from: "frame2", to: "frame3", transition: "frame2-to-frame3" },
 * //   { from: "frame3", to: "frame4", transition: "frame3-to-frame4" }
 * // ]
 *
 * // Note: For overlapping windows of different sizes, use aperture
 * // pairwise(arr) is equivalent to aperture(2)(arr)
 * ```
 * @property Immutable - doesn't modify input array
 * @property Adjacent-only - pairs consecutive elements
 * @property Type-preserving - maintains element types in tuples
 */
const pairwise = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<[T, T]> => {
	if (array == null || !Array.isArray(array) || array.length < 2) {
		return []
	}

	const result: Array<[T, T]> = []

	for (let i = 0; i < array.length - 1; i++) {
		result.push([array[i], array[i + 1]])
	}

	return result
}

export default pairwise
