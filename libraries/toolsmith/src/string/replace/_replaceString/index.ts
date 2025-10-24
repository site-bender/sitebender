import and from "../../../logic/and/index.ts"
import or from "../../../logic/or/index.ts"
import isString from "../../../predicates/isString/index.ts"
import isRegExp from "../../../predicates/isRegExp/index.ts"

//++ Private helper that replaces pattern in string, or returns string unchanged if inputs are invalid
export default function _replaceString(pattern: RegExp | string) {
	return function _replaceStringWithPattern(replacement: string) {
		return function _replaceStringWithPatternAndReplacement(
			input: string,
		): string {
			// Happy path: pattern is valid, replacement is valid, input is valid
			if (
				and(or(isString(pattern))(isRegExp(pattern)))(
					and(isString(replacement))(isString(input)),
				)
			) {
				/*++
				 + [EXCEPTION] .replace is permitted here for performance reasons
				 + This is the ONLY place .replace should be used
				 + Everywhere else, use the `replace` function instead
				 */
				return input.replace(pattern, replacement)
			}

			// Fallback: return input unchanged
			return input
		}
	}
}
