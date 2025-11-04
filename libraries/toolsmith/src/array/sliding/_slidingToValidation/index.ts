import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _slidingArray from "../_slidingArray/index.ts"

//++ Private helper: creates sliding windows and wraps result in Validation monad
export default function _slidingToValidation<T>(size: number) {
	return function _slidingToValidationWithSize(step: number) {
		return function _slidingToValidationWithStep(
			array: ReadonlyArray<T>,
		): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
			const windows = _slidingArray(size)(step)(array)
			return success(windows)
		}
	}
}
