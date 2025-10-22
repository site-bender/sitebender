import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { EmailAddress } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeEmailAddress from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/unsafeEmailAddress/index.ts"
import _normalizeEmail from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/_normalizeEmail/index.ts"
import _validateLocalPart from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/_validateLocalPart/index.ts"
import _validateDomain from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/_validateDomain/index.ts"
import { EMAIL_ADDRESS_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Smart constructor that validates and creates an EmailAddress value
//++ Follows RFC 5321 (SMTP) + RFC 6531 (internationalization)
//++ Normalizes to lowercase and NFC Unicode form
export default function emailAddress(
	email: string,
): Result<ValidationError, EmailAddress> {
	if (email.length === 0) {
		return error({
			code: "EMAIL_ADDRESS_EMPTY",
			field: "emailAddress",
			messages: ["The system needs an email address."],
			received: email,
			expected: "Non-empty string in format local@domain",
			suggestion: "Provide an email address like user@example.com",
			severity: "requirement",
		})
	}

	const normalized = _normalizeEmail(email)

	const atIndex = normalized.indexOf("@")
	const lastAtIndex = normalized.lastIndexOf("@")

	if (atIndex === -1) {
		return error({
			code: "EMAIL_ADDRESS_MISSING_AT_SYMBOL",
			field: "emailAddress",
			messages: [
				"The system needs an @ symbol to separate local and domain parts.",
			],
			received: normalized,
			expected: "Email with @ symbol (local@domain)",
			suggestion:
				"Add @ symbol between local and domain (e.g., user@example.com)",
			severity: "requirement",
		})
	}

	if (atIndex !== lastAtIndex) {
		return error({
			code: "EMAIL_ADDRESS_MULTIPLE_AT_SYMBOLS",
			field: "emailAddress",
			messages: ["The system allows only one @ symbol in email address."],
			received: normalized,
			expected: "Email with exactly one @ symbol",
			suggestion: "Remove extra @ symbols",
			severity: "requirement",
		})
	}

	const local = normalized.slice(0, atIndex)
	const domain = normalized.slice(atIndex + 1)

	const localResult = _validateLocalPart(local)

	if (localResult._tag === "Error") {
		return localResult
	}

	const domainResult = _validateDomain(domain)

	if (domainResult._tag === "Error") {
		return domainResult
	}

	if (normalized.length > EMAIL_ADDRESS_MAX_LENGTH) {
		return error({
			code: "EMAIL_ADDRESS_TOO_LONG",
			field: "emailAddress",
			messages: ["The system limits email addresses to 254 characters."],
			received: normalized,
			expected: "Email with at most 254 characters",
			suggestion:
				`Shorten the email address (currently ${normalized.length} characters)`,
			constraints: { maxLength: EMAIL_ADDRESS_MAX_LENGTH },
			severity: "requirement",
		})
	}

	return ok(unsafeEmailAddress(normalized))
}
