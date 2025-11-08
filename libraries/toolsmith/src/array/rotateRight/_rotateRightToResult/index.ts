import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _rotateRightArray from "../_rotateRightArray/index.ts"

//++ [PRIVATE] Rotates elements right by n positions, returning Result monad
export default function _rotateRightToResult<E, T>(
	positions: number,
) {
	return function _rotateRightToResultByPositions(
		array: ReadonlyArray<T>,
	): Result<E, Array<T>> {
		return ok(_rotateRightArray<T>(positions)(array))
	}
}
