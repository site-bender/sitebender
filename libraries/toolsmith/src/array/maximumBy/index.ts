import isNullish from "../../validation/isNullish/index.ts"

//++ Finds the maximum element by comparator
const maximumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | null => {
	if (isNullish(array) || array.length === 0) {
		return null
	}

	const findMaximum = (
		arr: ReadonlyArray<T>,
		currentMax: T,
		index: number,
	): T => {
		if (index >= arr.length) {
			return currentMax
		}
		const current = arr[index]
		const newMax = comparator(current, currentMax) > 0 ? current : currentMax
		return findMaximum(arr, newMax, index + 1)
	}

	return findMaximum(array, array[0], 1)
}

export default maximumBy
