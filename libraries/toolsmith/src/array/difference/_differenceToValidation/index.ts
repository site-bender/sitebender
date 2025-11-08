import type { Validation } from "../../../types/fp/validation/index.ts"

import _differenceArray from "../_differenceArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _differenceArray for Validation monad path
export default function _differenceToValidation<E, T>(
	subtrahend: ReadonlyArray<T>,
) {
	return function _differenceToValidationWithSubtrahend(
		minuend: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_differenceArray(subtrahend)(minuend))
	}
}
