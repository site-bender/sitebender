import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _rotateRightArray from "../_rotateRightArray/index.ts"

//++ [PRIVATE] Rotates elements right by n positions, returning Validation monad
export default function _rotateRightToValidation<T>(
	positions: number,
) {
	return function _rotateRightToValidationByPositions(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, Array<T>> {
		return success(rotateRightArray<T>(positions)(array))
	}
}
