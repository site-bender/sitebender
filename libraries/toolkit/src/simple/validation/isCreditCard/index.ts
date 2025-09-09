type CardType = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb"

type CreditCardOptions = {
	cardType?: CardType
}

//++ Validates credit card numbers using the Luhn algorithm, optionally checking specific card types
export default function isCreditCard(
	options: CreditCardOptions = {},
) {
	return function validateCreditCard(value: unknown): boolean {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		// Remove spaces and hyphens
		const cleaned = value.replace(/[\s-]/g, "")

		// Check if only digits
		if (!/^\d+$/.test(cleaned)) {
			return false
		}

		// Check length (most cards are 13-19 digits)
		if (cleaned.length < 13 || cleaned.length > 19) {
			return false
		}

		// Card type patterns
		const patterns: Record<CardType, RegExp> = {
			visa: /^4\d{12}(\d{3})?$/,
			mastercard:
				/^(5[1-5]\d{14}|2(22[1-9]|2[3-9]\d|[3-6]\d{2}|7[0-1]\d|720)\d{12})$/,
			amex: /^3[47]\d{13}$/,
			discover: /^(6011|64[4-9]|65)\d{12,15}$/,
			diners: /^(30[0-5]|36|38)\d{11,12}$/,
			jcb: /^35(2[89]|[3-8]\d)\d{12}$/,
		}

		// If specific card type requested, check pattern first
		if (options.cardType) {
			const pattern = patterns[options.cardType]
			if (!pattern.test(cleaned)) {
				return false
			}
		}

		// Luhn algorithm validation
		const digits = cleaned.split("").map((d) => parseInt(d, 10))
		const sum = digits.reverse().reduce((acc, digit, index) => {
			if (index % 2 === 1) {
				const doubled = digit * 2
				return acc + (doubled > 9 ? doubled - 9 : doubled)
			}
			return acc + digit
		}, 0)

		return sum % 10 === 0
	}
}

//?? [EXAMPLE] isCreditCard()("4532015112830366") // true (valid Visa)
//?? [EXAMPLE] isCreditCard()("5425233430109903") // true (valid Mastercard)
//?? [EXAMPLE] isCreditCard()("4532015112830367") // false (invalid checksum)
//?? [EXAMPLE] isCreditCard({ cardType: "visa" })("4532015112830366") // true
//?? [EXAMPLE] isCreditCard({ cardType: "visa" })("5425233430109903") // false (Mastercard)
/*??
 * [EXAMPLE]
 * const isVisa = isCreditCard({ cardType: "visa" })
 * isVisa("4532015112830366")  // true
 * isVisa("5425233430109903")  // false
 *
 * [GOTCHA] Spaces and hyphens are automatically removed from input
 * [PRO] Validates using industry-standard Luhn algorithm
 * [PRO] Supports all major card types with specific pattern validation
 */
