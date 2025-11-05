import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _unionArray from "../_unionArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _unionArray for Result monad path
export default function _unionToResult<T>(array1: ReadonlyArray<T>) {
	return function _unionToResultWithArray1(
		array2: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_unionArray(array1)(array2))
	}
}
