import isNullish from "../../validation/isNullish/index.ts"

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
 * @param comparator - Function that compares two elements (returns negative if a < b)
 * @param array - Array to find minimum element from
 * @returns Minimum element according to comparator, or undefined if array is empty
 *
 * @pure
 * @curried
 * @immutable
 * @safe
 *
 * @example
 * ```typescript
 * // Simple numeric comparison
 * const numCompare = (a: number, b: number) => a - b
 * minimumBy(numCompare)([3, 1, 4, 1, 5, 9, 2]) // 1
 *
 * // String length comparison
 * const byLength = (a: string, b: string) => a.length - b.length
 * minimumBy(byLength)(["aaa", "b", "cc", "dddd"]) // "b"
 *
 * // Object property comparison
 * const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
 * const people = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 35 }
 * ]
 * minimumBy(byAge)(people) // { name: "Bob", age: 25 }
 *
 * // Partial application
 * const getYoungest = minimumBy((a: { age: number }, b: { age: number }) => a.age - b.age)
 * getYoungest([{ age: 30 }, { age: 20 }]) // { age: 20 }
 *
 * // Edge cases
 * minimumBy((a: number, b: number) => a - b)([42]) // 42
 * minimumBy((a: number, b: number) => a - b)([]) // undefined
 * minimumBy((a: number, b: number) => a - b)(null) // undefined
 * ```
 */
const minimumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || array.length === 0) {
		return undefined
	}

	const findMinimum = (
		arr: ReadonlyArray<T>,
		currentMin: T,
		index: number,
	): T => {
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
