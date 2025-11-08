import type { Result } from "../../../types/fp/result/index.ts"
import type { ReplacerFunction } from "../../../types/string/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _replaceAllString from "../_replaceAllString/index.ts"

//++ Replaces all occurrences and wraps result in Result monad (private Result path)
export default function _replaceAllToResult<E>(searchValue: string | RegExp) {
	return function _replaceAllToResultWithSearch(
		replaceValue: string | ReplacerFunction,
	) {
		return function _replaceAllToResultWithSearchAndReplace(
			input: string,
		): Result<E, string> {
			return ok(_replaceAllString(searchValue)(replaceValue)(input))
		}
	}
}
