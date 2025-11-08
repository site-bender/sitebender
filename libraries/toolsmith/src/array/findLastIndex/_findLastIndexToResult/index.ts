import type { Result } from "../../../types/fp/result/index.ts"

import _findLastIndexArray from "../_findLastIndexArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findLastIndexArray for Result monad path
export default function _findLastIndexToResult<E, T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastIndexToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<E, number | null> {
		return ok(_findLastIndexArray<T>(predicate)(array))
	}
}
