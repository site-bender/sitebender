import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns elements that exist in both arrays
 *
 * Performs a set intersection operation, returning a new array containing
 * only the elements that appear in both input arrays. Uses strict equality
 * (===) for comparison. Preserves the order from the first array and keeps
 * duplicates from the first array.
 *
 * @param array2 - Second array to intersect with
 * @param array1 - First array (determines order of results)
 * @returns New array with elements present in both arrays
 *
 * @pure
 * @curried
 * @immutable
 * @commutative
 *
 * @example
 * ```typescript
 * // Basic intersection
 * intersection([2, 3, 4])([1, 2, 3, 5])
 * // [2, 3]
 *
 * // String arrays
 * intersection(["b", "c", "d"])(["a", "b", "c", "e"])
 * // ["b", "c"]
 *
 * // All elements in common
 * intersection([1, 2, 3])([1, 2, 3])
 * // [1, 2, 3]
 *
 * // Duplicates in first array are preserved
 * intersection([2, 3])([1, 2, 2, 3, 3, 3])
 * // [2, 2, 3, 3, 3]
 *
 * // Partial application
 * const onlyValidIds = intersection([1, 2, 3, 4, 5])
 * onlyValidIds([3, 4, 5, 6, 7]) // [3, 4, 5]
 *
 * // Edge cases
 * intersection([])([1, 2, 3])     // []
 * intersection([1, 2])(null)      // []
 * intersection([4, 5])([6, 7])    // [] (no common)
 * ```
 */
const intersection = <T>(
	array2: ReadonlyArray<T> | null | undefined,
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

	const set2 = new Set(array2)

	// Use filter for O(n) time with O(1) lookups
	// This preserves duplicates from array1
	return array1.filter((element) => set2.has(element))
}

export default intersection
