/**
 * Splits an array at the first element that fails a predicate
 *
 * Returns a tuple of two arrays: the first contains all elements from the
 * beginning that satisfy the predicate, and the second contains the remaining
 * elements starting from the first that failed. This is like a combination of
 * takeWhile and dropWhile in a single pass.
 *
 * @curried (predicate) => (array) => [matching, remaining]
 * @param predicate - Function to test elements
 * @param array - Array to split
 * @returns Tuple of [matching elements, remaining elements]
 * @example
 * ```typescript
 * // Split at first negative number
 * span((x: number) => x >= 0)([1, 2, 3, -1, 4, 5])
 * // [[1, 2, 3], [-1, 4, 5]]
 *
 * // Split at first odd number
 * span((x: number) => x % 2 === 0)([2, 4, 6, 7, 8, 10])
 * // [[2, 4, 6], [7, 8, 10]]
 *
 * // Split strings by length
 * span((s: string) => s.length <= 3)(["a", "ab", "abc", "abcd", "ab"])
 * // [["a", "ab", "abc"], ["abcd", "ab"]]
 *
 * // All elements match
 * span((x: number) => x > 0)([1, 2, 3, 4])
 * // [[1, 2, 3, 4], []]
 *
 * // No elements match
 * span((x: number) => x > 10)([1, 2, 3, 4])
 * // [[], [1, 2, 3, 4]]
 *
 * // Split objects by property
 * const users = [
 *   { name: "Alice", active: true },
 *   { name: "Bob", active: true },
 *   { name: "Charlie", active: false },
 *   { name: "Dave", active: true }
 * ]
 * span((u: { active: boolean }) => u.active)(users)
 * // [
 * //   [{ name: "Alice", active: true }, { name: "Bob", active: true }],
 * //   [{ name: "Charlie", active: false }, { name: "Dave", active: true }]
 * // ]
 *
 * // Split at condition change
 * span((x: number) => x < 5)([1, 2, 3, 4, 5, 6, 3, 2])
 * // [[1, 2, 3, 4], [5, 6, 3, 2]]
 *
 * // Parse command line args
 * const args = ["--verbose", "--output", "file.txt", "input1.txt", "input2.txt"]
 * span((arg: string) => arg.startsWith("--"))(args)
 * // [["--verbose", "--output"], ["file.txt", "input1.txt", "input2.txt"]]
 *
 * // Split sorted array
 * span((x: number) => x <= 50)([10, 20, 30, 40, 50, 60, 70, 80])
 * // [[10, 20, 30, 40, 50], [60, 70, 80]]
 *
 * // Process until delimiter
 * span((x: string) => x !== "STOP")(["go", "continue", "proceed", "STOP", "wait", "halt"])
 * // [["go", "continue", "proceed"], ["STOP", "wait", "halt"]]
 *
 * // Partial application for reusable splitters
 * const splitAtNegative = span((x: number) => x >= 0)
 * splitAtNegative([1, 2, -1, 3])     // [[1, 2], [-1, 3]]
 * splitAtNegative([5, 10, 15])       // [[5, 10, 15], []]
 *
 * const splitAtSpace = span((s: string) => s !== " ")
 * splitAtSpace(["hello", "world", " ", "foo", "bar"])
 * // [["hello", "world"], [" ", "foo", "bar"]]
 *
 * // Edge cases
 * span((x: number) => x > 0)([])         // [[], []]
 * span((x: number) => x > 0)([0])        // [[], [0]]
 *
 * // Handle null/undefined gracefully
 * span((x: number) => x > 0)(null)       // [[], []]
 * span((x: number) => x > 0)(undefined)  // [[], []]
 *
 * // Complex predicate with index
 * span((x: number, i: number) => i < 3 && x > 0)([5, 10, 15, 20, 25])
 * // [[5, 10, 15], [20, 25]]
 *
 * // Categorize data stream
 * const readings = [20, 22, 25, 30, 35, 28, 26, 24]
 * const [normal, elevated] = span((temp: number) => temp < 30)(readings)
 * // normal: [20, 22, 25]
 * // elevated: [30, 35, 28, 26, 24]
 * ```
 * @property Immutable - doesn't modify input array
 * @property Exhaustive - all elements appear in one of the two arrays
 * @property Single-pass - efficiently splits in one traversal
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
