import type { Result } from "../../types/fp/result/index.ts"
import type { Validation, ValidationError } from "../../types/fp/validation/index.ts"

import _replaceString from "./_replaceString/index.ts"
import _replaceToResult from "./_replaceToResult/index.ts"
import _replaceToValidation from "./_replaceToValidation/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"

//++ Replaces pattern in string using a replacement string
export default function replace(pattern: RegExp | string) {
	return function replaceWithPattern(replacement: string) {
		//++ [OVERLOAD] String replacer: takes string, returns replaced string
		function replaceWithPatternAndReplacement(input: string): string

		//++ [OVERLOAD] Result replacer: takes and returns Result monad (fail fast)
		function replaceWithPatternAndReplacement(
			input: Result<ValidationError, string>,
		): Result<ValidationError, string>

		//++ [OVERLOAD] Validation replacer: takes and returns Validation monad (accumulator)
		function replaceWithPatternAndReplacement(
			input: Validation<ValidationError, string>,
		): Validation<ValidationError, string>

		//++ Implementation of the full curried function
		function replaceWithPatternAndReplacement(
			input:
				| string
				| Result<ValidationError, string>
				| Validation<ValidationError, string>,
		): string | Result<ValidationError, string> | Validation<ValidationError, string> {
			// Happy path: plain string
			if (typeof input === "string") {
				return _replaceString(pattern)(replacement)(input)
			}

			// Result path: fail-fast monadic replacement
			if (isOk<string>(input)) {
				return chainResults(_replaceToResult(pattern)(replacement))(input)
			}

			// Validation path: error accumulation monadic replacement
			if (isSuccess<string>(input)) {
				return chainValidations(_replaceToValidation(pattern)(replacement))(input)
			}

			// Fallback: pass through unchanged (handles error/failure states)
			return input
		}

		return replaceWithPatternAndReplacement
	}
}
