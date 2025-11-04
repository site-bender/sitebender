import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _splitString from "../_splitString/index.ts"

//++ Splits a string and wraps result in Validation monad (private Validation path)
export default function _splitToValidation(separator: string | RegExp) {
	return function _splitToValidationWithSeparator(
		input: string,
	): Validation<ValidationError, ReadonlyArray<string>> {
		return success(_splitString(separator)(input))
	}
}
