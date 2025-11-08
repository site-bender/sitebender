import type { Validation } from "../../../types/fp/validation/index.ts"
import _takeArray from "../_takeArray/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Monadic wrapper for Validation path
//++ Takes plain array, returns Validation-wrapped array
export default function _takeToValidation<E, T>(n: number) {
	return function _takeToValidationWithN(
		array: ReadonlyArray<T>,
	): Validation<E, ReadonlyArray<T>> {
		return success(_takeArray<T>(n)(array))
	}
}
