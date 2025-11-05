import type {
	Validation,
	ValidationError,
} from "../../../types/fp/index.ts"

import _unionArray from "../_unionArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _unionArray for Validation monad path
export default function _unionToValidation<T>(array1: ReadonlyArray<T>) {
	return function _unionToValidationWithArray1(
		array2: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_unionArray(array1)(array2))
	}
}
