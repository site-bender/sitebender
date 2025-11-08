import type { Result } from "../../../types/fp/result/index.ts"

import _partitionByArray from "../_partitionByArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _partitionByArray for Result monad path
export default function _partitionByToResult<E, T>(
	predicate: (value: T) => unknown,
) {
	return function _partitionByToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>> {
		return ok(_partitionByArray<T>(predicate)(array))
	}
}
