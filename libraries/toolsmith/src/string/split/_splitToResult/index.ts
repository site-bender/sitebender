import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _splitString from "../_splitString/index.ts"

//++ Splits a string and wraps result in Result monad (private Result path)
export default function _splitToResult(separator: string | RegExp) {
	return function _splitToResultWithSeparator(
		input: string,
	): Result<ValidationError, ReadonlyArray<string>> {
		return ok(_splitString(separator)(input))
	}
}
