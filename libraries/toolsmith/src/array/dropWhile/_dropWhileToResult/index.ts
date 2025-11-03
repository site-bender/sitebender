import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _dropWhileArray from "../_dropWhileArray/index.ts"

//++ Private helper: drops leading elements while predicate is true (Result monad)
export default function _dropWhileToResult<T>(
	predicate: (element: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _dropWhileToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_dropWhileArray(predicate)(array))
	}
}
