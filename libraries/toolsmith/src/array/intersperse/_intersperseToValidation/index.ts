import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _intersperseArray from "../_intersperseArray/index.ts"

//++ Private helper: intersperses separator and wraps result in Validation monad
export default function _intersperseToValidation<E, T, U>(separator: U) {
	return function _intersperseToValidationWithSeparator(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T | U>> {
		const interspersed = _intersperseArray<T, U>(separator)(array)
		return success<ReadonlyArray<T | U>>(interspersed)
	}
}
