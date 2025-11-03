import isNullish from "../../validation/isNullish/index.ts"
import dropLast from "../dropLast/index.ts"

//++ Returns all but the last element
export default function init<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array)) {
		return []
	}
	return dropLast<T>(1)(array as Array<T>)
}
