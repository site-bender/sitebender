import isNullish from "../../validation/isNullish/index.ts"

//++ Combines two arrays into pairs
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
