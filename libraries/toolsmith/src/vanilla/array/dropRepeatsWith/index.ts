import isNotEmpty from "../isNotEmpty/index.ts"
import isEqual from "../../validation/isEqual/index.ts"
import length from "../length/index.ts"
import reduce from "../reduce/index.ts"
import _dropRepeatsReducer from "./_dropRepeatsReducer/index.ts"

//++ Removes consecutive duplicates with custom equality
export default function dropRepeatsWith<T>(
	comparator: (a: T, b: T) => boolean,
) {
	return function dropRepeatsWithComparator(
		array: ReadonlyArray<T> | null | undefined,
	): Array<T> {
		if (isNotEmpty(array)) {
			const validArray = array as Array<T>
			if (isEqual(length(validArray))(1)) {
				return [...validArray]
			}

			return reduce(function dropRepeats(acc: Array<T>, curr: T) {
				return _dropRepeatsReducer(comparator, acc, curr)
			})([])(validArray)
		}

		return []
	}
}
