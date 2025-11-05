import type {
	Validation,
	ValidationError,
} from "../../../types/fp/index.ts"

import _intersectionArray from "../_intersectionArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _intersectionArray for Validation monad path
export default function _intersectionToValidation<T>(
	array2: ReadonlyArray<T>,
) {
	return function _intersectionToValidationWithArray2(
		array1: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_intersectionArray(array2)(array1))
	}
}
