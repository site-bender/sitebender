import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _moveArray from "../_moveArray/index.ts"

//++ [PRIVATE] Moves an element from one position to another, returning Result monad
export default function _moveToResult<T>(
	fromIndex: number,
) {
	return function _moveToResultFrom(
		toIndex: number,
	) {
		return function moveToResultInArray<T>(
			array: ReadonlyArray<T>,
		): Result<ValidationError, Array<T>> {
			return ok(moveArray<T>(fromIndex)(toIndex)(array))
		}
	}
}
