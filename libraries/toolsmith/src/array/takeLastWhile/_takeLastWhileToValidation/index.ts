import type { Validation } from "../../../types/fp/validation/index.ts"
import _takeLastWhileArray from "../_takeLastWhileArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _takeLastWhileToValidation<E, T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _takeLastWhileToValidationWithPredicate(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_takeLastWhileArray<T>(predicate)(array))
	}
}
