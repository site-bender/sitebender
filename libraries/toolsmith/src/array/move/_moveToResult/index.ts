import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _moveArray from "../_moveArray/index.ts"

//++ [PRIVATE] Moves an element from one position to another, returning Result monad
export default function _moveToResult<T>(
	fromIndex: number,
) {
	return function _moveToResultFrom(
		toIndex: number,
	) {
		return function _moveToResultInArray(
			array: ReadonlyArray<T>,
		): Result<ValidationError, Array<T>> {
			return ok(_moveArray(fromIndex)(toIndex)(array))
		}
	}
}
