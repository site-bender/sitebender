import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _reverseArray from "../_reverseArray/index.ts"

//++ [PRIVATE] Reverses array order, returning Validation monad
export default function _reverseToValidation<T>(
	array: ReadonlyArray<T>,
): Validation<ValidationError, Array<T>> {
	return success(reverseArray<T>(array))
}
