import isNullish from "../../predicates/isNullish/index.ts"

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
