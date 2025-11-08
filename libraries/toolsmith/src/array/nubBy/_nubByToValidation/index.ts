import type { Validation } from "../../../types/fp/validation/index.ts"

import _nubByArray from "../_nubByArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _nubByArray for Validation monad path
export default function _nubByToValidation<E, T>(
	equalityFn: (a: T, b: T) => boolean,
) {
	return function _nubByToValidationWithEqualityFn(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_nubByArray<T>(equalityFn)(array))
	}
}
