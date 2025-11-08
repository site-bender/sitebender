import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _rotateLeftArray from "../_rotateLeftArray/index.ts"

//++ [PRIVATE] Rotates elements left by n positions, returning Validation monad
export default function _rotateLeftToValidation<E, T>(
	positions: number,
) {
	return function _rotateLeftToValidationByPositions(
		array: ReadonlyArray<T>,
	): Validation<E, Array<T>> {
		return success(_rotateLeftArray<T>(positions)(array))
	}
}
