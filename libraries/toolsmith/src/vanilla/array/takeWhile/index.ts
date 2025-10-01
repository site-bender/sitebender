import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Takes from start while predicate is true
const takeWhile = <T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	const takeIndex = array.findIndex((element, index) =>
		not(predicate(element, index, array))
	)

	return takeIndex === -1 ? [...array] : array.slice(0, takeIndex)
}

export default takeWhile
