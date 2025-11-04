import not from "../../logic/not/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Reverses array order
export default function reverse<T>(
	array: ReadonlyArray<T> | null | undefined,
): Array<T> {
	if (isNullish(array) || not(Array.isArray(array))) {
		return []
	}
	return [...array].reverse()
}
