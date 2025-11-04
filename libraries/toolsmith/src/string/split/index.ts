import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import _splitString from "./_splitString/index.ts"
import _splitToResult from "./_splitToResult/index.ts"
import _splitToValidation from "./_splitToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Splits a string into an array using a separator
export default function split(separator: string | RegExp) {
	function splitWithSeparator(
		input: string,
	): ReadonlyArray<string>

	function splitWithSeparator(
		input: Result<ValidationError, string>,
	): Result<ValidationError, ReadonlyArray<string>>

	function splitWithSeparator(
		input: Validation<ValidationError, string>,
	): Validation<ValidationError, ReadonlyArray<string>>

	function splitWithSeparator(
		input:
			| string
			| Result<ValidationError, string>
			| Validation<ValidationError, string>,
	):
		| ReadonlyArray<string>
		| Result<ValidationError, ReadonlyArray<string>>
		| Validation<ValidationError, ReadonlyArray<string>> {
		// Happy path: plain string (most common, zero overhead)
		if (typeof input === "string") {
			return _splitString(separator)(input)
		}

		// Result path: fail-fast monadic transformation
		if (isOk<string>(input)) {
			return chainResults(_splitToResult(separator))(input)
		}

		// Validation path: error accumulation monadic transformation
		if (isSuccess<string>(input)) {
			return chainValidations(_splitToValidation(separator))(input)
		}

		// Fallback: pass through unchanged (error/failure states)
		return input
	}

	return splitWithSeparator
}
