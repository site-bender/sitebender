import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _combinationsArray from "../_combinationsArray/index.ts"

//++ Private helper: generates combinations and wraps result in Validation monad
export default function _combinationsToValidation<T>(k: number) {
	return function _combinationsToValidationWithK(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<ReadonlyArray<T>>> {
		const combinations = _combinationsArray<T>(k)(array)
		return success<ReadonlyArray<ReadonlyArray<T>>>(combinations)
	}
}
