import type { Result } from "../../../types/fp/result/index.ts"

import _nubArray from "../_nubArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _nubArray for Result monad path
export default function _nubToResult<E, T>(
	array: ReadonlyArray<T>,
): Result<E, ReadonlyArray<T>> {
	return ok(_nubArray<T>(array))
}
