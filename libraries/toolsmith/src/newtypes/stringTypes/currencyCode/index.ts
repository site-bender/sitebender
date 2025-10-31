import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { CurrencyCode } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeCurrencyCode from "@sitebender/toolsmith/newtypes/stringTypes/currencyCode/unsafeCurrencyCode/index.ts"

//++ Smart constructor that validates and creates a CurrencyCode value
//++ Validates ISO 4217 format: 3 uppercase letters (USD, EUR, GBP, etc.)
export default function currencyCode(
	value: string,
): Result<ValidationError, CurrencyCode> {
	if (value.length !== 3) {
		return error({
			code: "CURRENCY_CODE_INVALID_LENGTH",
			field: "currencyCode",
			messages: ["The system needs a 3-letter currency code."],
			received: value,
			expected: "3 uppercase letters (ISO 4217)",
			suggestion: "Provide a valid currency code like 'USD', 'EUR', 'GBP', or 'JPY'",
			severity: "requirement",
		})
	}

	const normalized = value.toLocaleUpperCase()
	const isValid = /^[A-Z]{3}$/.test(normalized)

	if (!isValid) {
		return error({
			code: "CURRENCY_CODE_INVALID_FORMAT",
			field: "currencyCode",
			messages: ["The system needs a currency code with only letters."],
			received: value,
			expected: "3 uppercase letters (A-Z)",
			suggestion: "Provide a valid ISO 4217 currency code",
			severity: "requirement",
		})
	}

	return ok(unsafeCurrencyCode(normalized))
}

//++ Export the CurrencyCode branded type
export type { CurrencyCode }
