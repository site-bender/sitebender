import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _apertureArray from "../_apertureArray/index.ts"

//++ Private helper: creates sliding windows and wraps result in Validation monad
export default function _apertureToValidation<T>(width: number) {
	return function _apertureToValidationWithWidth(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		const windows = _apertureArray<T>(width)(array)
		return success<ReadonlyArray<ReadonlyArray<T>>>(windows)
	}
}
