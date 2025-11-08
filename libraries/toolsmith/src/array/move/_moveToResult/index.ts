import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _moveArray from "../_moveArray/index.ts"

//++ [PRIVATE] Moves an element from one position to another, returning Result monad
export default function _moveToResult<E, T>(
	fromIndex: number,
) {
	return function _moveToResultFrom(
		toIndex: number,
	) {
		return function moveToResultInArray(
			array: ReadonlyArray<T>,
		): Result<E, Array<T>> {
			return ok(_moveArray<T>(fromIndex)(toIndex)(array))
		}
	}
}
