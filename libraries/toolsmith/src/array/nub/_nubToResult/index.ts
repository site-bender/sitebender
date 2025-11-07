import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import _nubArray from "../_nubArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _nubArray for Result monad path
export default function _nubToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, ReadonlyArray<T>> {
	return ok(nubArray<T>(array))
}
