import isNullish from "../../validation/isNullish/index.ts"

/**
 * Returns the union of two arrays (all unique elements from both)
 *
 * Combines two arrays and returns all unique elements that appear in either
 * array. Duplicates within each array and across arrays are removed. Uses
 * SameValueZero equality for comparisons. Elements from the first array
 * appear before elements from the second array in the result. Useful for
 * merging lists, combining sets, or removing duplicates.
 *
 * @curried
 * @pure
 * @immutable
 * @safe
 * @param array1 - First array
 * @param array2 - Second array
 * @returns Array containing all unique elements from both arrays
 * @example
 * ```typescript
 * // Basic union
 * union([1, 2, 3])([3, 4, 5])
 * // [1, 2, 3, 4, 5]
 *
 * // String arrays
 * union(["a", "b", "c"])(["c", "d", "e"])
 * // ["a", "b", "c", "d", "e"]
 *
 * // With duplicates in inputs
 * union([1, 1, 2, 2])([2, 2, 3, 3])
 * // [1, 2, 3]
 *
 * // Empty arrays
 * union([])([1, 2, 3])  // [1, 2, 3]
 * union([1, 2, 3])([])  // [1, 2, 3]
 *
 * // Merge user lists
 * const groupA = ["Alice", "Bob", "Charlie"]
 * const groupB = ["Bob", "David", "Eve"]
 * union(groupA)(groupB)
 * // ["Alice", "Bob", "Charlie", "David", "Eve"]
 *
 * // Handle null/undefined
 * union(null)([1, 2])       // [1, 2]
 * union([1, 2])(undefined)  // [1, 2]
 * ```
 */
const union = <T>(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	// Handle null/undefined cases
	if (isNullish(array1) || !Array.isArray(array1)) {
		if (isNullish(array2) || !Array.isArray(array2)) {
			return []
		}
		return [...new Set(array2)]
	}

	if (isNullish(array2) || !Array.isArray(array2)) {
		return [...new Set(array1)]
	}

	// Use Set for efficient deduplication
	const uniqueElements = new Set([...array1, ...array2])
	return Array.from(uniqueElements)
}

export default union
