import type { Result } from "../../../types/fp/result/index.ts"

import _findDuplicatesArray from "../_findDuplicatesArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _findDuplicatesArray for Result monad path
export default function _findDuplicatesToResult<E, T>(
	array: ReadonlyArray<T>,
): Result<E, ReadonlyArray<T>> {
	return ok(_findDuplicatesArray<T>(array))
}
