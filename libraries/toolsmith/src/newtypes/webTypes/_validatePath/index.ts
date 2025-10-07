import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Validates URL path component per RFC 3986
//++ Allows unreserved, percent-encoded, sub-delims, and pchar characters
//++ Empty string is valid (no path specified)
export default function _validatePath(
	path: string,
): Result<ValidationError, string> {
	if (path.length === 0) {
		return ok(path)
	}

	if (!path.startsWith("/")) {
		return error({
			code: "URL_PATH_MUST_START_WITH_SLASH",
			field: "url.path",
			messages: ["The system requires path to start with a forward slash."],
			received: path,
			expected: "Path starting with /",
			suggestion: `Add leading slash: '/${path}'`,
			severity: "requirement",
		})
	}

	const validPathRegex = /^\/[\p{L}\p{N}\p{M}\-._~:@!$&'()*+,;=%/]*$/u

	if (!validPathRegex.test(path)) {
		return error({
			code: "URL_PATH_INVALID_CHARACTER",
			field: "url.path",
			messages: [
				"The system only allows valid URL path characters (letters, numbers, and -._~:@!$&'()*+,;=%/).",
			],
			received: path,
			expected: "Valid URL path characters",
			suggestion: "Remove or percent-encode invalid characters",
			severity: "requirement",
		})
	}

	return ok(path)
}
