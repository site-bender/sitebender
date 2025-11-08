import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _interleaveArray from "../_interleaveArray/index.ts"

//++ Private helper: interleaves two arrays and wraps result in Validation monad
export default function _interleaveToValidation<E, T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _interleaveToValidationWithFirstArray(
		array2: ReadonlyArray<U>,
	): Validation<E, ReadonlyArray<T | U>> {
		const interleaved = _interleaveArray<T, U>(array1)(array2)
		return success<ReadonlyArray<T | U>>(interleaved)
	}
}
