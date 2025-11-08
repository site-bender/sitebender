import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _concatArray from "../_concatArray/index.ts"

//++ Private helper: concatenates arrays in Validation monad (error accumulation)
export default function _concatToValidation<E, T>(first: ReadonlyArray<T>) {
	return function _concatToValidationWithFirst(
		second: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_concatArray(first)(second))
	}
}
