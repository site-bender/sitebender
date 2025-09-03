import isNullish from "../../validation/isNullish/index.ts"
import not from "../../logic/not/index.ts"

/**
 * Takes elements from the beginning of an array while predicate returns true
 *
 * Returns a new array containing elements from the start of the input array,
 * stopping at the first element for which the predicate returns false.
 * Does not continue checking after the first false result.
 *
 * @param predicate - Function that returns true to continue taking elements
 * @param array - Array to take elements from
 * @returns New array with elements taken from the beginning
 * @example
 * ```typescript
 * // Basic usage - take while less than 5
 * takeWhile((x: number) => x < 5)([1, 3, 5, 7, 2, 1])  // [1, 3]
 * takeWhile((x: number) => x % 2 === 0)([2, 4, 6, 7, 8])  // [2, 4, 6]
 *
 * // Take while ascending
 * takeWhile((x: number, i: number, arr: ReadonlyArray<number>) =>
 *   i === 0 || x > arr[i - 1]
 * )([1, 2, 3, 2, 4, 5])  // [1, 2, 3]
 *
 * // Take objects while property is true
 * const items = [
 *   { id: 1, active: true },
 *   { id: 2, active: true },
 *   { id: 3, active: false },
 *   { id: 4, active: true }
 * ]
 * takeWhile((item: { active: boolean }) => item.active)(items)
 * // [{ id: 1, active: true }, { id: 2, active: true }]
 *
 * // Edge cases
 * takeWhile((x: number) => x < 5)([])         // []
 * takeWhile((x: number) => x < 0)([1, 2, 3])  // []
 * takeWhile((x: number) => x > 0)([1, 2, 3])  // [1, 2, 3]
 *
 * // Null/undefined handling
 * takeWhile((x: number) => x > 0)(null)       // []
 * takeWhile((x: number) => x > 0)(undefined)  // []
 * ```
 * @pure
 * @curried
 * @immutable
 * @safe
 */
const takeWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	const takeIndex = array.findIndex((element, index) =>
		not(predicate(element, index, array))
	)

	return takeIndex === -1 ? [...array] : array.slice(0, takeIndex)
}

export default takeWhile
