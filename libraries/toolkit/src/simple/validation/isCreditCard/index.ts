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
 *
 * isValidCard("4532015112830366")      // true (valid Visa)
 * isValidCard("5425233430109903")      // true (valid Mastercard)
 * isValidCard("374245455400126")       // true (valid Amex)
 * isValidCard("4532015112830367")      // false (invalid checksum)
 * isValidCard("1234567890123456")      // false (invalid pattern)
 * isValidCard("")                      // false (empty string)
 *
 * // With spaces and hyphens (commonly formatted)
 * const validator = isCreditCard()
 *
 * validator("4532 0151 1283 0366")     // true (spaces removed)
 * validator("4532-0151-1283-0366")     // true (hyphens removed)
 * validator("4532 0151-1283 0366")     // true (mixed formatting)
 *
 * // Visa card validation
 * const isVisa = isCreditCard({ cardType: "visa" })
 *
 * isVisa("4532015112830366")           // true (16 digit Visa)
 * isVisa("4539578763621486")           // true (another valid Visa)
 * isVisa("5425233430109903")           // false (Mastercard, not Visa)
 * isVisa("374245455400126")            // false (Amex, not Visa)
 *
 * // Mastercard validation
 * const isMastercard = isCreditCard({ cardType: "mastercard" })
 *
 * isMastercard("5425233430109903")     // true (starts with 54)
 * isMastercard("5105105105105100")     // true (starts with 51)
 * isMastercard("2221000000000009")     // true (starts with 2221)
 * isMastercard("4532015112830366")     // false (Visa, not Mastercard)
 *
 * // American Express validation
 * const isAmex = isCreditCard({ cardType: "amex" })
 *
 * isAmex("374245455400126")            // true (starts with 37, 15 digits)
 * isAmex("343434343434343")            // true (starts with 34, 15 digits)
 * isAmex("4532015112830366")           // false (wrong pattern and length)
 *
 * // Discover card validation
 * const isDiscover = isCreditCard({ cardType: "discover" })
 *
 * isDiscover("6011111111111117")       // true (starts with 6011)
 * isDiscover("6445644564456445")       // true (starts with 644)
 * isDiscover("4532015112830366")       // false (Visa, not Discover)
 *
 * // Test card numbers (commonly used in development)
 * const testCards = [
 *   "4532015112830366",  // Visa
 *   "5425233430109903",  // Mastercard
 *   "374245455400126",   // Amex
 *   "6011111111111117",  // Discover
 *   "3530111333300000",  // JCB
 *   "30569309025904",    // Diners
 * ]
 *
 * const genericValidator = isCreditCard()
 * const validTestCards = testCards.filter(genericValidator)
 * // All test cards pass generic validation
 *
 * // Payment form validation
 * const validatePaymentCard = (
 *   cardNumber: unknown,
 *   acceptedCards: Array<"visa" | "mastercard" | "amex">
 * ): string | null => {
 *   if (typeof cardNumber !== "string") {
 *     return "Card number must be text"
 *   }
 *
 *   const cleaned = cardNumber.replace(/[\s-]/g, "")
 *   if (cleaned.length === 0) {
 *     return "Card number is required"
 *   }
 *
 *   for (const cardType of acceptedCards) {
 *     if (isCreditCard({ cardType })(cardNumber)) {
 *       return null // Valid card of accepted type
 *     }
 *   }
 *
 *   if (isCreditCard()(cardNumber)) {
 *     return "Card type not accepted"
 *   }
 *
 *   return "Invalid card number"
 * }
 *
 * validatePaymentCard("4532015112830366", ["visa", "mastercard"])  // null
 * validatePaymentCard("374245455400126", ["visa", "mastercard"])   // "Card type not accepted"
 * validatePaymentCard("1234567890123456", ["visa"])                // "Invalid card number"
 *
 * // Card type detection
 * const detectCardType = (cardNumber: string): string | null => {
 *   const cardTypes = ["visa", "mastercard", "amex", "discover", "diners", "jcb"] as const
 *
 *   for (const type of cardTypes) {
 *     if (isCreditCard({ cardType: type })(cardNumber)) {
 *       return type
 *     }
 *   }
 *
 *   return isCreditCard()(cardNumber) ? "unknown" : null
 * }
 *
 * detectCardType("4532015112830366")   // "visa"
 * detectCardType("5425233430109903")   // "mastercard"
 * detectCardType("374245455400126")    // "amex"
 * detectCardType("1234567890123456")   // null (invalid)
 *
 * // Invalid inputs
 * const checker = isCreditCard()
 *
 * checker(null)                        // false
 * checker(undefined)                   // false
 * checker(123)                         // false (not a string)
 * checker("")                          // false (empty)
 * checker("abc")                       // false (not numeric)
 * checker("4532")                     // false (too short)
 * checker("4532015112830366789012")   // false (too long)
 *
 * // Batch validation
 * const cards = [
 *   "4532015112830366",
 *   "invalid-card",
 *   "5425233430109903",
 *   "",
 *   "374245455400126"
 * ]
 *
 * const validCards = cards.filter(isCreditCard())
 * // ["4532015112830366", "5425233430109903", "374245455400126"]
 *
 * // Masked card validation (last 4 digits)
 * const isValidLast4 = (last4: string): boolean => {
 *   return /^\d{4}$/.test(last4)
 * }
 *
 * isValidLast4("0366")  // true
 * isValidLast4("12ab")  // false
 *
 * // Card expiry validation (separate function, for reference)
 * const isValidExpiry = (month: number, year: number): boolean => {
 *   const now = new Date()
 *   const currentYear = now.getFullYear()
 *   const currentMonth = now.getMonth() + 1
 *
 *   return month >= 1 && month <= 12 &&
 *          year >= currentYear &&
 *          (year > currentYear || month >= currentMonth)
 * }
 * ```
 *
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Luhn-validated - Uses industry-standard checksum algorithm
 * @property Type-aware - Optional validation for specific card brands
 * @property Format-flexible - Accepts spaces and hyphens in input
 * @property Strict - Returns false for invalid formats or checksums
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
		let sum = 0
		let isEven = false

		// Process from right to left
		for (let i = cleaned.length - 1; i >= 0; i--) {
			let digit = parseInt(cleaned[i], 10)

			if (isEven) {
				digit *= 2
				if (digit > 9) {
					digit -= 9
				}
			}

			sum += digit
			isEven = !isEven
		}

		return sum % 10 === 0
	}
}

export default isCreditCard
