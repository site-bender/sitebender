import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _moveArray from "../_moveArray/index.ts"

//++ [PRIVATE] Moves an element from one position to another, returning Validation monad
export default function _moveToValidation<E, T>(
	fromIndex: number,
) {
	return function _moveToValidationFrom(
		toIndex: number,
	) {
		return function moveToValidationInArray(
			array: ReadonlyArray<T>,
		): Validation<E, Array<T>> {
			return success(_moveArray<T>(fromIndex)(toIndex)(array))
		}
	}
}
