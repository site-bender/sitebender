import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates IRI query component per RFC 3987
//++ Allows full Unicode except control chars and bidi format chars
//++ Empty string is valid (no query specified)
export default function _validateIriQuery(
	query: string,
): Result<ValidationError, string> {
	if (query.length === 0) {
		return ok(query)
	}

	// Check for control characters
	// biome-ignore lint: escape needed
	if (/[\x00-\x1F\x7F-\x9F]/.test(query)) {
		return error({
			code: "IRI_QUERY_CONTAINS_CONTROL_CHARS",
			field: "iri.query",
			messages: ["The system does not allow control characters in query."],
			received: query,
			expected: "Query without control characters",
			suggestion: "Remove control characters (U+0000..U+001F, U+007F..U+009F)",
			severity: "requirement",
		})
	}

	// Check for bidirectional format characters
	if (/[\u200E\u200F\u202A-\u202E]/.test(query)) {
		return error({
			code: "IRI_QUERY_CONTAINS_BIDI_FORMAT_CHARS",
			field: "iri.query",
			messages: [
				"The system does not allow bidirectional format characters in query.",
			],
			received: query,
			expected: "Query without bidi format characters",
			suggestion: "Remove bidi format characters (U+200E, U+200F, U+202A..U+202E)",
			severity: "requirement",
		})
	}

	return ok(query)
}
