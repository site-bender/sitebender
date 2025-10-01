import isNullish from "../../validation/isNullish/index.ts"

//++ Sorts using multiple comparators
const sortWith = <T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	if (comparators.length === 0) {
		return [...array]
	}

	// Create a copy and sort with combined comparator
	return [...array].sort((a, b) => {
		// Apply comparators in order until one returns non-zero
		for (const comparator of comparators) {
			const result = comparator(a, b)
			if (result !== 0) {
				return result
			}
		}
		// All comparators returned 0 (elements are equal)
		return 0
	})
}

export default sortWith
