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

//?? [EXAMPLE] isCreditCard()("4532015112830366") // true (valid Visa)
//?? [EXAMPLE] isCreditCard()("5425233430109903") // true (valid Mastercard)
//?? [EXAMPLE] isCreditCard()("4532015112830367") // false (invalid checksum)
//?? [EXAMPLE] isCreditCard({ cardType: "visa" })("4532015112830366") // true
//?? [EXAMPLE] isCreditCard({ cardType: "visa" })("5425233430109903") // false (Mastercard)
/*??
 | [EXAMPLE]
 | const isVisa = isCreditCard({ cardType: "visa" })
 | isVisa("4532015112830366")  // true
 | isVisa("5425233430109903")  // false
 |
 | [GOTCHA] Spaces and hyphens are automatically removed from input
 | [PRO] Validates using industry-standard Luhn algorithm
 | [PRO] Supports all major card types with specific pattern validation
 |
*/
