import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import { DOMAIN_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates overall domain structure per RFC 1034/1035
//++ Checks length, dots, leading/trailing characters
export default function _validateDomainStructure(
	domain: string,
): Result<ValidationError, string> {
	if (domain.length === 0) {
		return error({
			code: "DOMAIN_EMPTY",
			field: "domain",
			messages: ["The system needs a domain name."],
			received: domain,
			expected: "Non-empty domain",
			suggestion: "Provide a domain like 'example.com'",
			severity: "requirement",
		})
	}

	if (domain.length > DOMAIN_MAX_LENGTH) {
		return error({
			code: "DOMAIN_TOO_LONG",
			field: "domain",
			messages: ["The system limits domains to 253 characters."],
			received: domain,
			expected: "String with at most 253 characters",
			suggestion:
				`Shorten the domain (currently ${domain.length} characters)`,
			constraints: { maxLength: DOMAIN_MAX_LENGTH },
			severity: "requirement",
		})
	}

	if (!domain.includes(".")) {
		return error({
			code: "DOMAIN_NO_TLD",
			field: "domain",
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
			code: "DOMAIN_LEADING_DOT",
			field: "domain",
			messages: ["The system does not allow domain to start with a dot."],
			received: domain,
			expected: "Domain without leading dot",
			suggestion: "Remove the leading dot",
			severity: "requirement",
		})
	}

	if (domain.endsWith(".")) {
		return error({
			code: "DOMAIN_TRAILING_DOT",
			field: "domain",
			messages: ["The system does not allow domain to end with a dot."],
			received: domain,
			expected: "Domain without trailing dot",
			suggestion: "Remove the trailing dot",
			severity: "requirement",
		})
	}

	if (domain.includes("..")) {
		return error({
			code: "DOMAIN_CONSECUTIVE_DOTS",
			field: "domain",
			messages: [
				"The system does not allow consecutive dots in domain.",
			],
			received: domain,
			expected: "Domain without consecutive dots",
			suggestion: "Use single dots between labels",
			severity: "requirement",
		})
	}

	return ok(domain)
}
