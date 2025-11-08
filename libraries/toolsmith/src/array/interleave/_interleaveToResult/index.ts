import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _interleaveArray from "../_interleaveArray/index.ts"

//++ Private helper: interleaves two arrays and wraps result in Result monad
export default function _interleaveToResult<E, T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _interleaveToResultWithFirstArray(
		array2: ReadonlyArray<U>,
	): Result<E, ReadonlyArray<T | U>> {
		const interleaved = _interleaveArray<T, U>(array1)(array2)
		return ok<ReadonlyArray<T | U>>(interleaved)
	}
}
