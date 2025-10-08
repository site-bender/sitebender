import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { URI_SCHEME_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates URI scheme per RFC 3986
//++ Accepts any scheme matching [a-z][a-z0-9+.-]*
export default function _validateScheme(
	scheme: string,
): Result<ValidationError, string> {
	if (scheme.length === 0) {
		return error({
			code: "URI_SCHEME_EMPTY",
			field: "uri.scheme",
			messages: ["The system needs a URI scheme."],
			received: scheme,
			expected: "Non-empty scheme matching [a-z][a-z0-9+.-]*",
			suggestion: "Provide a scheme like 'http', 'mailto', 'urn'",
			severity: "requirement",
		})
	}

	if (scheme.length > URI_SCHEME_MAX_LENGTH) {
		return error({
			code: "URI_SCHEME_TOO_LONG",
			field: "uri.scheme",
			messages: ["The system limits URI scheme to 64 characters."],
			received: scheme,
			expected: "Scheme with at most 64 characters",
			suggestion:
				`Shorten the scheme (currently ${scheme.length} characters)`,
			constraints: { maxLength: URI_SCHEME_MAX_LENGTH },
			severity: "requirement",
		})
	}

	const schemeRegex = /^[a-z][a-z0-9+.-]*$/

	if (!schemeRegex.test(scheme)) {
		return error({
			code: "URI_SCHEME_INVALID_FORMAT",
			field: "uri.scheme",
			messages: [
				"The system requires URI scheme to match [a-z][a-z0-9+.-]* pattern.",
			],
			received: scheme,
			expected: "Lowercase letter followed by letters, digits, +, ., or -",
			suggestion:
				"Use lowercase letters, digits, and only +, ., - characters. Must start with letter.",
			severity: "requirement",
		})
	}

	return ok(scheme)
}
