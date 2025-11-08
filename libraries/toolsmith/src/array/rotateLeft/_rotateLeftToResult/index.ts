import type { Result } from "../../../types/fp/result/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _rotateLeftArray from "../_rotateLeftArray/index.ts"

//++ [PRIVATE] Rotates elements left by n positions, returning Result monad
export default function _rotateLeftToResult<E, T>(
	positions: number,
) {
	return function _rotateLeftToResultByPositions(
		array: ReadonlyArray<T>,
	): Result<E, Array<T>> {
		return ok(_rotateLeftArray<T>(positions)(array))
	}
}
