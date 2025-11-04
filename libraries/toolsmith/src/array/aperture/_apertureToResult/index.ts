import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _apertureArray from "../_apertureArray/index.ts"

//++ Private helper: creates sliding windows and wraps result in Result monad
export default function _apertureToResult<T>(width: number) {
	return function _apertureToResultWithWidth(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		const windows = _apertureArray(width)(array)
		return ok(windows)
	}
}
