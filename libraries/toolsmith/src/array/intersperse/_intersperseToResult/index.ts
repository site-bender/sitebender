import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _intersperseArray from "../_intersperseArray/index.ts"

//++ Private helper: intersperses separator and wraps result in Result monad
export default function _intersperseToResult<E, T, U>(separator: U) {
	return function _intersperseToResultWithSeparator(
		array: ReadonlyArray<T>,
	): Result<E, ReadonlyArray<T | U>> {
		const interspersed = _intersperseArray<T, U>(separator)(array)
		return ok<ReadonlyArray<T | U>>(interspersed)
	}
}
