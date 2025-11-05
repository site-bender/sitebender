import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _dropRepeatsWithArray from "../_dropRepeatsWithArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _dropRepeatsWithArray for Result monad path
export default function _dropRepeatsWithToResult<T>(
	comparator: (a: T, b: T) => boolean,
) {
	return function _dropRepeatsWithToResultWithComparator(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_dropRepeatsWithArray(comparator)(array))
	}
}
