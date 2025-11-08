import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _concatArray from "../_concatArray/index.ts"

//++ Private helper: concatenates arrays in Result monad (fail-fast)
export default function _concatToResult<E, T>(first: ReadonlyArray<T>) {
	return function _concatToResultWithFirst(
		second: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_concatArray(first)(second))
	}
}
