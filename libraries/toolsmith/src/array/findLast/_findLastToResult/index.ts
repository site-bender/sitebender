import type { Result } from "../../../types/fp/result/index.ts"

import _findLastArray from "../_findLastArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findLastArray for Result monad path
export default function _findLastToResult<E, T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<E, T | null> {
		return ok(_findLastArray<T>(predicate)(array))
	}
}
