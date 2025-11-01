import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import {
	URL_DOMAIN_LABEL_MAX_LENGTH,
	URL_DOMAIN_MAX_LENGTH,
} from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Validates URL domain part per RFC 3986
//++ Accepts internationalized domain names
//++ Rejects IP addresses (both IPv4 and IPv6)
export default function _validateDomain(
	domain: string,
): Result<ValidationError, string> {
	//++ [EXCEPTION] .length and === permitted in Toolsmith for performance - provides domain validation wrapper
	if (domain.length === 0) {
		return error({
			code: "URL_DOMAIN_EMPTY",
			field: "url.domain",
			messages: ["The system needs a domain after the protocol."],
			received: domain,
			expected: "Non-empty domain",
			suggestion: "Provide a domain like 'example.com'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .length and > permitted in Toolsmith for performance - provides domain validation wrapper
	if (domain.length > URL_DOMAIN_MAX_LENGTH) {
		return error({
			code: "URL_DOMAIN_TOO_LONG",
			field: "url.domain",
			messages: ["The system limits domain to 253 characters."],
			received: domain,
			expected: "String with at most 253 characters",
			suggestion: `Shorten the domain (currently ${domain.length} characters)`,
			constraints: { maxLength: URL_DOMAIN_MAX_LENGTH },
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .startsWith(), .endsWith(), and || permitted in Toolsmith for performance - provides domain validation wrapper
	if (domain.startsWith("[") || domain.endsWith("]")) {
		return error({
			code: "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED",
			field: "url.domain",
			messages: ["The system does not allow IP addresses in URLs."],
			received: domain,
			expected: "Domain name (not IP address)",
			suggestion: "Use a domain name instead of an IP address",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .test() permitted in Toolsmith for performance - provides domain validation wrapper
	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/
	if (ipv4Regex.test(domain)) {
		return error({
			code: "URL_DOMAIN_IP_ADDRESS_NOT_ALLOWED",
			field: "url.domain",
			messages: ["The system does not allow IP addresses in URLs."],
			received: domain,
			expected: "Domain name (not IP address)",
			suggestion: "Use a domain name instead of an IP address",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] !, .includes(), .startsWith(), and .endsWith() permitted in Toolsmith for performance - provides domain validation wrapper
	if (!domain.includes(".")) {
		return error({
			code: "URL_DOMAIN_NO_TLD",
			field: "url.domain",
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
			code: "URL_DOMAIN_LEADING_DOT",
			field: "url.domain",
			messages: ["The system does not allow domain to start with a dot."],
			received: domain,
			expected: "Domain without leading dot",
			suggestion: "Remove the leading dot",
			severity: "requirement",
		})
	}

	if (domain.endsWith(".")) {
		return error({
			code: "URL_DOMAIN_TRAILING_DOT",
			field: "url.domain",
			messages: ["The system does not allow domain to end with a dot."],
			received: domain,
			expected: "Domain without trailing dot",
			suggestion: "Remove the trailing dot",
			severity: "requirement",
		})
	}

	if (domain.includes("..")) {
		return error({
			code: "URL_DOMAIN_CONSECUTIVE_DOTS",
			field: "url.domain",
			messages: [
				"The system does not allow consecutive dots in domain.",
			],
			received: domain,
			expected: "Domain without consecutive dots",
			suggestion: "Use single dots between labels",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .split() permitted in Toolsmith for performance - provides domain validation wrapper
	const labels = domain.split(".")

	const validateLabel = function (
		acc: Result<ValidationError, string>,
	) {
		return function validateLabelWithAcc(
			label: string,
		): Result<ValidationError, string> {
			//++ Short-circuit if already found an error
			if (isError(acc)) {
				return acc
			}

			//++ [EXCEPTION] .length, >, .startsWith(), and .endsWith() permitted in Toolsmith for performance - provides domain label validation wrapper
			//++ Validate label length
			if (label.length > URL_DOMAIN_LABEL_MAX_LENGTH) {
				return error({
					code: "URL_DOMAIN_LABEL_TOO_LONG",
					field: "url.domain",
					messages: [
						"The system limits each domain label to 63 characters.",
					],
					received: label,
					expected: "Label with at most 63 characters",
					suggestion:
						`Shorten the domain label '${label}' (currently ${label.length} characters)`,
					constraints: {
						maxLabelLength: URL_DOMAIN_LABEL_MAX_LENGTH,
					},
					severity: "requirement",
				})
			}

			//++ Validate no leading hyphen
			if (label.startsWith("-")) {
				return error({
					code: "URL_DOMAIN_LABEL_LEADING_HYPHEN",
					field: "url.domain",
					messages: [
						"The system does not allow domain labels to start with hyphen.",
					],
					received: label,
					expected: "Label without leading hyphen",
					suggestion: `Remove leading hyphen from '${label}'`,
					severity: "requirement",
				})
			}

			//++ Validate no trailing hyphen
			if (label.endsWith("-")) {
				return error({
					code: "URL_DOMAIN_LABEL_TRAILING_HYPHEN",
					field: "url.domain",
					messages: [
						"The system does not allow domain labels to end with hyphen.",
					],
					received: label,
					expected: "Label without trailing hyphen",
					suggestion: `Remove trailing hyphen from '${label}'`,
					severity: "requirement",
				})
			}

			//++ [EXCEPTION] !, .test() permitted in Toolsmith for performance - provides domain label validation wrapper
			//++ Validate only allowed characters
			const validLabelRegex = /^[\p{L}\p{N}\p{M}\-]+$/u

			if (!validLabelRegex.test(label)) {
				return error({
					code: "URL_DOMAIN_INVALID_CHARACTER",
					field: "url.domain",
					messages: [
						"The system only allows Unicode letters, numbers, and hyphens in domain labels.",
					],
					received: label,
					expected: "Unicode letters, numbers, and hyphens",
					suggestion: `Remove invalid characters from label '${label}'`,
					severity: "requirement",
				})
			}

			//++ Label is valid, continue with ok
			return ok(domain)
		}
	}

	const labelValidationResult = reduce(validateLabel)(ok(domain))(labels)

	//++ reduce returns Result<ValidationError, Result<ValidationError, string>>
	//++ Need to unwrap the nested Result
	if (isError(labelValidationResult)) {
		return error(labelValidationResult.error)
	}

	return labelValidationResult.value
}
