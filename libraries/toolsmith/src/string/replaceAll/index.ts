import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"
import type { ReplacerFunction } from "../../types/string/index.ts"

import _replaceAllString from "./_replaceAllString/index.ts"
import _replaceAllToResult from "./_replaceAllToResult/index.ts"
import _replaceAllToValidation from "./_replaceAllToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Replaces all occurrences of a search value with a replacement value
export default function replaceAll(searchValue: string | RegExp) {
	return function replaceAllWithSearch(
		replaceValue: string | ReplacerFunction,
	) {
		function replaceAllWithSearchAndReplace(input: string): string

		function replaceAllWithSearchAndReplace(
			input: Result<ValidationError, string>,
		): Result<ValidationError, string>

		function replaceAllWithSearchAndReplace(
			input: Validation<ValidationError, string>,
		): Validation<ValidationError, string>

		function replaceAllWithSearchAndReplace(
			input:
				| string
				| Result<ValidationError, string>
				| Validation<ValidationError, string>,
		):
			| string
			| Result<ValidationError, string>
			| Validation<ValidationError, string> {
			// Happy path: plain string (most common, zero overhead)
			if (typeof input === "string") {
				return _replaceAllString(searchValue)(replaceValue)(input)
			}

			// Result path: fail-fast monadic transformation
			if (isOk<string>(input)) {
				return chainResults(_replaceAllToResult(searchValue)(replaceValue))(
					input,
				)
			}

			// Validation path: error accumulation monadic transformation
			if (isSuccess<string>(input)) {
				return chainValidations(
					_replaceAllToValidation(searchValue)(replaceValue),
				)(input)
			}

			// Fallback: pass through unchanged (error/failure states)
			return input
		}

		return replaceAllWithSearchAndReplace
	}
}
