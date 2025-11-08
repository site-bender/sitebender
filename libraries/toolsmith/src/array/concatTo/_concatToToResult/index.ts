import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _concatToArray from "../_concatToArray/index.ts"

//++ Private helper: appends array to base in Result monad (fail-fast)
export default function _concatToToResult<E, T>(toAppend: ReadonlyArray<T>) {
	return function _concatToToResultWithAppend(
		baseArray: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_concatToArray(toAppend)(baseArray))
	}
}
