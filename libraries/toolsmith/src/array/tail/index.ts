import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Returns all elements except the first
export default function tail<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || not(Array.isArray(array))) {
		return []
	}
	return array.slice(1)
}
