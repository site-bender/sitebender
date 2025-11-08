import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _concatToArray from "../_concatToArray/index.ts"

//++ Private helper: appends array to base in Validation monad (error accumulation)
export default function _concatToToValidation<E, T>(toAppend: ReadonlyArray<T>) {
	return function _concatToToValidationWithAppend(
		baseArray: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_concatToArray(toAppend)(baseArray))
	}
}
