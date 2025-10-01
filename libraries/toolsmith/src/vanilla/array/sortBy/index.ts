import isNullish from "../../validation/isNullish/index.ts"

//++ Sorts by mapping function result
const sortBy = <T, U>(
	fn: (value: T) => U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array) || !Array.isArray(array) || array.length === 0) {
		return []
	}

	// Map each element to [element, sortKey] pairs
	const mapped = array.map((element, index) => ({
		element,
		sortKey: fn(element),
		index, // Preserve original index for stable sort
	}))

	// Sort by the computed keys
	mapped.sort((a, b) => {
		if (a.sortKey < b.sortKey) return -1
		if (a.sortKey > b.sortKey) return 1
		// If keys are equal, maintain original order (stable sort)
		return a.index - b.index
	})

	// Extract the sorted elements
	return mapped.map((item) => item.element)
}

export default sortBy
