import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _sortByArray from "../_sortByArray/index.ts"

//++ Private helper: sorts Result monad by mapping function (fail-fast)
export default function _sortByToResult<T, U>(fn: (value: T) => U) {
	return function _sortByToResultWithFunction(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_sortByArray(fn)(array))
	}
}
