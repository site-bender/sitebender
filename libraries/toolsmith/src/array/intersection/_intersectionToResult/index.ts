import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _intersectionArray from "../_intersectionArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _intersectionArray for Result monad path
export default function _intersectionToResult<T>(array2: ReadonlyArray<T>) {
	return function _intersectionToResultWithArray2(
		array1: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_intersectionArray(array2)(array1))
	}
}
