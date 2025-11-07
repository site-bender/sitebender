import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import _findIndexArray from "../_findIndexArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findIndexArray for Result monad path
export default function _findIndexToResult<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _findIndexToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, number> {
		return ok(findIndexArray<T>(predicate)(array))
	}
}
