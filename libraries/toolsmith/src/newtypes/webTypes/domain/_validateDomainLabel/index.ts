import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { DOMAIN_LABEL_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates individual domain label per RFC 1034/1035 and RFC 1123
//++ Checks length, hyphen placement, character validity
//++ First and last characters must be letter or digit per RFC 1123
export default function _validateDomainLabel(
	label: string,
): Result<ValidationError, string> {
	if (label.length === 0) {
		return error({
			code: "DOMAIN_LABEL_EMPTY",
			field: "domain.label",
			messages: ["The system does not allow empty labels."],
			received: label,
			expected: "Non-empty label",
			suggestion: "Remove consecutive dots",
			severity: "requirement",
		})
	}

	if (label.length > DOMAIN_LABEL_MAX_LENGTH) {
		return error({
			code: "DOMAIN_LABEL_TOO_LONG",
			field: "domain.label",
			messages: [
				"The system limits each domain label to 63 characters.",
			],
			received: label,
			expected: "Label with at most 63 characters",
			suggestion:
				`Shorten the label '${label}' (currently ${label.length} characters)`,
			constraints: { maxLabelLength: DOMAIN_LABEL_MAX_LENGTH },
			severity: "requirement",
		})
	}

	if (label.startsWith("-")) {
		return error({
			code: "DOMAIN_LABEL_LEADING_HYPHEN",
			field: "domain.label",
			messages: [
				"The system does not allow labels to start with hyphen.",
			],
			received: label,
			expected: "Label starting with letter or digit",
			suggestion: `Remove leading hyphen from '${label}'`,
			severity: "requirement",
		})
	}

	if (label.endsWith("-")) {
		return error({
			code: "DOMAIN_LABEL_TRAILING_HYPHEN",
			field: "domain.label",
			messages: [
				"The system does not allow labels to end with hyphen.",
			],
			received: label,
			expected: "Label ending with letter or digit",
			suggestion: `Remove trailing hyphen from '${label}'`,
			severity: "requirement",
		})
	}

	if (label.length >= 4 && label[2] === "-" && label[3] === "-") {
		const lowercaseLabel = label.toLowerCase()
		if (!lowercaseLabel.startsWith("xn--")) {
			return error({
				code: "DOMAIN_LABEL_PUNYCODE_CONFLICT",
				field: "domain.label",
				messages: [
					"The system reserves consecutive hyphens at positions 3-4 for Punycode (xn--).",
				],
				received: label,
				expected: "No -- at positions 3-4 (unless Punycode xn--)",
				suggestion: `Remove or reposition hyphens in '${label}'`,
				severity: "requirement",
			})
		}
	}

	const validLabelRegex =
		/^[\p{L}\p{N}][\p{L}\p{N}\p{M}\-]*[\p{L}\p{N}]$|^[\p{L}\p{N}]$/u

	if (!validLabelRegex.test(label)) {
		return error({
			code: "DOMAIN_LABEL_INVALID_CHARACTER",
			field: "domain.label",
			messages: [
				"The system only allows Unicode letters, numbers, and hyphens in labels.",
			],
			received: label,
			expected:
				"Unicode letters, numbers, hyphens (start/end with letter or digit)",
			suggestion: `Remove invalid characters from '${label}'`,
			severity: "requirement",
		})
	}

	return ok(label)
}
