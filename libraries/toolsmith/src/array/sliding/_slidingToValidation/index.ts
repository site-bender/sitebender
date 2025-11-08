import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _slidingArray from "../_slidingArray/index.ts"

//++ Private helper: creates sliding windows and wraps result in Validation monad
export default function _slidingToValidation<E, T>(size: number) {
	return function _slidingToValidationWithSize(step: number) {
		return function _slidingToValidationWithStep(
			array: ReadonlyArray<T>,
		): Validation<E, ReadonlyArray<ReadonlyArray<T>>> {
			const windows = _slidingArray<T>(size)(step)(array)
			return success<ReadonlyArray<ReadonlyArray<T>>>(windows)
		}
	}
}
