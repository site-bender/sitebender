import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import _partitionByArray from "../_partitionByArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _partitionByArray for Result monad path
export default function _partitionByToResult<T>(
	predicate: (value: T) => unknown,
) {
	return function _partitionByToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		return ok(partitionByArray<T>(predicate)(array))
	}
}
