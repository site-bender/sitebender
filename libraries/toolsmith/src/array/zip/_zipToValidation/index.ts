import type { Validation } from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import _zipArray from "../_zipArray/index.ts"

//++ Private helper: zips arrays in Validation monad (error accumulation)
export default function _zipToValidation<E, T, U>(first: ReadonlyArray<T>) {
	return function _zipToValidationWithFirst(
		second: ReadonlyArray<U>,
	): Validation<E, ReadonlyArray<[T, U]>> {
		return success(_zipArray(first)(second))
	}
}
