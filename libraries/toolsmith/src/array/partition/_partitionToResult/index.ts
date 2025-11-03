import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _partitionArray from "../_partitionArray/index.ts"

//++ Private helper: splits array by predicate into two groups (Result monad)
export default function _partitionToResult<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _partitionToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, [ReadonlyArray<T>, ReadonlyArray<T>]> {
		return ok(_partitionArray(predicate)(array))
	}
}
