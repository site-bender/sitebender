import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import _sortWithArray from "../_sortWithArray/index.ts"

//++ Private helper: sorts Result monad using multiple comparators (fail-fast)
export default function _sortWithToResult<E, T>(
	comparators: ReadonlyArray<(a: T, b: T) => number>,
) {
	return function _sortWithToResultWithComparators(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_sortWithArray(comparators)(array))
	}
}
