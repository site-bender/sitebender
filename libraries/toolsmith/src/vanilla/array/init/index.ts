import isNullish from "../../validation/isNullish/index.ts"
import dropLast from "../dropLast/index.ts"

//++ init(array) — all but last element; returns [] for empty/singleton
export default function init<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array)) {
		return []
	}
	return dropLast<T>(1)(array as Array<T>)
}

//?? [EXAMPLE] init([1,2,3]) // [1,2]
//?? [EXAMPLE] init([42]) // []
