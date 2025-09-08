import isNullish from "../../validation/isNullish/index.ts"

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
 * @param comparator - Function that compares two elements (returns positive if a > b)
 * @param array - Array to find maximum element from
 * @returns Maximum element according to comparator, or undefined if array is empty
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
 * maximumBy(numCompare)([3, 1, 4, 1, 5, 9, 2]) // 9
 *
 * // String length comparison
 * const byLength = (a: string, b: string) => a.length - b.length
 * maximumBy(byLength)(["a", "bbb", "cc", "dddd"]) // "dddd"
 *
 * // Object property comparison
 * const byAge = (a: { age: number }, b: { age: number }) => a.age - b.age
 * const people = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 },
 *   { name: "Charlie", age: 35 }
 * ]
 * maximumBy(byAge)(people) // { name: "Charlie", age: 35 }
 *
 * // Partial application
 * const getOldest = maximumBy((a: { age: number }, b: { age: number }) => a.age - b.age)
 * getOldest([{ age: 30 }, { age: 40 }]) // { age: 40 }
 *
 * // Edge cases
 * maximumBy((a: number, b: number) => a - b)([42]) // 42
 * maximumBy((a: number, b: number) => a - b)([]) // undefined
 * maximumBy((a: number, b: number) => a - b)(null) // undefined
 * ```
 */
const maximumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | undefined => {
	if (isNullish(array) || array.length === 0) {
		return undefined
	}

	const findMaximum = (
		arr: ReadonlyArray<T>,
		currentMax: T,
		index: number,
	): T => {
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
