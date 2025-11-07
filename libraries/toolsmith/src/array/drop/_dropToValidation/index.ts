import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import _dropArray from "../_dropArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _dropToValidation<T>(n: number) {
	return function _dropToValidationWithN(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, ReadonlyArray<T>> {
		return success(_dropArray<T>(n)(array))
	}
}
