import type { Value } from "../../../types/index.ts"

import and from "../../../logic/and/index.ts"
import isArray from "../../../predicates/isArray/index.ts"
import isFunction from "../../../predicates/isFunction/index.ts"

type Func<T extends Value = Value> = (arg: T, index?: number) => T

//++ Private helper that maps over a plain array, or returns array unchanged if inputs are invalid
export default function _mapArray<T extends Value = Value>(f: Func<T>) {
	return function _mapArrayWithFunction(array: Array<T>): Array<T> {
		// Happy path: array is valid, map it
		if (and(isFunction(f))(isArray(array))) {
			return array.map(f)
		}

		// Fallback: return unchanged
		return array
	}
}
