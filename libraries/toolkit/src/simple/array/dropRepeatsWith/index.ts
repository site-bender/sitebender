/**
 * Returns a new array without consecutive duplicate elements using a comparator
 *
 * Like dropRepeats but uses a custom comparator function to determine equality
 * between consecutive elements. Removes consecutive elements that the comparator
 * considers equal, keeping only the first of each run. Useful for complex objects,
 * custom equality logic, or tolerance-based comparisons.
 *
 * @param comparator - Function to determine if two consecutive elements are equal
 * @param array - Array to remove consecutive duplicates from
 * @returns New array with consecutive duplicates removed per comparator
 * @example
 * ```typescript
 * // Case-insensitive comparison
 * const caseInsensitive = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * dropRepeatsWith(caseInsensitive)(["Hello", "HELLO", "world", "WORLD", "foo"])
 * // ["Hello", "world", "foo"]
 *
 * // Object comparison by property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const items = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 2 }, { id: 1 }]
 * dropRepeatsWith(byId)(items)
 * // [{ id: 1 }, { id: 2 }, { id: 1 }]
 *
 * // Numeric tolerance
 * const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
 * dropRepeatsWith(approxEqual)([1.0, 1.05, 1.08, 1.2, 1.25, 1.5])
 * // [1.0, 1.2, 1.5]
 *
 * // Edge cases
 * dropRepeatsWith((a, b) => a === b)([])           // []
 * dropRepeatsWith((a, b) => a === b)([1])          // [1]
 * dropRepeatsWith(() => true)([1, 2, 3, 4])        // [1]
 * ```
 * @pure
 * @immutable
 * @curried
 * @safe
 */
const dropRepeatsWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	return array.reduce((acc: Array<T>, curr, index) => {
		if (index === 0 || !comparator(curr, array[index - 1])) {
			return [...acc, curr]
		}
		return acc
	}, [])
}

export default dropRepeatsWith
