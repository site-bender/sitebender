import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _moveArray from "../_moveArray/index.ts"

//++ [PRIVATE] Moves an element from one position to another, returning Validation monad
export default function _moveToValidation<T>(
	fromIndex: number,
) {
	return function _moveToValidationFrom(
		toIndex: number,
	) {
		return function moveToValidationInArray<T>(
			array: ReadonlyArray<T>,
		): Validation<ValidationError, Array<T>> {
			return success(moveArray<T>(fromIndex)(toIndex)(array))
		}
	}
}
