import type { Validation, ValidationError } from "../../../types/fp/index.ts"
import _takeArray from "../_takeArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _takeToValidation<T>(n: number) {
	return function _takeToValidationWithN(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_takeArray(n)(array))
	}
}
