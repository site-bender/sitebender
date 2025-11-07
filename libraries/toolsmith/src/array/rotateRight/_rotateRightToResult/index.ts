import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _rotateRightArray from "../_rotateRightArray/index.ts"

//++ [PRIVATE] Rotates elements right by n positions, returning Result monad
export default function _rotateRightToResult<T>(
	positions: number,
) {
	return function _rotateRightToResultByPositions(
		array: ReadonlyArray<T>,
	): Result<ValidationError, Array<T>> {
		return ok(rotateRightArray<T>(positions)(array))
	}
}
