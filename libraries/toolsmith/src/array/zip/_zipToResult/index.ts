import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _zipArray from "../_zipArray/index.ts"

//++ Private helper: zips arrays in Result monad (fail-fast)
export default function _zipToResult<E, T, U>(first: ReadonlyArray<T>) {
	return function _zipToResultWithFirst(
		second: ReadonlyArray<U>,
	): Result<E, ReadonlyArray<[T, U]>> {
		return ok(_zipArray(first)(second))
	}
}
