import isNullish from "../../validation/isNullish/index.ts"

//++ Returns adjacent element pairs
const pairwise = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<[T, T]> => {
	if (isNullish(array) || array.length < 2) {
		return []
	}

	return Array.from({ length: array.length - 1 }, (_, i) =>
		[
			array[i],
			array[i + 1],
		] as [T, T])
}

export default pairwise
