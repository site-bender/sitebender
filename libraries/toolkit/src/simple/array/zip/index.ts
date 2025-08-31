import isNullish from "../../validation/isNullish/index.ts"

/**
 * Combines two arrays into an array of pairs
 *
 * Takes two arrays and returns an array of tuples, where each tuple
 * contains the elements at the same index from both arrays. The result
 * length is the minimum of the two input array lengths. This is a
 * special case of zipWith where the combining function creates a tuple.
 *
 * @curried
 * @pure
 * @immutable
 * @safe
 * @param array2 - Second array to zip
 * @param array1 - First array to zip
 * @returns Array of pairs [element1, element2]
 * @example
 * ```typescript
 * // Basic zip
 * zip([4, 5, 6])([1, 2, 3])
 * // [[1, 4], [2, 5], [3, 6]]
 *
 * // Different types
 * zip(["a", "b", "c"])([1, 2, 3])
 * // [[1, "a"], [2, "b"], [3, "c"]]
 *
 * // Different lengths (uses shorter)
 * zip([10, 20])([1, 2, 3, 4, 5])
 * // [[1, 10], [2, 20]]
 *
 * // Create key-value pairs
 * const keys = ["name", "age", "city"]
 * const values = ["Alice", 30, "NYC"]
 * zip(values)(keys)
 * // [["name", "Alice"], ["age", 30], ["city", "NYC"]]
 *
 * // Handle null/undefined gracefully
 * zip([1, 2])(null)         // []
 * zip(null)([1, 2])         // []
 * ```
 */
const zip = <T, U>(
	array2: ReadonlyArray<U> | null | undefined,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
): Array<[T, U]> => {
	if (isNullish(array1) || !Array.isArray(array1) || array1.length === 0) {
		return []
	}

	if (isNullish(array2) || !Array.isArray(array2) || array2.length === 0) {
		return []
	}

	const length = Math.min(array1.length, array2.length)

	// Recursively build pairs
	const buildPairs = (index: number): Array<[T, U]> => {
		if (index >= length) {
			return []
		}

		return [
			[array1[index], array2[index]] as [T, U],
			...buildPairs(index + 1),
		]
	}

	return buildPairs(0)
}

export default zip
