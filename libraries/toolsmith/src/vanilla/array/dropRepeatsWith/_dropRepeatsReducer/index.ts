import not from "../../../logic/not/index.ts"
import nth from "../../nth/index.ts"
import isEmpty from "../../isEmpty/index.ts"
import last from "../../last/index.ts"

//++ Reducer for dropping consecutive duplicates (private, not curried for use in reduce)
export default function _dropRepeatsReducer<T>(
	comparator: (a: T, b: T) => boolean,
	acc: Array<T>,
	curr: T,
): Array<T> {
	if (isEmpty(acc) || not(comparator(curr, last(acc) as T))) {
		return [...acc, curr]
	}

	return acc
}
