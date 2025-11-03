import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _takeWhileArray from "../_takeWhileArray/index.ts"

//++ Private helper: takes from start while predicate is true (Result monad)
export default function _takeWhileToResult<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _takeWhileToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_takeWhileArray(predicate)(array))
	}
}
