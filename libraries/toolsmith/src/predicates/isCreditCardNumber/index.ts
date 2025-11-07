import type { CreditCardNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import _validateLuhn from "@sitebender/toolsmith/newtypes/stringTypes/creditCardNumber/_validateLuhn/index.ts"

//++ Type predicate that checks if a string is a valid credit card number
//++ Validates 13-19 digits and Luhn algorithm checksum
export default function isCreditCardNumber(
	value: unknown,
): value is CreditCardNumber {
	//++ [EXCEPTION] typeof, !==, .replace(), .test(), .length, <, >, ||, _tag, and === permitted in Toolsmith for performance - provides credit card validation wrapper
	if (typeof value !== "string") {
		return false
	}

	// Remove spaces and hyphens for validation
	const cleaned = value.replace(/[\s-]/g, "")

	if (!/^\d+$/.test(cleaned)) {
		return false
	}

	if (cleaned.length < 13 || cleaned.length > 19) {
		return false
	}

	const luhnResult = _validateLuhn(cleaned)
	return luhnResult._tag === "Ok"
}
