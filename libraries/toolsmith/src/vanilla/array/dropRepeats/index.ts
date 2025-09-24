import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"
import is from "../../validation/is/index.ts"

export default function dropRepeats<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || array.length === 0) {
		return []
	}

	if (array.length === 1) {
		return [...array]
	}

	return array.reduce(function dropRepeat(acc: Array<T>, curr, index) {
		if (index === 0 || not(is(curr)(array[index - 1]))) {
			return [...acc, curr]
		}
		return acc
	}, [])
}
