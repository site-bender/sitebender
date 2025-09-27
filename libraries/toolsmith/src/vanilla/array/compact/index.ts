import isNotUndefined from "../../validation/isNotUndefined/index.ts"

//++ Removes undefined values from an array
export default function compact<T>(
	array: Array<T | null | undefined>,
): Array<T> {
	return array.filter(function isItemDefined(item): item is T {
		return isNotUndefined(item)
	})
}

//?? [EXAMPLE] `compact([1, null, 2, undefined, 3]) // [1, null, 2, 3]`
//?? [EXAMPLE] `compact([0, false, "", NaN, null, undefined]) // [0, false, "", NaN, null]`
//?? [EXAMPLE] `compact([undefined, undefined]) // []`
//?? [EXAMPLE] `compact([]) // []`
