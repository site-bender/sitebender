/**
 * Validates credit card numbers using the Luhn algorithm
 *
 * Checks whether a string is a valid credit card number using the Luhn algorithm
 * (also known as the modulus 10 or mod 10 algorithm). This is a checksum formula
 * used to validate identification numbers such as credit card numbers. Optionally
 * validates specific card types based on their known patterns. Returns false for
 * non-string values, empty strings, or strings that don't pass validation.
 *
 * Validation process:
 * - Removes spaces and hyphens from the input
 * - Checks if the result contains only digits
 * - Validates length (typically 13-19 digits)
 * - Applies the Luhn algorithm for checksum validation
 * - Optionally validates against specific card type patterns
 * - Returns false for invalid inputs or non-matching patterns
 *
 * Supported card types:
 * - visa: Starts with 4, 13 or 16 digits
 * - mastercard: Starts with 51-55 or 2221-2720, 16 digits
 * - amex: Starts with 34 or 37, 15 digits
 * - discover: Starts with 6011, 644-649, or 65, 16 digits
 * - diners: Starts with 300-305, 36, or 38, 14 digits
 * - jcb: Starts with 3528-3589, 16 digits
 *
 * @param options - Optional configuration for card type validation
 * @returns A predicate function that validates credit card numbers
 * @example
 * ```typescript
 * // Basic credit card validation (any card type)
 * const isValidCard = isCreditCard()
 * isValidCard("4532015112830366")      // true (valid Visa)
 * isValidCard("5425233430109903")      // true (valid Mastercard)
 * isValidCard("4532015112830367")      // false (invalid checksum)
 *
 * // With spaces and hyphens (commonly formatted)
 * const validator = isCreditCard()
 * validator("4532 0151 1283 0366")     // true (spaces removed)
 * validator("4532-0151-1283-0366")     // true (hyphens removed)
 *
 * // Specific card type validation
 * const isVisa = isCreditCard({ cardType: "visa" })
 * isVisa("4532015112830366")           // true (16 digit Visa)
 * isVisa("5425233430109903")           // false (Mastercard, not Visa)
 *
 * // Invalid inputs
 * const checker = isCreditCard()
 * checker(null)                        // false
 * checker("")                          // false (empty)
 * checker("abc")                       // false (not numeric)
 *
 * // Card type detection
 * const detectCardType = (cardNumber: string): string | null => {
 *   const cardTypes = ["visa", "mastercard", "amex", "discover", "diners", "jcb"] as const
 *   const found = cardTypes.find(type => isCreditCard({ cardType: type })(cardNumber))
 *   return found || (isCreditCard()(cardNumber) ? "unknown" : null)
 * }
 * detectCardType("4532015112830366")   // "visa"
 * detectCardType("5425233430109903")   // "mastercard"
 * ```
 *
 * @curried
 * @pure
 * @predicate
 */
type CardType = "visa" | "mastercard" | "amex" | "discover" | "diners" | "jcb"

type CreditCardOptions = {
	cardType?: CardType
}

const isCreditCard = (
	options: CreditCardOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
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

export default isCreditCard
