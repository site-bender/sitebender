import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import _takeLastWhileArray from "../_takeLastWhileArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _takeLastWhileToValidation<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _takeLastWhileToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(takeLastWhileArray<T>(predicate)(array))
	}
}
