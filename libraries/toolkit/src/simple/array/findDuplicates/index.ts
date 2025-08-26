/**
 * Returns array of elements that appear more than once
 *
 * Identifies all elements in an array that occur two or more times.
 * Each duplicate element appears only once in the result, preserving
 * the order of first occurrence.
 *
 * @pure
 * @immutable
 * @param array - Array to search for duplicates
 * @returns Array containing each duplicate element once, in order of first occurrence
 * @example
 * ```typescript
 * // Basic usage
 * findDuplicates([1, 2, 3, 2, 4, 1, 5])      // [1, 2]
 * findDuplicates(["a", "b", "c", "b", "a"])  // ["a", "b"]
 *
 * // Edge cases
 * findDuplicates([1, 2, 3, 4, 5])            // [] (no duplicates)
 * findDuplicates([])                         // [] (empty array)
 * findDuplicates([NaN, NaN])                 // [] (NaN !== NaN)
 *
 * // Objects by reference
 * const obj = { id: 1 }
 * findDuplicates([obj, { id: 1 }, obj])      // [obj] (same reference only)
 * ```
 */
const findDuplicates = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (array == null || !Array.isArray(array) || array.length === 0) {
		return []
	}

	return array.reduce<{ seen: Set<T>; duplicates: Set<T>; result: Array<T> }>(
		(acc, item) => {
			if (acc.seen.has(item)) {
				if (!acc.duplicates.has(item)) {
					acc.duplicates.add(item)
					acc.result.push(item)
				}
			} else {
				acc.seen.add(item)
			}
			return acc
		},
		{ seen: new Set<T>(), duplicates: new Set<T>(), result: [] },
	).result
}

export default findDuplicates
