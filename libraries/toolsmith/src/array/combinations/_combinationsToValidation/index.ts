import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _combinationsArray from "../_combinationsArray/index.ts"

//++ Private helper: generates combinations and wraps result in Validation monad
export default function _combinationsToValidation<E, T>(k: number) {
	return function _combinationsToValidationWithK(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>> {
		const combinations = _combinationsArray<T>(k)(array)
		return success<ReadonlyArray<ReadonlyArray<T>>>(combinations)
	}
}
