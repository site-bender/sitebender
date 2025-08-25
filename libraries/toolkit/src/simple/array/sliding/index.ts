/**
 * Creates a sliding window over an array
 *
 * Returns an array of overlapping windows of specified size, moving by
 * a specified step. Each window is a view of consecutive elements.
 * Useful for analyzing patterns, computing moving averages, or examining
 * local neighborhoods in data.
 *
 * @curried (size) => (step) => (array) => result
 * @param size - Size of each window (must be positive)
 * @param step - Number of elements to advance between windows (default 1)
 * @param array - Array to create windows from
 * @returns Array of window arrays
 * @example
 * ```typescript
 * // Basic sliding window (step=1)
 * sliding(3)(1)([1, 2, 3, 4, 5])
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * // Sliding window with step=2
 * sliding(3)(2)([1, 2, 3, 4, 5, 6, 7])
 * // [[1, 2, 3], [3, 4, 5], [5, 6, 7]]
 *
 * // Pairwise comparison (size=2, step=1)
 * sliding(2)(1)([1, 2, 3, 4])
 * // [[1, 2], [2, 3], [3, 4]]
 *
 * // Non-overlapping windows (step=size)
 * sliding(3)(3)([1, 2, 3, 4, 5, 6, 7, 8])
 * // [[1, 2, 3], [4, 5, 6]]  (incomplete window [7, 8] excluded)
 *
 * // Window larger than array
 * sliding(5)(1)([1, 2, 3])
 * // []  (no complete windows possible)
 *
 * // Moving average calculation
 * const numbers = [10, 20, 30, 40, 50, 60]
 * const windows = sliding(3)(1)(numbers)
 * // [[10, 20, 30], [20, 30, 40], [30, 40, 50], [40, 50, 60]]
 * // Can map to averages: [20, 30, 40, 50]
 *
 * // Text analysis - trigrams
 * sliding(3)(1)(["the", "quick", "brown", "fox", "jumps"])
 * // [["the", "quick", "brown"], ["quick", "brown", "fox"], ["brown", "fox", "jumps"]]
 *
 * // Pattern detection
 * const data = [1, 2, 1, 2, 1, 2, 3]
 * sliding(2)(1)(data)
 * // [[1, 2], [2, 1], [1, 2], [2, 1], [1, 2], [2, 3]]
 * // Can check for [1, 2] pattern
 *
 * // Time series analysis
 * const temperatures = [20, 22, 25, 23, 21, 19, 18]
 * sliding(3)(1)(temperatures)
 * // [[20, 22, 25], [22, 25, 23], [25, 23, 21], [23, 21, 19], [21, 19, 18]]
 * // Can analyze local trends
 *
 * // Partial application for reusable windowers
 * const pairwise = sliding(2)(1)
 * pairwise([1, 2, 3, 4])        // [[1, 2], [2, 3], [3, 4]]
 * pairwise(["a", "b", "c"])      // [["a", "b"], ["b", "c"]]
 *
 * const triplets = sliding(3)(1)
 * triplets([1, 2, 3, 4, 5])     // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * const everyOther = sliding(2)(2)
 * everyOther([1, 2, 3, 4, 5, 6]) // [[1, 2], [3, 4], [5, 6]]
 *
 * // Edge cases
 * sliding(3)(1)([])          // []
 * sliding(3)(1)([1, 2])      // []  (not enough elements)
 * sliding(0)(1)([1, 2, 3])   // []  (invalid size)
 * sliding(3)(0)([1, 2, 3])   // []  (invalid step)
 * sliding(3)(-1)([1, 2, 3])  // []  (invalid step)
 *
 * // Handle null/undefined gracefully
 * sliding(2)(1)(null)        // []
 * sliding(2)(1)(undefined)   // []
 *
 * // Complex sliding window for context
 * const words = ["I", "love", "functional", "programming", "patterns"]
 * sliding(3)(2)(words)
 * // [["I", "love", "functional"], ["functional", "programming", "patterns"]]
 *
 * // Sliding window for convolution
 * const signal = [1, 2, 3, 4, 5, 4, 3, 2, 1]
 * const kernel = [0.25, 0.5, 0.25]  // smoothing kernel
 * sliding(kernel.length)(1)(signal)
 * // Can convolve with kernel for smoothing
 * ```
 * @property Immutable - doesn't modify input array
 * @property Overlapping - windows can share elements (when step < size)
 * @property Complete - only returns complete windows of specified size
 */
const sliding = <T>(
	size: number,
) =>
(
	step: number = 1,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	if (
		size <= 0 || step <= 0 || !Number.isInteger(size) || !Number.isInteger(step)
	) {
		return []
	}

	if (array.length < size) {
		return []
	}

	// Build windows using recursion
	const slideRecursive = (startIndex: number): Array<Array<T>> => {
		if (startIndex + size > array.length) {
			return []
		}

		const window = array.slice(startIndex, startIndex + size)
		const nextIndex = startIndex + step

		return [window, ...slideRecursive(nextIndex)]
	}

	return slideRecursive(0)
}

export default sliding
