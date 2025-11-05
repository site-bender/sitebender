import type {
	Validation,
	ValidationError,
} from "../../../types/fp/index.ts"

import _nubArray from "../_nubArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _nubArray for Validation monad path
export default function _nubToValidation<T>(
	array: ReadonlyArray<T>,
): Validation<ValidationError, ReadonlyArray<T>> {
	return success(_nubArray(array))
}
