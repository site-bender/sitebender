import type { Validation } from "../../../types/fp/validation/index.ts"

import _nubArray from "../_nubArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Private helper: wraps _nubArray for Validation monad path
export default function _nubToValidation<E, T>(
	array: ReadonlyArray<T>,
): Validation<E, ReadonlyArray<T>> {
	return success(_nubArray<T>(array))
}
