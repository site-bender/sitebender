import isNullish from "../../predicates/isNullish/index.ts"

//++ Updates element at index via function
const update = <T>(
	index: number,
) =>
(
	fn: (value: T) => T,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Handle negative index
	const actualIndex = index < 0 ? array.length + index : index

	// Check bounds
	if (actualIndex < 0 || actualIndex >= array.length) {
		return [...array]
	}

	// Create new array with updated element
	const result = [...array]
	result[actualIndex] = fn(array[actualIndex])

	return result
}

export default update
