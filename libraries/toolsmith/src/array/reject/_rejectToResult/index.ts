import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _rejectArray from "../_rejectArray/index.ts"

//++ Private helper: removes elements that satisfy predicate (Result monad)
export default function _rejectToResult<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _rejectToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_rejectArray(predicate)(array))
	}
}
