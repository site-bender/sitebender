/**
 * Returns a new array without consecutive duplicate elements
 *
 * Removes consecutive duplicate elements from an array, keeping only the
 * first occurrence of each run of duplicates. Uses SameValueZero equality
 * for comparison. This is useful for cleaning up data with repeated values,
 * compressing sequences, or removing stuttering in time series data.
 *
 * @param array - Array to remove consecutive duplicates from
 * @returns New array with consecutive duplicates removed
 * @example
 * ```typescript
 * // Basic usage
 * dropRepeats([1, 1, 2, 2, 2, 3, 3, 1, 1])
 * // [1, 2, 3, 1]
 *
 * dropRepeats(["a", "a", "b", "b", "c", "c", "c", "a"])
 * // ["a", "b", "c", "a"]
 *
 *
 * // Object references
 * const obj = { id: 1 }
 * dropRepeats([obj, obj, { id: 1 }, obj])
 * // [obj, { id: 1 }, obj] (different references)
 *
 * // Edge cases
 * dropRepeats([])          // []
 * dropRepeats([1])         // [1]
 * dropRepeats([5, 5, 5])   // [5]
 *
 * // NaN handling (SameValueZero equality)
 * dropRepeats([NaN, NaN, 1, 1, NaN])
 * // [NaN, 1, NaN]
 *
 * // Practical: state changes
 * const states = ["loading", "loading", "ready", "ready", "error", "ready"]
 * dropRepeats(states)
 * // ["loading", "ready", "error", "ready"]
 * ```
 * @pure
 * @immutable
 * @safe
 */
const dropRepeats = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	return array.reduce((acc: Array<T>, curr, index) => {
		if (index === 0 || !Object.is(curr, array[index - 1])) {
			return [...acc, curr]
		}
		return acc
	}, [])
}

export default dropRepeats
