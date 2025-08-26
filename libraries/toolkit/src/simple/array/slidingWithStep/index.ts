/**
 * Creates sliding windows over array with custom step size
 *
 * Generates an array of overlapping or non-overlapping windows of specified
 * size, moving by a custom step amount. When step equals window size, windows
 * don't overlap. When step is less than window size, windows overlap. When
 * step is greater than window size, elements are skipped. Useful for signal
 * processing, time series analysis, and batch processing.
 *
 * @param size - Size of each window
 * @param step - Number of elements to move for next window
 * @param array - Array to create windows from
 * @returns Array of window arrays
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic sliding with step
 * slidingWithStep(3, 1)([1, 2, 3, 4, 5])
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * // Non-overlapping windows
 * slidingWithStep(3, 3)([1, 2, 3, 4, 5, 6, 7, 8, 9])
 * // [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
 *
 * // Skip elements (step > size)
 * slidingWithStep(2, 3)([1, 2, 3, 4, 5, 6, 7, 8])
 * // [[1, 2], [4, 5], [7, 8]]
 *
 * // Moving average windows
 * const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const windows = slidingWithStep(3, 1)(data)
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5], ...]
 *
 * // Edge cases
 * slidingWithStep(5, 1)([1, 2, 3]) // []
 * slidingWithStep(3, 1)([]) // []
 * ```
 */
const slidingWithStep =
	<T>(size: number, step: number) => (array: Array<T>): Array<Array<T>> => {
		if (size <= 0 || step <= 0) return []
		if (array.length < size) return []

		// Use recursion instead of for loop
		const buildWindows = (index: number): Array<Array<T>> => {
			if (index > array.length - size) return []
			return [array.slice(index, index + size), ...buildWindows(index + step)]
		}

		return buildWindows(0)
	}

export default slidingWithStep
