import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _rotateLeftArray from "../_rotateLeftArray/index.ts"

//++ [PRIVATE] Rotates elements left by n positions, returning Validation monad
export default function _rotateLeftToValidation<T>(
	positions: number,
) {
	return function _rotateLeftToValidationByPositions(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, Array<T>> {
		return success(rotateLeftArray<T>(positions)(array))
	}
}
