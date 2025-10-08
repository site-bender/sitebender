import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { IRI_SCHEME_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates IRI scheme per RFC 3987
//++ Scheme must be ASCII only (same as URI)
//++ Accepts any scheme matching [a-z][a-z0-9+.-]*
export default function _validateIriScheme(
	scheme: string,
): Result<ValidationError, string> {
	if (scheme.length === 0) {
		return error({
			code: "IRI_SCHEME_EMPTY",
			field: "iri.scheme",
			messages: ["The system needs an IRI scheme."],
			received: scheme,
			expected: "Non-empty scheme matching [a-z][a-z0-9+.-]*",
			suggestion: "Provide a scheme like 'http', 'mailto', 'urn'",
			severity: "requirement",
		})
	}

	if (scheme.length > IRI_SCHEME_MAX_LENGTH) {
		return error({
			code: "IRI_SCHEME_TOO_LONG",
			field: "iri.scheme",
			messages: ["The system limits IRI scheme to 64 characters."],
			received: scheme,
			expected: "Scheme with at most 64 characters",
			suggestion:
				`Shorten the scheme (currently ${scheme.length} characters)`,
			constraints: { maxLength: IRI_SCHEME_MAX_LENGTH },
			severity: "requirement",
		})
	}

	// Check for Unicode (not allowed in scheme)
	// biome-ignore lint: escape needed
	if (/[^\x00-\x7F]/.test(scheme)) {
		return error({
			code: "IRI_SCHEME_CONTAINS_UNICODE",
			field: "iri.scheme",
			messages: ["The system requires IRI scheme to be ASCII only."],
			received: scheme,
			expected: "ASCII characters only",
			suggestion: "Scheme must use ASCII letters, digits, +, ., or -",
			severity: "requirement",
		})
	}

	// Format validation: [a-z][a-z0-9+.-]*
	const schemeRegex = /^[a-z][a-z0-9+.-]*$/

	if (!schemeRegex.test(scheme)) {
		return error({
			code: "IRI_SCHEME_INVALID_FORMAT",
			field: "iri.scheme",
			messages: [
				"The system requires IRI scheme to match [a-z][a-z0-9+.-]* pattern.",
			],
			received: scheme,
			expected: "Lowercase letter followed by letters, digits, +, ., or -",
			suggestion:
				"Use lowercase ASCII letters, digits, and only +, ., - characters. Must start with letter.",
			severity: "requirement",
		})
	}

	return ok(scheme)
}
