import isNullish from "../../predicates/isNullish/index.ts"

//++ Finds the minimum element by comparator
const minimumBy = <T>(
	comparator: (a: T, b: T) => number,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): T | null => {
	if (isNullish(array) || array.length === 0) {
		return null
	}

	const findMinimum = (
		arr: ReadonlyArray<T>,
		currentMin: T,
		index: number,
	): T => {
		if (index >= arr.length) {
			return currentMin
		}
		const current = arr[index]
		const newMin = comparator(current, currentMin) < 0 ? current : currentMin
		return findMinimum(arr, newMin, index + 1)
	}

	return findMinimum(array, array[0], 1)
}

export default minimumBy
