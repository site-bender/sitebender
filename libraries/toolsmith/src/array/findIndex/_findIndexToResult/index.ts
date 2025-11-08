import type { Result } from "../../../types/fp/result/index.ts"

import _findIndexArray from "../_findIndexArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findIndexArray for Result monad path
export default function _findIndexToResult<E, T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findIndexToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<E, number> {
		return ok(_findIndexArray<T>(predicate)(array))
	}
}
