import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _concatArray from "../_concatArray/index.ts"

//++ Private helper: concatenates arrays in Validation monad (error accumulation)
export default function _concatToValidation<T>(first: ReadonlyArray<T>) {
	return function _concatToValidationWithFirst(
		second: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_concatArray(first)(second))
	}
}
