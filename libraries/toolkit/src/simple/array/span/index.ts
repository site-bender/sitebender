/**
 * Splits an array at the first element that fails a predicate
 *
 * Returns a tuple of two arrays: the first contains all elements from the
 * beginning that satisfy the predicate, and the second contains the remaining
 * elements starting from the first that failed. This is like a combination of
 * takeWhile and dropWhile in a single pass.
 *
 * @param predicate - Function to test elements
 * @param array - Array to split
 * @returns Tuple of [matching elements, remaining elements]
 * @pure
 * @curried
 * @immutable
 * @safe
 * @example
 * ```typescript
 * // Basic usage
 * span((x: number) => x >= 0)([1, 2, 3, -1, 4, 5])
 * // [[1, 2, 3], [-1, 4, 5]]
 *
 * // Split at condition
 * span((x: number) => x % 2 === 0)([2, 4, 6, 7, 8, 10])
 * // [[2, 4, 6], [7, 8, 10]]
 *
 * // Split objects
 * const users = [
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: true },
 *   { name: "Charlie", active: false }
 * ]
 * span((u: { active: boolean }) => u.active)(users)
 * // [[Alice, Bob], [Charlie]]
 *
 * // Edge cases
 * span((x: number) => x > 0)([1, 2, 3, 4]) // [[1, 2, 3, 4], []]
 * span((x: number) => x > 10)([1, 2, 3]) // [[], [1, 2, 3]]
 * span((x: number) => x > 0)(null) // [[], []]
 * ```
 */
const span = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [Array<T>, Array<T>] => {
	if (array == null || !Array.isArray(array)) {
		return [[], []]
	}

	if (array.length === 0) {
		return [[], []]
	}

	// Find the split point
	const splitIndex = array.findIndex((element, index) =>
		!predicate(element, index, array)
	)

	if (splitIndex === -1) {
		// All elements match the predicate
		return [[...array], []]
	}

	if (splitIndex === 0) {
		// No elements match the predicate
		return [[], [...array]]
	}

	// Split the array at the found index
	return [
		array.slice(0, splitIndex),
		array.slice(splitIndex),
	]
}

export default span
