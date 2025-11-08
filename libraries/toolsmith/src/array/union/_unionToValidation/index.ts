import type { Validation } from "../../../types/fp/validation/index.ts"

import _unionArray from "../_unionArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _unionArray for Validation monad path
export default function _unionToValidation<E, T>(array1: ReadonlyArray<T>) {
	return function _unionToValidationWithArray1(
		array2: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_unionArray<T>(array1)(array2))
	}
}
