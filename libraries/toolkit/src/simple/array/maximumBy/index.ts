/**
 * Finds the maximum element according to a comparator function
 *
 * Returns the element from the array that is greatest according to the
 * provided comparator function. The comparator should return a positive
 * number if the first argument is greater, negative if smaller, and zero
 * if equal (like standard sort comparators). Returns undefined for empty
 * arrays. Useful for finding maximum by custom criteria, complex comparisons,
 * or multi-field sorting.
 *
 * @curried
 * @param comparator - Function that compares two elements (returns positive if a > b)
 * @param array - Array to find maximum element from
 * @returns Maximum element according to comparator, or undefined if array is empty
 * @example
 * ```typescript
 * // Simple numeric comparison
 * const numCompare = (a: number, b: number) => a - b
 * maximumBy(numCompare)([3, 1, 4, 1, 5, 9, 2])
 * // 9
 *
 * // String length comparison
 * const byLength = (a: string, b: string) => a.length - b.length
 * maximumBy(byLength)(["a", "bbb", "cc", "dddd"])
 * // "dddd"
 *
 * // Object property comparison
 * const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
 * const people = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 35 }
 * ]
 * maximumBy(byAge)(people)
 * // { name: "Charlie", age: 35 }
 *
 * // Multi-field comparison
 * type Score = { points: number; time: number }
 * const byScore = (a: Score, b: Score) => {
 *   if (a.points !== b.points) return a.points - b.points
 *   return b.time - a.time  // Lower time is better if points are equal
 * }
 * const scores: Score[] = [
 *   { points: 100, time: 50 },
 *   { points: 100, time: 45 },
 *   { points: 95, time: 40 }
 * ]
 * maximumBy(byScore)(scores)
 * // { points: 100, time: 45 }
 *
 * // Date comparison
 * const byDate = (a: Date, b: Date) => a.getTime() - b.getTime()
 * const dates = [
 *   new Date("2024-01-15"),
 *   new Date("2024-03-10"),
 *   new Date("2024-02-20")
 * ]
 * maximumBy(byDate)(dates)
 * // Date("2024-03-10")
 *
 * // Alphabetical comparison (reverse for maximum)
 * const alphabetical = (a: string, b: string) => a.localeCompare(b)
 * maximumBy(alphabetical)(["zebra", "apple", "mango", "banana"])
 * // "zebra"
 *
 * // Single element
 * maximumBy((a: number, b: number) => a - b)([42])
 * // 42
 *
 * // Empty array
 * maximumBy((a: number, b: number) => a - b)([])
 * // undefined
 * ```
 * @pure
 * @immutable
 * @safe
 */
const maximumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return undefined
	}

	const findMaximum = (arr: ReadonlyArray<T>, currentMax: T, index: number): T => {
		if (index >= arr.length) {
			return currentMax
		}
		const current = arr[index]
		const newMax = comparator(current, currentMax) > 0 ? current : currentMax
		return findMaximum(arr, newMax, index + 1)
	}

	return findMaximum(array, array[0], 1)
}

export default maximumBy