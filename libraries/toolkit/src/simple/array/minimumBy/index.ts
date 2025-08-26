/**
 * Finds the minimum element according to a comparator function
 *
 * Returns the element from the array that is smallest according to the
 * provided comparator function. The comparator should return a positive
 * number if the first argument is greater, negative if smaller, and zero
 * if equal (like standard sort comparators). Returns undefined for empty
 * arrays. Useful for finding minimum by custom criteria, complex comparisons,
 * or multi-field sorting.
 *
 * @curried
 * @param comparator - Function that compares two elements (returns negative if a < b)
 * @param array - Array to find minimum element from
 * @returns Minimum element according to comparator, or undefined if array is empty
 * @example
 * ```typescript
 * // Simple numeric comparison
 * const numCompare = (a: number, b: number) => a - b
 * minimumBy(numCompare)([3, 1, 4, 1, 5, 9, 2])
 * // 1
 *
 * // String length comparison
 * const byLength = (a: string, b: string) => a.length - b.length
 * minimumBy(byLength)(["aaa", "b", "cc", "dddd"])
 * // "b"
 *
 * // Object property comparison
 * const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
 * const people = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 35 }
 * ]
 * minimumBy(byAge)(people)
 * // { name: "Bob", age: 25 }
 *
 * // Multi-field comparison
 * type Score = { points: number; time: number }
 * const byScore = (a: Score, b: Score) => {
 *   if (a.points !== b.points) return a.points - b.points
 *   return a.time - b.time  // Lower time is better if points are equal
 * }
 * const scores: Score[] = [
 *   { points: 95, time: 50 },
 *   { points: 95, time: 45 },
 *   { points: 100, time: 40 }
 * ]
 * minimumBy(byScore)(scores)
 * // { points: 95, time: 45 }
 *
 * // Date comparison (earliest)
 * const byDate = (a: Date, b: Date) => a.getTime() - b.getTime()
 * const dates = [
 *   new Date("2024-03-10"),
 *   new Date("2024-01-15"),
 *   new Date("2024-02-20")
 * ]
 * minimumBy(byDate)(dates)
 * // Date("2024-01-15")
 *
 * // Alphabetical comparison
 * const alphabetical = (a: string, b: string) => a.localeCompare(b)
 * minimumBy(alphabetical)(["zebra", "apple", "mango", "banana"])
 * // "apple"
 *
 * // Distance to origin
 * type Point = { x: number; y: number }
 * const byDistance = (a: Point, b: Point) => {
 *   const distA = Math.sqrt(a.x * a.x + a.y * a.y)
 *   const distB = Math.sqrt(b.x * b.x + b.y * b.y)
 *   return distA - distB
 * }
 * const points: Point[] = [
 *   { x: 3, y: 4 },
 *   { x: 1, y: 1 },
 *   { x: 5, y: 0 }
 * ]
 * minimumBy(byDistance)(points)
 * // { x: 1, y: 1 }
 *
 * // Single element
 * minimumBy((a: number, b: number) => a - b)([42])
 * // 42
 *
 * // Empty array
 * minimumBy((a: number, b: number) => a - b)([])
 * // undefined
 * ```
 * @pure
 * @immutable
 * @safe
 */
const minimumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return undefined
	}

	const findMinimum = (arr: ReadonlyArray<T>, currentMin: T, index: number): T => {
		if (index >= arr.length) {
			return currentMin
		}
		const current = arr[index]
		const newMin = comparator(current, currentMin) < 0 ? current : currentMin
		return findMinimum(arr, newMin, index + 1)
	}

	return findMinimum(array, array[0], 1)
}

export default minimumBy