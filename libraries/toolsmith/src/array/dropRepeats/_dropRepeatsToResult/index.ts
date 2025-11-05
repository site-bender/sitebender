import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _dropRepeatsArray from "../_dropRepeatsArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _dropRepeatsArray for Result monad path
export default function _dropRepeatsToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, ReadonlyArray<T>> {
	return ok(_dropRepeatsArray(array))
}
