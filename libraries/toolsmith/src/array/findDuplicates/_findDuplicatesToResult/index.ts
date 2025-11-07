import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import _findDuplicatesArray from "../_findDuplicatesArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findDuplicatesArray for Result monad path
export default function _findDuplicatesToResult<T>(
	array: ReadonlyArray<T>,
): Result<ValidationError, ReadonlyArray<T>> {
	return ok(findDuplicatesArray<T>(array))
}
