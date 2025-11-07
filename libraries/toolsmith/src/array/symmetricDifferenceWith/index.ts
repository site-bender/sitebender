import isNullish from "../../predicates/isNullish/index.ts"

//++ Symmetric difference with custom comparator
const symmetricDifferenceWith = <T>(
	comparator: (a: T, b: T) => boolean,
) =>
(
	array1: ReadonlyArray<T> | null | undefined,
) =>
(
	array2: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	// Helper function to remove duplicates based on comparator
	const uniqueBy = (arr: ReadonlyArray<T>): Array<T> =>
		arr.reduce<Array<T>>(
			(acc, item) =>
				acc.some((r) => comparator(r, item)) ? acc : [...acc, item],
			[],
		)

	// Handle null/undefined cases
	if (isNullish(array1) || !Array.isArray(array1)) {
		if (isNullish(array2) || !Array.isArray(array2)) {
			return []
		}
		return uniqueBy(array2)
	}

	if (isNullish(array2) || !Array.isArray(array2)) {
		return uniqueBy(array1)
	}

	// Get elements from array1 not in array2
	const diff1 = array1.filter(
		(item1) => !array2.some((item2) => comparator(item1, item2)),
	)

	// Get elements from array2 not in array1
	const diff2 = array2.filter(
		(item2) => !array1.some((item1) => comparator(item1, item2)),
	)

	// Combine and remove duplicates
	return uniqueBy([...diff1, ...diff2])
}

export default symmetricDifferenceWith
