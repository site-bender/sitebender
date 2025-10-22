import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates URL query string component per RFC 3986
//++ Allows unreserved, percent-encoded, sub-delims, and query characters
//++ Empty string is valid (no query specified)
export default function _validateQuery(
	query: string,
): Result<ValidationError, string> {
	if (query.length === 0) {
		return ok(query)
	}

	const validQueryRegex = /^[\p{L}\p{N}\p{M}\-._~:@!$&'()*+,;=%/?]*$/u

	if (!validQueryRegex.test(query)) {
		return error({
			code: "URL_QUERY_INVALID_CHARACTER",
			field: "url.query",
			messages: [
				"The system only allows valid URL query characters (letters, numbers, and -._~:@!$&'()*+,;=%/?).",
			],
			received: query,
			expected: "Valid URL query characters",
			suggestion: "Remove or percent-encode invalid characters",
			severity: "requirement",
		})
	}

	return ok(query)
}
