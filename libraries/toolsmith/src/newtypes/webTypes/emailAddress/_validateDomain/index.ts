import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import {
	EMAIL_ADDRESS_DOMAIN_LABEL_MAX_LENGTH,
	EMAIL_ADDRESS_DOMAIN_MAX_LENGTH,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates email domain part (after @) per RFC 5321 + RFC 6531
//++ Accepts internationalized domain names with proper structure
export default function _validateDomain(
	domain: string,
): Result<ValidationError, string> {
	if (domain.length === 0) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_EMPTY",
			field: "emailAddress.domain",
			messages: ["The system needs a domain after the @ symbol."],
			received: domain,
			expected: "Non-empty domain",
			suggestion: "Provide a domain like 'example.com'",
			severity: "requirement",
		})
	}

	if (domain.length > EMAIL_ADDRESS_DOMAIN_MAX_LENGTH) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_TOO_LONG",
			field: "emailAddress.domain",
			messages: ["The system limits domain to 253 characters."],
			received: domain,
			expected: "String with at most 253 characters",
			suggestion: `Shorten the domain (currently ${domain.length} characters)`,
			constraints: { maxLength: EMAIL_ADDRESS_DOMAIN_MAX_LENGTH },
			severity: "requirement",
		})
	}

	if (!domain.includes(".")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_NO_TLD",
			field: "emailAddress.domain",
			messages: [
				"The system needs a top-level domain (e.g., .com, .org).",
			],
			received: domain,
			expected: "Domain with at least one dot",
			suggestion: "Add a TLD like .com or .org (e.g., example.com)",
			severity: "requirement",
		})
	}

	if (domain.startsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_LEADING_DOT",
			field: "emailAddress.domain",
			messages: ["The system does not allow domain to start with a dot."],
			received: domain,
			expected: "Domain without leading dot",
			suggestion: "Remove the leading dot",
			severity: "requirement",
		})
	}

	if (domain.endsWith(".")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_TRAILING_DOT",
			field: "emailAddress.domain",
			messages: ["The system does not allow domain to end with a dot."],
			received: domain,
			expected: "Domain without trailing dot",
			suggestion: "Remove the trailing dot",
			severity: "requirement",
		})
	}

	if (domain.includes("..")) {
		return error({
			code: "EMAIL_ADDRESS_DOMAIN_CONSECUTIVE_DOTS",
			field: "emailAddress.domain",
			messages: [
				"The system does not allow consecutive dots in domain.",
			],
			received: domain,
			expected: "Domain without consecutive dots",
			suggestion: "Use single dots between labels",
			severity: "requirement",
		})
	}

	const labels = domain.split(".")

	for (const label of labels) {
		if (label.length > EMAIL_ADDRESS_DOMAIN_LABEL_MAX_LENGTH) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_LABEL_TOO_LONG",
				field: "emailAddress.domain",
				messages: [
					"The system limits each domain label to 63 characters.",
				],
				received: label,
				expected: "Label with at most 63 characters",
				suggestion:
					`Shorten the domain label '${label}' (currently ${label.length} characters)`,
				constraints: {
					maxLabelLength: EMAIL_ADDRESS_DOMAIN_LABEL_MAX_LENGTH,
				},
				severity: "requirement",
			})
		}

		if (label.startsWith("-")) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_LABEL_LEADING_HYPHEN",
				field: "emailAddress.domain",
				messages: [
					"The system does not allow domain labels to start with hyphen.",
				],
				received: label,
				expected: "Label without leading hyphen",
				suggestion: `Remove leading hyphen from '${label}'`,
				severity: "requirement",
			})
		}

		if (label.endsWith("-")) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_LABEL_TRAILING_HYPHEN",
				field: "emailAddress.domain",
				messages: [
					"The system does not allow domain labels to end with hyphen.",
				],
				received: label,
				expected: "Label without trailing hyphen",
				suggestion: `Remove trailing hyphen from '${label}'`,
				severity: "requirement",
			})
		}

		const validLabelRegex = /^[\p{L}\p{N}\p{M}\-]+$/u

		if (!validLabelRegex.test(label)) {
			return error({
				code: "EMAIL_ADDRESS_DOMAIN_INVALID_CHARACTER",
				field: "emailAddress.domain",
				messages: [
					"The system only allows Unicode letters, numbers, and hyphens in domain labels.",
				],
				received: label,
				expected: "Unicode letters, numbers, and hyphens",
				suggestion: `Remove invalid characters from label '${label}'`,
				severity: "requirement",
			})
		}
	}

	return ok(domain)
}
