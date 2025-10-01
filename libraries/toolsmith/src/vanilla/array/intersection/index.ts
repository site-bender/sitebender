import isNullish from "../../validation/isNullish/index.ts"

//++ Returns elements that exist in both arrays
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
