import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { EMAIL_ADDRESS_LOCAL_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates email local part (before @) per RFC 5321 + RFC 6531
//++ Accepts Unicode letters/numbers and . _ - + special chars
export default function _validateLocalPart(
	local: string,
): Result<ValidationError, string> {
	if (local.length === 0) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_EMPTY",
			field: "emailAddress.localPart",
			messages: ["The system needs a local part before the @ symbol."],
			received: local,
			expected: "Non-empty string before @",
			suggestion: "Provide a local part like 'user' in user@example.com",
			severity: "requirement",
		})
	}

	if (local.length > EMAIL_ADDRESS_LOCAL_MAX_LENGTH) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_TOO_LONG",
			field: "emailAddress.localPart",
			messages: ["The system limits local part to 64 characters."],
			received: local,
			expected: "String with at most 64 characters",
			suggestion:
				`Shorten the local part (currently ${local.length} characters)`,
			constraints: { maxLength: EMAIL_ADDRESS_LOCAL_MAX_LENGTH },
			severity: "requirement",
		})
	}

	if (local.startsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_LEADING_DOT",
			field: "emailAddress.localPart",
			messages: [
				"The system does not allow local part to start with a dot.",
			],
			received: local,
			expected: "Local part without leading dot",
			suggestion: "Remove the leading dot",
			severity: "requirement",
		})
	}

	if (local.endsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_TRAILING_DOT",
			field: "emailAddress.localPart",
			messages: ["The system does not allow local part to end with a dot."],
			received: local,
			expected: "Local part without trailing dot",
			suggestion: "Remove the trailing dot",
			severity: "requirement",
		})
	}

	if (local.includes("..")) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_CONSECUTIVE_DOTS",
			field: "emailAddress.localPart",
			messages: [
				"The system does not allow consecutive dots in local part.",
			],
			received: local,
			expected: "Local part without consecutive dots",
			suggestion:
				"Use single dots between parts (e.g., first.last not first..last)",
			severity: "requirement",
		})
	}

	const validCharRegex = /^[\p{L}\p{N}\p{M}._\-+]+$/u

	if (!validCharRegex.test(local)) {
		return error({
			code: "EMAIL_ADDRESS_LOCAL_PART_INVALID_CHARACTER",
			field: "emailAddress.localPart",
			messages: [
				"The system only allows Unicode letters, numbers, and . _ - + in local part.",
			],
			received: local,
			expected: "Unicode letters, numbers, and . _ - +",
			suggestion:
				"Remove special characters. Allowed: letters, numbers, dots, underscores, hyphens, plus signs",
			severity: "requirement",
		})
	}

	return ok(local)
}
