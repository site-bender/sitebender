import isNullish from "../../validation/isNullish/index.ts"

/*++
 | Returns elements that are in either array but not both
 |
 | Computes the symmetric difference (XOR) of two arrays - elements that
 | exist in exactly one of the arrays. Uses SameValueZero equality for
 | comparisons. The result contains unique elements from both arrays that
 | don't appear in their intersection. Useful for finding changes, unique
 | items, or exclusive elements between sets.
 */
const symmetricDifference = <T>(
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

	// Create sets for efficient lookup
	const set1 = new Set(array1)
	const set2 = new Set(array2)

	// Add elements from array1 that are not in array2
	const diff1 = Array.from(set1).filter((item) => !set2.has(item))

	// Add elements from array2 that are not in array1
	const diff2 = Array.from(set2).filter((item) => !set1.has(item))

	return [...diff1, ...diff2]
}

export default symmetricDifference

//?? [EXAMPLE] `symmetricDifference([1, 2, 3])([3, 4, 5]) // [1, 2, 4, 5]`
//?? [EXAMPLE] `symmetricDifference([1, 2])([3, 4]) // [1, 2, 3, 4]`
//?? [EXAMPLE] `symmetricDifference([1, 2, 3])([1, 2, 3]) // []`
//?? [EXAMPLE] `symmetricDifference([1, 1, 2])([2, 2, 3]) // [1, 3]`
//?? [EXAMPLE] `symmetricDifference(null)([1, 2]) // [1, 2]`
//?? [EXAMPLE] `symmetricDifference([1, 2])(null) // [1, 2]`
