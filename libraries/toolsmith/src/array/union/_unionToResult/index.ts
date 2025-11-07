import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import _unionArray from "../_unionArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _unionArray for Result monad path
export default function _unionToResult<T>(array1: ReadonlyArray<T>) {
	return function _unionToResultWithArray1(
		array2: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(unionArray<T>(array1)(array2))
	}
}
