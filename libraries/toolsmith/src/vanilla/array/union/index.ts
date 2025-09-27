import isNullish from "../../validation/isNullish/index.ts"

//++ Returns unique elements from both arrays
const union = <T>(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	// Handle null/undefined cases
	if (isNullish(array1)) {
		if (isNullish(array2)) {
			return []
		}
		return [...new Set(array2)]
	}

	if (isNullish(array2)) {
		return [...new Set(array1)]
	}

	// Use Set for efficient deduplication
	const uniqueElements = new Set([...array1, ...array2])
	return Array.from(uniqueElements)
}

export default union

//?? [EXAMPLE] `union([1, 2, 3])([3, 4, 5]) // [1, 2, 3, 4, 5]`
//?? [EXAMPLE] `union(["a", "b", "c"])(["c", "d", "e"]) // ["a", "b", "c", "d", "e"]`
//?? [EXAMPLE] `union([1, 1, 2, 2])([2, 2, 3, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `union([])([1, 2, 3]) // [1, 2, 3]`
//?? [EXAMPLE] `union(null)([1, 2]) // [1, 2]`
//?? [EXAMPLE] `union([1, 2])(null) // [1, 2]`
