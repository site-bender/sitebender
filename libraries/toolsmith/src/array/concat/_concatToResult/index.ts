import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _concatArray from "../_concatArray/index.ts"

//++ Private helper: concatenates arrays in Result monad (fail-fast)
export default function _concatToResult<T>(first: ReadonlyArray<T>) {
	return function _concatToResultWithFirst(
		second: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_concatArray(first)(second))
	}
}
