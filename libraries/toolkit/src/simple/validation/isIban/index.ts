/**
 * Validates International Bank Account Numbers (IBAN)
 *
 * Checks whether a string is a valid IBAN according to the ISO 13616 standard.
 * Validates the country code, length requirements per country, and performs
 * mod-97 checksum validation. Accepts IBANs with or without spaces and is
 * case-insensitive. Returns false for non-string values, empty strings,
 * or invalid IBANs.
 *
 * IBAN validation rules:
 * - Starts with 2-letter ISO country code
 * - Followed by 2 check digits
 * - Country-specific length (15-34 characters total)
 * - Passes mod-97 checksum validation
 * - Spaces are ignored for validation
 * - Case-insensitive
 *
 * @param value - The value to validate as an IBAN
 * @returns true if the value is a valid IBAN, false otherwise
 * @example
 * ```typescript
 * // Basic IBAN validation
 * isIban("GB82 WEST 1234 5698 7654 32")     // true
 * isIban("DE89 3704 0044 0532 0130 00")     // true
 * isIban("GB82WEST12345698765432")          // true (no spaces)
 * isIban("INVALID")                          // false
 *
 * // Case insensitive
 * isIban("gb82 west 1234 5698 7654 32")     // true
 *
 * // Different country formats
 * isIban("CH93 0076 2011 6238 5295 7")      // true (Switzerland)
 * isIban("NO93 8601 1117 947")              // true (Norway)
 *
 * // Form validation
 * const validateIban = (value: string): string | null =>
 *   isIban(value) ? null : "Invalid IBAN"
 *
 * // Filter valid IBANs
 * const ibans = ["GB82 WEST 1234 5698 7654 32", "INVALID"]
 * ibans.filter(isIban)  // ["GB82 WEST 1234 5698 7654 32"]
 *
 * // Invalid inputs
 * isIban(null)          // false
 * isIban("")            // false
 * isIban("GB82")        // false (too short)
 * isIban("XX82 TEST")   // false (invalid country)
 * ```
 *
 * @pure
 * @predicate
 * @safe
 */
const isIban = (value: unknown): boolean => {
	if (typeof value !== "string" || value.length === 0) {
		return false
	}

	// Remove spaces and convert to uppercase
	const iban = value.replace(/\s/g, "").toUpperCase()

	// Basic format check: 2 letters, 2 digits, then alphanumeric
	if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) {
		return false
	}

	// Country-specific length requirements
	const ibanLengths: Record<string, number> = {
		AD: 24,
		AE: 23,
		AL: 28,
		AT: 20,
		AZ: 28,
		BA: 20,
		BE: 16,
		BG: 22,
		BH: 22,
		BR: 29,
		BY: 28,
		CH: 21,
		CR: 22,
		CY: 28,
		CZ: 24,
		DE: 22,
		DK: 18,
		DO: 28,
		EE: 20,
		EG: 29,
		ES: 24,
		FI: 18,
		FO: 18,
		FR: 27,
		GB: 22,
		GE: 22,
		GI: 23,
		GL: 18,
		GR: 27,
		GT: 28,
		HR: 21,
		HU: 28,
		IE: 22,
		IL: 23,
		IS: 26,
		IT: 27,
		JO: 30,
		KW: 30,
		KZ: 20,
		LB: 28,
		LC: 32,
		LI: 21,
		LT: 20,
		LU: 20,
		LV: 21,
		MC: 27,
		MD: 24,
		ME: 22,
		MK: 19,
		MR: 27,
		MT: 31,
		MU: 30,
		NL: 18,
		NO: 15,
		PK: 24,
		PL: 28,
		PS: 29,
		PT: 25,
		QA: 29,
		RO: 24,
		RS: 22,
		SA: 24,
		SE: 24,
		SI: 19,
		SK: 24,
		SM: 27,
		TN: 24,
		TR: 26,
		UA: 29,
		VA: 22,
		VG: 24,
		XK: 20,
	}

	const countryCode = iban.substring(0, 2)
	const expectedLength = ibanLengths[countryCode]

	// Check if country code is valid and length matches
	if (!expectedLength || iban.length !== expectedLength) {
		return false
	}

	// Perform mod-97 checksum validation
	// Move first 4 characters to end
	const rearranged = iban.substring(4) + iban.substring(0, 4)

	// Convert letters to numbers (A=10, B=11, ..., Z=35)
	const numericIban = rearranged.split("").map((char) =>
		/[A-Z]/.test(char) ? (char.charCodeAt(0) - 55).toString() : char
	).join("")

	// Calculate mod 97 using string arithmetic to handle large numbers
	const remainder = numericIban.split("").reduce(
		(acc, digit) => (acc * 10 + parseInt(digit, 10)) % 97,
		0,
	)

	return remainder === 1
}

export default isIban
