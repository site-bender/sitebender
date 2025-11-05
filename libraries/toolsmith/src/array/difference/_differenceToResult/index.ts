import type { Result, ValidationError } from "../../../types/fp/index.ts"

import _differenceArray from "../_differenceArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Private helper: wraps _differenceArray for Result monad path
export default function _differenceToResult<T>(subtrahend: ReadonlyArray<T>) {
	return function _differenceToResultWithSubtrahend(
		minuend: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_differenceArray(subtrahend)(minuend))
	}
}
