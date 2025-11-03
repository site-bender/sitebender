import type { CreditCardOptions } from "./types/index.ts"

import cleanCardNumber from "./cleanCardNumber/index.ts"
import isOnlyDigits from "./isOnlyDigits/index.ts"
import isValidLength from "./isValidLength/index.ts"
import matchesCardType from "./matchesCardType/index.ts"
import passesLuhnCheck from "./passesLuhnCheck/index.ts"

//++ Validates credit card numbers using the Luhn algorithm, optionally checking specific card types
export default function isCreditCard(
	options: CreditCardOptions = {},
) {
	return function validateCreditCard(value: unknown): boolean {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const cleaned = cleanCardNumber(value)

		if (!isOnlyDigits(cleaned)) {
			return false
		}

		if (!isValidLength(cleaned)) {
			return false
		}

		if (options.cardType && !matchesCardType(cleaned, options.cardType)) {
			return false
		}

		return passesLuhnCheck(cleaned)
	}
}
