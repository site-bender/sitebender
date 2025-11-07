import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import _dropRepeatsArray from "../_dropRepeatsArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _dropRepeatsArray for Validation monad path
export default function _dropRepeatsToValidation<T>(
	array: ReadonlyArray<T>,
): Validation<ValidationError, ReadonlyArray<T>> {
	return success(_dropRepeatsArray<T>(array))
}
