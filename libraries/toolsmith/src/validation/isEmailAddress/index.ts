import type { EmailAddress } from "@sitebender/toolsmith/types/branded/index.ts"

import _normalizeEmail from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/_normalizeEmail/index.ts"
import _validateLocalPart from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/_validateLocalPart/index.ts"
import _validateDomain from "@sitebender/toolsmith/newtypes/webTypes/emailAddress/_validateDomain/index.ts"
import { EMAIL_ADDRESS_MAX_LENGTH } from "@sitebender/toolsmith/newtypes/constants/index.ts"

//++ Type predicate that checks if a string is a valid email address
//++ Validates structure, local part, domain, and total length after normalization
export default function isEmailAddress(email: string): email is EmailAddress {
	if (email.length === 0) {
		return false
	}

	const normalized = _normalizeEmail(email)

	const atIndex = normalized.indexOf("@")
	const lastAtIndex = normalized.lastIndexOf("@")

	if (atIndex === -1 || atIndex !== lastAtIndex) {
		return false
	}

	const local = normalized.slice(0, atIndex)
	const domain = normalized.slice(atIndex + 1)

	const localResult = _validateLocalPart(local)

	if (localResult._tag === "Error") {
		return false
	}

	const domainResult = _validateDomain(domain)

	if (domainResult._tag === "Error") {
		return false
	}

	if (normalized.length > EMAIL_ADDRESS_MAX_LENGTH) {
		return false
	}

	return true
}
