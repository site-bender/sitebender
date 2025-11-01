import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

//++ Private helper that maps over a plain array, or returns array unchanged if inputs are invalid
export default function _mapArray<T, U>(f: (arg: T, index?: number) => U) {
	return function _mapArrayWithFunction(
		array: ReadonlyArray<T>,
	): ReadonlyArray<U> {
		// Happy path: array is valid, map it
		if (and(isFunction(f))(isArray(array))) {
			//++ [EXCEPTION] .map() permitted in Toolsmith for performance - provides curried map wrapper
			return array.map(f)
		}

		// Fallback: return unchanged
		return array as unknown as ReadonlyArray<U>
	}
}
