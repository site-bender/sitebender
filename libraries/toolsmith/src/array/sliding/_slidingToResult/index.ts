import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _slidingArray from "../_slidingArray/index.ts"

//++ Private helper: creates sliding windows and wraps result in Result monad
export default function _slidingToResult<T>(size: number) {
	return function _slidingToResultWithSize(step: number) {
		return function _slidingToResultWithStep(
			array: ReadonlyArray<T>,
		): Result<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
			const windows = _slidingArray<T>(size)(step)(array)
			return ok<ReadonlyArray<ReadonlyArray<T>>>(windows)
		}
	}
}
