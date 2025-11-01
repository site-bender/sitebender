import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that flatMaps over a plain array, or returns array unchanged if inputs are invalid
export default function _flatMapArray<T, U>(
	f: (arg: T, index?: number) => ReadonlyArray<U>,
) {
	return function _flatMapArrayWithFunction(
		array: ReadonlyArray<T>,
	): ReadonlyArray<U> {
		// Happy path: array and function are valid, flatMap it
		if (and(isFunction(f))(isArray(array))) {
			//++ [EXCEPTION] .flatMap() permitted in Toolsmith for performance - provides curried flatMap wrapper
			return array.flatMap(f)
		}

		// Fallback: return unchanged
		return array as unknown as ReadonlyArray<U>
	}
}
