import type { Result } from "../../../types/fp/result/index.ts"

import _dropRepeatsWithArray from "../_dropRepeatsWithArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _dropRepeatsWithArray for Result monad path
export default function _dropRepeatsWithToResult<E, T>(
	comparator: (a: T, b: T) => boolean,
) {
	return function _dropRepeatsWithToResultWithComparator(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T>> {
		return ok(_dropRepeatsWithArray<T>(comparator)(array))
	}
}
