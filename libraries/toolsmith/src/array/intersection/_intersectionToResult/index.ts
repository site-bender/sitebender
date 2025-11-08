import type { Result } from "../../../types/fp/result/index.ts"

import _intersectionArray from "../_intersectionArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _intersectionArray for Result monad path
export default function _intersectionToResult<E, T>(array2: ReadonlyArray<T>) {
	return function _intersectionToResultWithArray2(
		array1: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_intersectionArray<T>(array2)(array1))
	}
}
