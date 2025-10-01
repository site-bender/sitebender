import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Removes elements that satisfy predicate
const reject = <T>(
	predicate: (value: T, index: number, array: ReadonlyArray<T>) => boolean,
) =>
(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(array)) {
		return []
	}

	return array.filter((value, index, arr) => not(predicate(value, index, arr)))
}

export default reject
