import isNullish from "../../validation/isNullish/index.ts"

/**
 * Creates a sliding window over an array
 *
 * Returns an array of overlapping windows of specified size, moving by
 * a specified step. Each window is a view of consecutive elements.
 * Useful for analyzing patterns, computing moving averages, or examining
 * local neighborhoods in data.
 *
 * @param size - Size of each window (must be positive)
 * @param step - Number of elements to advance between windows (default 1)
 * @param array - Array to create windows from
 * @returns Array of window arrays
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic sliding window
 * sliding(3)(1)([1, 2, 3, 4, 5])
 * // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * // With custom step
 * sliding(3)(2)([1, 2, 3, 4, 5, 6, 7])
 * // [[1, 2, 3], [3, 4, 5], [5, 6, 7]]
 *
 * // Pairwise windows
 * const pairwise = sliding(2)(1)
 * pairwise([1, 2, 3, 4]) // [[1, 2], [2, 3], [3, 4]]
 *
 * // Edge cases
 * sliding(5)(1)([1, 2, 3]) // []
 * sliding(2)(1)(null) // []
 * sliding(0)(1)([1, 2, 3]) // []
 * ```
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
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
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
