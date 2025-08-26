/**
 * Takes elements from the end while predicate is true
 *
 * Returns a new array containing elements from the end of the input array,
 * taking elements as long as the predicate returns true. Stops at the first
 * element (scanning from the end) where the predicate returns false. Useful
 * for extracting trailing elements that match a condition, suffix extraction,
 * or reverse filtering.
 *
 * @param predicate - Function to test each element (from the end)
 * @param array - Array to take elements from
 * @returns New array with trailing elements that satisfy predicate
 * @example
 * ```typescript
 * // Basic usage - take trailing numbers > 3
 * takeLastWhile((x: number) => x > 3)([1, 2, 5, 4, 6, 7])  // [4, 6, 7]
 * takeLastWhile(Boolean)([1, 2, 0, 3, 4, 5])               // [3, 4, 5]
 *
 * // Extract trailing matching elements
 * const tags = ["<div>", "<p>", "text", "</p>", "</div>"]
 * takeLastWhile((tag: string) => tag.startsWith("</"))(tags)
 * // ["</p>", "</div>"]
 *
 * // Take completed tasks from end
 * const tasks = [
 *   { id: 1, done: false },
 *   { id: 2, done: false },
 *   { id: 3, done: true },
 *   { id: 4, done: true }
 * ]
 * takeLastWhile((t: { done: boolean }) => t.done)(tasks)
 * // [{ id: 3, done: true }, { id: 4, done: true }]
 *
 * // Edge cases
 * takeLastWhile((x: number) => x > 10)([1, 2, 3])  // [] (none match)
 * takeLastWhile((x: number) => x < 10)([1, 2, 3])  // [1, 2, 3] (all match)
 * takeLastWhile((x: any) => true)([])              // []
 *
 * // Null/undefined handling
 * takeLastWhile((x: any) => true)(null)       // []
 * takeLastWhile((x: any) => true)(undefined)  // []
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const takeLastWhile = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Find the index where predicate becomes false (scanning from end)
	const findBreakpoint = (idx: number): number => {
		if (idx < 0 || !predicate(array[idx], idx, array)) {
			return idx
		}
		return findBreakpoint(idx - 1)
	}
	
	const breakpoint = findBreakpoint(array.length - 1)
	return array.slice(breakpoint + 1)
}

export default takeLastWhile
