import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _rotateLeftArray from "../_rotateLeftArray/index.ts"

//++ [PRIVATE] Rotates elements left by n positions, returning Result monad
export default function _rotateLeftToResult<T>(
	positions: number,
) {
	return function _rotateLeftToResultByPositions(
		array: ReadonlyArray<T>,
	): Result<ValidationError, Array<T>> {
		return ok(rotateLeftArray<T>(positions)(array))
	}
}
