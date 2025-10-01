import isNotEmpty from "../isNotEmpty/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import length from "../length/index.ts"
import reduce from "../reduce/index.ts"
import _dropRepeatsReducer from "./_dropRepeatsReducer/index.ts"

//++ Removes consecutive duplicate elements from an array
export default function dropRepeats<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNotEmpty(array)) {
		const validArray = array as Array<T>

		if (isEqual(length(validArray))(1)) {
			return [...validArray]
		}

		return reduce(function dropRepeat(acc: Array<T>, curr: T) {
			return _dropRepeatsReducer(acc, curr)
		})([])(validArray)
	}

	return []
}
