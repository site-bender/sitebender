import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"

import _trimString from "./_trimString/index.ts"
import _trimToResult from "./_trimToResult/index.ts"
import _trimToValidation from "./_trimToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Trims whitespace from both ends of a string
//++ [OVERLOAD] String trimmer: takes string, returns trimmed string
export default function trim(input: string): string

//++ [OVERLOAD] Result trimmer: takes and returns Result monad (fail fast)
export default function trim(
	input: Result<ValidationError, string>,
): Result<ValidationError, string>

//++ [OVERLOAD] Validation trimmer: takes and returns Validation monad (accumulator)
export default function trim(
	input: Validation<ValidationError, string>,
): Validation<ValidationError, string>

//++ Implementation of the trim function
export default function trim(
	input:
		| string
		| Result<ValidationError, string>
		| Validation<ValidationError, string>,
):
	| string
	| Result<ValidationError, string>
	| Validation<ValidationError, string> {
	// Happy path: plain string
	if (typeof input === "string") {
		return _trimString(input)
	}

	// Result path: fail-fast monadic trimming
	if (isOk<string>(input)) {
		return chainResults(_trimToResult)(input)
	}

	// Validation path: error accumulation monadic trimming
	if (isSuccess<string>(input)) {
		return chainValidations(_trimToValidation)(input)
	}

	// Fallback: pass through unchanged (handles error/failure states)
	return input
}
