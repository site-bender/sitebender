import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _sortArray from "../_sortArray/index.ts"

//++ Private helper: sorts Result monad (fail-fast)
export default function _sortToResult<E, T>(compareFn?: (a: T, b: T) => number) {
	return function _sortToResultWithComparator(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_sortArray(compareFn)(array))
	}
}
