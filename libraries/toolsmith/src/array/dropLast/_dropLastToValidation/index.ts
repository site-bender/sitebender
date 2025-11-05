import type { Validation, ValidationError } from "../../../types/fp/index.ts"
import _dropLastArray from "../_dropLastArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _dropLastToValidation<T>(n: number) {
	return function _dropLastToValidationWithN(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_dropLastArray(n)(array))
	}
}
