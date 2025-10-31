import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { CreditCardNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeCreditCardNumber from "@sitebender/toolsmith/newtypes/stringTypes/creditCardNumber/unsafeCreditCardNumber/index.ts"
import _validateLuhn from "@sitebender/toolsmith/newtypes/stringTypes/creditCardNumber/_validateLuhn/index.ts"

//++ Smart constructor that validates and creates a CreditCardNumber value
//++ Validates length (13-19 digits) and Luhn algorithm checksum
export default function creditCardNumber(
	value: string,
): Result<ValidationError, CreditCardNumber> {
	// Remove spaces and hyphens for validation
	const cleaned = value.replace(/[\s-]/g, "")

	if (!/^\d+$/.test(cleaned)) {
		return error({
			code: "CREDIT_CARD_NUMBER_INVALID_CHARACTERS",
			field: "creditCardNumber",
			messages: ["The system needs a credit card number with only digits."],
			received: value,
			expected: "13-19 digits (spaces and hyphens allowed)",
			suggestion: "Provide digits only, like '4111111111111111' or '4111-1111-1111-1111'",
			severity: "requirement",
		})
	}

	if (cleaned.length < 13 || cleaned.length > 19) {
		return error({
			code: "CREDIT_CARD_NUMBER_INVALID_LENGTH",
			field: "creditCardNumber",
			messages: ["The system needs a credit card number between 13 and 19 digits."],
			received: value,
			expected: "13-19 digits",
			suggestion: "Provide a valid credit card number",
			severity: "requirement",
		})
	}

	const luhnResult = _validateLuhn(cleaned)
	if (luhnResult._tag === "Error") {
		return luhnResult
	}

	return ok(unsafeCreditCardNumber(cleaned))
}

//++ Export the CreditCardNumber branded type
export type { CreditCardNumber }
