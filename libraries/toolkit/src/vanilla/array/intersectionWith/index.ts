import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns elements that exist in both arrays using a comparator function
 *
 * Like intersection but uses a custom comparator function to determine equality
 * between elements from the two arrays. Returns a new array containing elements
 * from the first array for which an equivalent element exists in the second array
 * according to the comparator. Useful for complex objects or custom equality logic.
 *
 * @param comparator - Function to determine if elements are equal
 * @param array2 - Second array to intersect with
 * @param array1 - First array to intersect from
 * @returns New array with elements from array1 that have equivalents in array2
 *
 * @pure
 * @curried
 * @immutable
 *
 * @example
 * ```typescript
 * // Case-insensitive intersection
 * const caseInsensitive = (a: string, b: string) =>
 *   a.toLowerCase() === b.toLowerCase()
 * intersectionWith(caseInsensitive)(["B", "C"])(["a", "b", "c"])
 * // ["b", "c"]
 *
 * // Object intersection by property
 * const byId = (a: { id: number }, b: { id: number }) => a.id === b.id
 * const users1 = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
 * const users2 = [{ id: 2, name: "Bobby" }, { id: 3, name: "Charlie" }]
 * intersectionWith(byId)(users2)(users1)
 * // [{ id: 2, name: "Bob" }]
 *
 * // Number with tolerance
 * const approxEqual = (a: number, b: number) => Math.abs(a - b) < 0.1
 * intersectionWith(approxEqual)([1.0, 2.0])([1.05, 2.95])
 * // [1.05]
 *
 * // Partial application
 * type Item = { id: number }
 * const intersectById = intersectionWith((a: Item, b: Item) => a.id === b.id)
 * const list1 = [{ id: 1 }, { id: 2 }]
 * const list2 = [{ id: 2 }, { id: 3 }]
 * intersectById(list2)(list1) // [{ id: 2 }]
 *
 * // Edge cases
 * intersectionWith((a, b) => a === b)([])([1, 2, 3])     // []
 * intersectionWith((a, b) => a === b)([1, 2])(null)      // []
 * const alwaysFalse = () => false
 * intersectionWith(alwaysFalse)([1, 2])([3, 4])          // []
 * ```
 */
const intersectionWith = <T, U>(
	comparator: (a: T, b: U) => boolean,
) =>
(
	array2: ReadonlyArray<U> | null | undefined,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array1) || array1.length === 0) {
		return []
	}

	if (isNullish(array2) || array2.length === 0) {
		return []
	}

	return array1.filter((element1) =>
		array2.some((element2) => comparator(element1, element2))
	)
}

export default intersectionWith
