import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import _findLastArray from "../_findLastArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findLastArray for Result monad path
export default function _findLastToResult<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findLastToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, T | null> {
		return ok(findLastArray<T>(predicate)(array))
	}
}
