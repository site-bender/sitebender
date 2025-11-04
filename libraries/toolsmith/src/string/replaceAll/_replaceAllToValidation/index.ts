import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import type { ReplacerFunction } from "../../../types/string/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _replaceAllString from "../_replaceAllString/index.ts"

//++ Replaces all occurrences and wraps result in Validation monad (private Validation path)
export default function _replaceAllToValidation(searchValue: string | RegExp) {
	return function _replaceAllToValidationWithSearch(
		replaceValue: string | ReplacerFunction,
	) {
		return function _replaceAllToValidationWithSearchAndReplace(
			input: string,
		): Validation<ValidationError, string> {
			return success(_replaceAllString(searchValue)(replaceValue)(input))
		}
	}
}
