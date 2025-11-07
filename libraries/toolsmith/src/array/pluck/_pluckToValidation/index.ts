import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _pluckArray from "../_pluckArray/index.ts"

//++ [PRIVATE] Plucks property and wraps in Validation monad (accumulator)
export default function _pluckToValidation<T, K extends keyof T>(
	key: K,
) {
	return function _pluckToValidationWithKey(
		array: ReadonlyArray<T>,
	): Validation<ValidationError, Array<T[K] | null>> {
		return success(pluckArray<T>(key)(array))
	}
}
