import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _rotateRightArray from "../_rotateRightArray/index.ts"

//++ [PRIVATE] Rotates elements right by n positions, returning Validation monad
export default function _rotateRightToValidation<E, T>(
	positions: number,
) {
	return function _rotateRightToValidationByPositions(
		array: ReadonlyArray<T>,
	): Validation<E, Array<T>> {
		return success(_rotateRightArray<T>(positions)(array))
	}
}
