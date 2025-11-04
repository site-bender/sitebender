import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Splits at first failing predicate
const span = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): [Array<T>, Array<T>] => {
	if (isNullish(array)) {
		return [[], []]
	}

	if (array.length === 0) {
		return [[], []]
	}

	// Find the split point
	const splitIndex = array.findIndex((element, index) =>
		not(predicate(element, index, array))
	)

	if (splitIndex === -1) {
		// All elements match the predicate
		return [[...array], []]
	}

	if (splitIndex === 0) {
		// No elements match the predicate
		return [[], [...array]]
	}

	// Split the array at the found index
	return [
		array.slice(0, splitIndex),
		array.slice(splitIndex),
	]
}

export default span
