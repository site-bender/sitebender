import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import _differenceArray from "../_differenceArray/index.ts"
import ok from "../../../types/fp/result/ok/index.ts"

//++ Private helper: wraps _differenceArray for Result monad path
export default function _differenceToResult<T>(subtrahend: ReadonlyArray<T>) {
	return function _differenceToResultWithSubtrahend(
		minuend: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_differenceArray(subtrahend)(minuend))
	}
}
