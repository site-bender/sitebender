import type { Validation, ValidationError } from "../../../types/fp/index.ts"
import _takeLastArray from "../_takeLastArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _takeLastToValidation<T>(n: number) {
	return function _takeLastToValidationWithN(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_takeLastArray(n)(array))
	}
}
