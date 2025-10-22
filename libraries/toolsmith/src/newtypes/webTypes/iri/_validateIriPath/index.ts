import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates IRI path component per RFC 3987
//++ Allows full Unicode except control chars and bidi format chars
//++ Empty string is valid (no path specified)
export default function _validateIriPath(
	path: string,
): Result<ValidationError, string> {
	if (path.length === 0) {
		return ok(path)
	}

	// Check for control characters (U+0000..U+001F, U+007F..U+009F)
	// biome-ignore lint: escape needed
	// deno-lint-ignore no-control-regex
	if (/[\x00-\x1F\x7F-\x9F]/.test(path)) {
		return error({
			code: "IRI_PATH_CONTAINS_CONTROL_CHARS",
			field: "iri.path",
			messages: ["The system does not allow control characters in path."],
			received: path,
			expected: "Path without control characters",
			suggestion: "Remove control characters (U+0000..U+001F, U+007F..U+009F)",
			severity: "requirement",
		})
	}

	// Check for bidirectional format characters
	// U+200E (LRM), U+200F (RLM), U+202A..U+202E (bidi embedding/override)
	if (/[\u200E\u200F\u202A-\u202E]/.test(path)) {
		return error({
			code: "IRI_PATH_CONTAINS_BIDI_FORMAT_CHARS",
			field: "iri.path",
			messages: [
				"The system does not allow bidirectional format characters in path.",
			],
			received: path,
			expected: "Path without bidi format characters",
			suggestion:
				"Remove bidi format characters (U+200E, U+200F, U+202A..U+202E)",
			severity: "requirement",
		})
	}

	return ok(path)
}
