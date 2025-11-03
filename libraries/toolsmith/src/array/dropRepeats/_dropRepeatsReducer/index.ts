import not from "../../../logic/not/index.ts"
import is from "../../../validation/is/index.ts"
import isEmpty from "../../isEmpty/index.ts"
import last from "../../last/index.ts"

//++ Reducer for dropping consecutive duplicates using is (private, not curried for use in reduce)
export default function _dropRepeatsReducer<T>(
	acc: Array<T>,
	curr: T,
): Array<T> {
	if (isEmpty(acc) || not(is(curr)(last(acc) as T))) {
		return [...acc, curr]
	}
	return acc
}
