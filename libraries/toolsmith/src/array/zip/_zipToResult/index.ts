import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _zipArray from "../_zipArray/index.ts"

//++ Private helper: zips arrays in Result monad (fail-fast)
export default function _zipToResult<T, U>(first: ReadonlyArray<T>) {
	return function _zipToResultWithFirst(
		second: ReadonlyArray<U>,
	): Result<ValidationError, ReadonlyArray<[T, U]>> {
		return ok(_zipArray(first)(second))
	}
}
