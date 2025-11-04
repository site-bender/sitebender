import isNullish from "../../predicates/isNullish/index.ts"

//++ Removes duplicates (alias for unique)
const nub = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return []
	}

	// Use Set for efficient deduplication (O(n) complexity)
	// Set uses SameValueZero equality, which is what we want
	return [...new Set(array)]
}

export default nub
