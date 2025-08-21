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
 * isIban("GB82 WEST 1234 5698 7654 32")     // true (UK)
 * isIban("DE89 3704 0044 0532 0130 00")     // true (Germany)
 * isIban("FR14 2004 1010 0505 0001 3M02 606") // true (France)
 * isIban("ES91 2100 0418 4502 0005 1332")   // true (Spain)
 * isIban("IT60 X054 2811 1010 0000 0123 456") // true (Italy)
 * isIban("INVALID")                          // false
 * isIban("")                                 // false
 * 
 * // Without spaces
 * isIban("GB82WEST12345698765432")          // true
 * isIban("DE89370400440532013000")          // true
 * isIban("FR1420041010050500013M02606")     // true
 * 
 * // Case insensitive
 * isIban("gb82 west 1234 5698 7654 32")     // true (lowercase)
 * isIban("GB82 WEST 1234 5698 7654 32")     // true (uppercase)
 * isIban("Gb82 WeSt 1234 5698 7654 32")     // true (mixed case)
 * 
 * // Different country formats
 * isIban("CH93 0076 2011 6238 5295 7")      // true (Switzerland)
 * isIban("NO93 8601 1117 947")              // true (Norway)
 * isIban("PL61 1090 1014 0000 0712 1981 2874") // true (Poland)
 * isIban("BE68 5390 0754 7034")             // true (Belgium)
 * isIban("NL91 ABNA 0417 1643 00")          // true (Netherlands)
 * 
 * // Payment form validation
 * const validateIbanField = (
 *   iban: unknown
 * ): string | null => {
 *   if (typeof iban !== "string") {
 *     return "IBAN must be text"
 *   }
 *   
 *   const trimmed = iban.trim()
 *   if (trimmed.length === 0) {
 *     return "IBAN is required"
 *   }
 *   
 *   if (!isIban(trimmed)) {
 *     return "Invalid IBAN format"
 *   }
 *   
 *   return null
 * }
 * 
 * validateIbanField("GB82 WEST 1234 5698 7654 32")  // null (valid)
 * validateIbanField("INVALID")                       // "Invalid IBAN format"
 * validateIbanField("")                              // "IBAN is required"
 * 
 * // Extract country code
 * const getIbanCountry = (iban: string): string | null => {
 *   if (!isIban(iban)) {
 *     return null
 *   }
 *   
 *   const cleaned = iban.replace(/\s/g, "").toUpperCase()
 *   return cleaned.substring(0, 2)
 * }
 * 
 * getIbanCountry("GB82 WEST 1234 5698 7654 32")  // "GB"
 * getIbanCountry("DE89 3704 0044 0532 0130 00")  // "DE"
 * getIbanCountry("INVALID")                       // null
 * 
 * // Format IBAN for display
 * const formatIban = (iban: string): string | null => {
 *   if (!isIban(iban)) {
 *     return null
 *   }
 *   
 *   const cleaned = iban.replace(/\s/g, "").toUpperCase()
 *   // Format in groups of 4
 *   return cleaned.replace(/(.{4})/g, "$1 ").trim()
 * }
 * 
 * formatIban("GB82WEST12345698765432")  // "GB82 WEST 1234 5698 7654 32"
 * formatIban("DE89370400440532013000")  // "DE89 3704 0044 0532 0130 00"
 * 
 * // Validate multiple IBANs
 * const ibans = [
 *   "GB82 WEST 1234 5698 7654 32",
 *   "DE89 3704 0044 0532 0130 00",
 *   "INVALID IBAN",
 *   "",
 *   "FR14 2004 1010 0505 0001 3M02 606"
 * ]
 * 
 * const validIbans = ibans.filter(isIban)
 * // ["GB82 WEST 1234 5698 7654 32", "DE89 3704 0044 0532 0130 00", "FR14 2004 1010 0505 0001 3M02 606"]
 * 
 * // Bank transfer validation
 * const validateBankTransfer = (
 *   senderIban: string,
 *   recipientIban: string
 * ): Array<string> => {
 *   const errors: Array<string> = []
 *   
 *   if (!isIban(senderIban)) {
 *     errors.push("Invalid sender IBAN")
 *   }
 *   
 *   if (!isIban(recipientIban)) {
 *     errors.push("Invalid recipient IBAN")
 *   }
 *   
 *   if (senderIban === recipientIban) {
 *     errors.push("Sender and recipient cannot be the same")
 *   }
 *   
 *   return errors
 * }
 * 
 * validateBankTransfer(
 *   "GB82 WEST 1234 5698 7654 32",
 *   "DE89 3704 0044 0532 0130 00"
 * )  // []
 * 
 * // SEPA validation (Eurozone countries)
 * const isSepaIban = (iban: string): boolean => {
 *   if (!isIban(iban)) {
 *     return false
 *   }
 *   
 *   const sepaCountries = [
 *     "AD", "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE",
 *     "ES", "FI", "FR", "GB", "GI", "GR", "HR", "HU", "IE", "IS",
 *     "IT", "LI", "LT", "LU", "LV", "MC", "MT", "NL", "NO", "PL",
 *     "PT", "RO", "SE", "SI", "SK", "SM", "VA"
 *   ]
 *   
 *   const country = getIbanCountry(iban)
 *   return country !== null && sepaCountries.includes(country)
 * }
 * 
 * isSepaIban("DE89 3704 0044 0532 0130 00")  // true (Germany)
 * isSepaIban("US12 3456 7890 1234 5678 90")  // false (USA not in SEPA)
 * 
 * // Invalid inputs
 * isIban(null)                                // false
 * isIban(undefined)                           // false
 * isIban(123)                                 // false (not a string)
 * isIban("")                                  // false (empty)
 * isIban("GB82")                              // false (too short)
 * isIban("XX82 WEST 1234 5698 7654 32")      // false (invalid country)
 * isIban("GB00 WEST 1234 5698 7654 32")      // false (invalid checksum)
 * isIban("GB82 WEST 1234 5698 7654")         // false (wrong length)
 * 
 * // Mask IBAN for display
 * const maskIban = (iban: string): string | null => {
 *   if (!isIban(iban)) {
 *     return null
 *   }
 *   
 *   const cleaned = iban.replace(/\s/g, "").toUpperCase()
 *   const masked = cleaned.substring(0, 6) + 
 *                  cleaned.substring(6, cleaned.length - 4).replace(/./g, "*") +
 *                  cleaned.substring(cleaned.length - 4)
 *   
 *   return masked.replace(/(.{4})/g, "$1 ").trim()
 * }
 * 
 * maskIban("GB82 WEST 1234 5698 7654 32")  // "GB82 WE** **** **** **** **32"
 * 
 * // Database storage (normalized)
 * const normalizeIban = (iban: string): string | null => {
 *   if (!isIban(iban)) {
 *     return null
 *   }
 *   
 *   return iban.replace(/\s/g, "").toUpperCase()
 * }
 * 
 * normalizeIban("gb82 west 1234 5698 7654 32")  // "GB82WEST12345698765432"
 * normalizeIban("  GB82 WEST 1234 5698 7654 32  ")  // "GB82WEST12345698765432"
 * 
 * // Validate beneficiary details
 * type BeneficiaryDetails = {
 *   name: string
 *   iban: string
 *   bic?: string
 * }
 * 
 * const validateBeneficiary = (
 *   details: BeneficiaryDetails
 * ): Array<string> => {
 *   const errors: Array<string> = []
 *   
 *   if (!details.name || details.name.trim().length === 0) {
 *     errors.push("Beneficiary name is required")
 *   }
 *   
 *   if (!isIban(details.iban)) {
 *     errors.push("Invalid beneficiary IBAN")
 *   }
 *   
 *   return errors
 * }
 * ```
 * 
 * @property Pure - No side effects, returns consistent results
 * @property ISO-compliant - Follows ISO 13616 standard
 * @property Checksum-validated - Uses mod-97 algorithm
 * @property Country-aware - Validates country-specific lengths
 * @property Format-flexible - Accepts spaces and mixed case
 * @property Strict - Returns false for invalid checksums or formats
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
		AD: 24, AE: 23, AL: 28, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22,
		BH: 22, BR: 29, BY: 28, CH: 21, CR: 22, CY: 28, CZ: 24, DE: 22,
		DK: 18, DO: 28, EE: 20, EG: 29, ES: 24, FI: 18, FO: 18, FR: 27,
		GB: 22, GE: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21, HU: 28,
		IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
		LC: 32, LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22,
		MK: 19, MR: 27, MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28,
		PS: 29, PT: 25, QA: 29, RO: 24, RS: 22, SA: 24, SE: 24, SI: 19,
		SK: 24, SM: 27, TN: 24, TR: 26, UA: 29, VA: 22, VG: 24, XK: 20
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
	let numericIban = ""
	for (const char of rearranged) {
		if (/[A-Z]/.test(char)) {
			numericIban += (char.charCodeAt(0) - 55).toString()
		} else {
			numericIban += char
		}
	}

	// Calculate mod 97 using string arithmetic to handle large numbers
	let remainder = 0
	for (let i = 0; i < numericIban.length; i++) {
		remainder = (remainder * 10 + parseInt(numericIban[i], 10)) % 97
	}

	return remainder === 1
}

export default isIban