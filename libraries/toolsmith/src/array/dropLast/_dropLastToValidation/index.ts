import type { Validation } from "../../../types/fp/validation/index.ts"
import _dropLastArray from "../_dropLastArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _dropLastToValidation<E, T>(n: number) {
	return function _dropLastToValidationWithN(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_dropLastArray<T>(n)(array))
	}
}
