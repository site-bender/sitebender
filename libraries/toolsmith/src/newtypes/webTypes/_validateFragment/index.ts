import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates URL fragment component per RFC 3986
//++ Allows unreserved, percent-encoded, sub-delims, and fragment characters
//++ Empty string is valid (no fragment specified)
export default function _validateFragment(
	fragment: string,
): Result<ValidationError, string> {
	if (fragment.length === 0) {
		return ok(fragment)
	}

	const validFragmentRegex = /^[\p{L}\p{N}\p{M}\-._~:@!$&'()*+,;=%/?]*$/u

	if (!validFragmentRegex.test(fragment)) {
		return error({
			code: "URL_FRAGMENT_INVALID_CHARACTER",
			field: "url.fragment",
			messages: [
				"The system only allows valid URL fragment characters (letters, numbers, and -._~:@!$&'()*+,;=%/?).",
			],
			received: fragment,
			expected: "Valid URL fragment characters",
			suggestion: "Remove or percent-encode invalid characters",
			severity: "requirement",
		})
	}

	return ok(fragment)
}
