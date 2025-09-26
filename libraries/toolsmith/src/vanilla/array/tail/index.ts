import not from "../../logic/not/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

//++ Return all elements of an array except the first; null/undefined yield []
export default function tail<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || not(Array.isArray(array))) {
		return []
	}
	return array.slice(1)
}

//?? [EXAMPLE] tail([1, 2, 3, 4]) // [2, 3, 4]
//?? [EXAMPLE] tail(["a"]) // []
//?? [EXAMPLE] tail([]) // []
