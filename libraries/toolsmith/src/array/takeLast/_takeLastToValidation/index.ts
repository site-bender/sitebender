import type { Validation } from "../../../types/fp/validation/index.ts"
import _takeLastArray from "../_takeLastArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _takeLastToValidation<E, T>(n: number) {
	return function _takeLastToValidationWithN(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_takeLastArray<T>(n)(array))
	}
}
