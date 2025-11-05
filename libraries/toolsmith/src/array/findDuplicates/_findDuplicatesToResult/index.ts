import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _findDuplicatesArray from "../_findDuplicatesArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findDuplicatesArray for Result monad path
export default function _findDuplicatesToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, ReadonlyArray<T>> {
	return ok(_findDuplicatesArray(array))
}
