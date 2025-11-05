import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _groupWithArray from "../_groupWithArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _groupWithArray for Result monad path
export default function _groupWithToResult<T>(
	predicate: (a: T, b: T) => boolean,
) {
	return function _groupWithToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		return ok(_groupWithArray(predicate)(array))
	}
}
