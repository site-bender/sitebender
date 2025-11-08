import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _apertureArray from "../_apertureArray/index.ts"

//++ Private helper: creates sliding windows and wraps result in Result monad
export default function _apertureToResult<E, T>(width: number) {
	return function _apertureToResultWithWidth(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>> {
		const windows = _apertureArray<T>(width)(array)
		return ok<ReadonlyArray<ReadonlyArray<T>>>(windows)
	}
}
