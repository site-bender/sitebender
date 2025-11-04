import isNullish from "../../predicates/isNullish/index.ts"

//++ Inserts a separator between elements
const intersperse = <T, U>(
	separator: U,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T | U> => {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	// Use flatMap to intersperse the separator between elements
	// For each element except the last, return [element, separator]
	// For the last element, return just [element]
	return array.flatMap((element, index) =>
		index < array.length - 1 ? [element, separator] : [element]
	)
}

export default intersperse
