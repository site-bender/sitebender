import isNotUndefined from "../../validation/isNotUndefined/index.ts"
import filter from "../filter/index.ts"

//++ Removes undefined values from an array
export default function compact<T>(
	array: Array<T | null | undefined>,
): Array<T> {
	return filter(function isItemDefined(
		item: T | null | undefined,
	): item is T {
		return isNotUndefined(item)
	})(array as Array<T | null | undefined>)
}

//?? [EXAMPLE] `compact([1, null, 2, undefined, 3]) // [1, null, 2, 3]`
//?? [EXAMPLE] `compact([0, false, "", NaN, null, undefined]) // [0, false, "", NaN, null]`
//?? [EXAMPLE] `compact([undefined, undefined]) // []`
//?? [EXAMPLE] `compact([]) // []`
