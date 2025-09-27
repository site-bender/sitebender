import isNullish from "../../validation/isNullish/index.ts"

//++ Creates sliding windows over array
const sliding = <T>(
	size: number,
) =>
(
	step: number = 1,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<Array<T>> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	if (
		size <= 0 || step <= 0 || !Number.isInteger(size) ||
		!Number.isInteger(step)
	) {
		return []
	}

	if (array.length < size) {
		return []
	}

	// Build windows using recursion
	const slideRecursive = (startIndex: number): Array<Array<T>> => {
		if (startIndex + size > array.length) {
			return []
		}

		const window = array.slice(startIndex, startIndex + size)
		const nextIndex = startIndex + step

		return [window, ...slideRecursive(nextIndex)]
	}

	return slideRecursive(0)
}

export default sliding

//?? [EXAMPLE] `sliding(3)(1)([1, 2, 3, 4, 5]) // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]`
//?? [EXAMPLE] `sliding(3)(2)([1, 2, 3, 4, 5, 6, 7]) // [[1, 2, 3], [3, 4, 5], [5, 6, 7]]`
//?? [EXAMPLE] `sliding(2)(1)([1, 2, 3, 4]) // [[1, 2], [2, 3], [3, 4]]`
//?? [EXAMPLE] `sliding(5)(1)([1, 2, 3]) // []`
//?? [EXAMPLE] `sliding(2)(1)(null) // []`
//?? [EXAMPLE] `sliding(0)(1)([1, 2, 3]) // []`
