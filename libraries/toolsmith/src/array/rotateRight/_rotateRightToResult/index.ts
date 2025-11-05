import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _rotateRightArray from "../_rotateRightArray/index.ts"

//++ [PRIVATE] Rotates elements right by n positions, returning Result monad
export default function _rotateRightToResult<T>(
	positions: number,
) {
	return function _rotateRightToResultByPositions(
		array: ReadonlyArray<T>,
	): Result<ValidationError, Array<T>> {
		return ok(_rotateRightArray(positions)(array))
	}
}
