/**
 * Creates sliding windows over array with custom step size
 * 
 * Generates an array of overlapping or non-overlapping windows of specified
 * size, moving by a custom step amount. When step equals window size, windows
 * don't overlap. When step is less than window size, windows overlap. When
 * step is greater than window size, elements are skipped. Useful for signal
 * processing, time series analysis, and batch processing.
 * 
 * @curried (size, step) => (array) => windows
 * @param size - Size of each window
 * @param step - Number of elements to move for next window
 * @param array - Array to create windows from
 * @returns Array of window arrays
 * @example
 * ```typescript
 * // Basic sliding with step
 * slidingWithStep(3, 1)([1, 2, 3, 4, 5])
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 * 
 * // Non-overlapping windows (step equals size)
 * slidingWithStep(3, 3)([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 * 
 * // Overlapping windows (step less than size)
 * slidingWithStep(4, 2)([1, 2, 3, 4, 5, 6, 7, 8])
 * // [[1, 2, 3, 4], [3, 4, 5, 6], [5, 6, 7, 8]]
 * 
 * // Skip elements (step greater than size)
 * slidingWithStep(2, 3)([1, 2, 3, 4, 5, 6, 7, 8])
 * // [[1, 2], [4, 5], [7, 8]]
 * 
 * // Step of 1 (maximum overlap)
 * slidingWithStep(3, 1)(["a", "b", "c", "d"])
 * // [["a", "b", "c"], ["b", "c", "d"]]
 * 
 * // Window size 1
 * slidingWithStep(1, 2)([1, 2, 3, 4, 5])
 * // [[1], [3], [5]]
 * 
 * // Empty array
 * slidingWithStep(3, 1)([])
 * // []
 * 
 * // Array shorter than window
 * slidingWithStep(5, 1)([1, 2, 3])
 * // []
 * 
 * // Array equal to window size
 * slidingWithStep(3, 1)([1, 2, 3])
 * // [[1, 2, 3]]
 * 
 * // Large step (sampling)
 * slidingWithStep(1, 10)([...Array(100).keys()])
 * // [[0], [10], [20], [30], [40], [50], [60], [70], [80], [90]]
 * 
 * // Moving average calculation
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const windows = slidingWithStep(3, 1)(data)
 * const movingAverages = windows.map(
 *   window => window.reduce((a, b) => a + b, 0) / window.length
 * )
 * // [2, 3, 4, 5, 6, 7, 8, 9]
 * 
 * // Batch processing
 * const items = ["a", "b", "c", "d", "e", "f", "g", "h"]
 * const batches = slidingWithStep(3, 3)(items)  // Non-overlapping
 * // [["a", "b", "c"], ["d", "e", "f"], ["g", "h"]]
 * // Note: Last batch may be incomplete
 * 
 * // N-gram generation
 * const text = "hello world"
 * const trigrams = slidingWithStep(3, 1)([...text])
 * // [["h", "e", "l"], ["e", "l", "l"], ["l", "l", "o"], ...]
 * 
 * // Time series windows
 * const hourlyData = [10, 12, 15, 14, 16, 18, 20, 22, 19, 17]
 * const fourHourWindows = slidingWithStep(4, 2)(hourlyData)
 * // [[10, 12, 15, 14], [15, 14, 16, 18], [16, 18, 20, 22], [20, 22, 19, 17]]
 * 
 * // Feature extraction windows
 * const signal = [0.1, 0.2, 0.3, 0.5, 0.8, 0.7, 0.4, 0.2]
 * const features = slidingWithStep(3, 2)(signal)
 * // [[0.1, 0.2, 0.3], [0.3, 0.5, 0.8], [0.8, 0.7, 0.4]]
 * 
 * // Convolution-like operation
 * const input = [1, 2, 3, 4, 5]
 * const kernel = [0.5, 1, 0.5]  // Kernel size 3
 * const convWindows = slidingWithStep(kernel.length, 1)(input)
 * const convolution = convWindows.map(window =>
 *   window.reduce((sum, val, i) => sum + val * kernel[i], 0)
 * )
 * // [2.5, 4, 5.5]
 * 
 * // Stride in neural networks
 * const image = [
 *   1, 2, 3, 4,
 *   5, 6, 7, 8,
 *   9, 10, 11, 12,
 *   13, 14, 15, 16
 * ]
 * // 2x2 windows with stride 2
 * const patches = slidingWithStep(2, 2)(image)
 * // [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16]]
 * 
 * // Overlapping chunks for context
 * const document = ["Introduction", "Background", "Methods", "Results", "Discussion", "Conclusion"]
 * const contextWindows = slidingWithStep(3, 2)(document)
 * // [["Introduction", "Background", "Methods"], 
 * //  ["Methods", "Results", "Discussion"]]
 * ```
 * @property Pure - No side effects
 * @property Immutable - Does not modify input array
 * @property Lazy-friendly - Could be implemented as generator for large arrays
 */
const slidingWithStep = <T>(size: number, step: number) => 
	(array: Array<T>): Array<Array<T>> => {
		if (size <= 0 || step <= 0) return []
		if (array.length < size) return []
		
		const result: Array<Array<T>> = []
		
		for (let i = 0; i <= array.length - size; i += step) {
			result.push(array.slice(i, i + size))
		}
		
		return result
	}

export default slidingWithStep