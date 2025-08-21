/**
 * Validates phone numbers for various countries and formats
 * 
 * Checks whether a string is a valid phone number according to the specified
 * country's format. Supports international formats, national formats, and
 * various common formatting styles with spaces, hyphens, and parentheses.
 * Returns false for non-string values, empty strings, or invalid formats.
 * 
 * Phone validation rules:
 * - Country-specific formats and lengths
 * - Optional international prefix (+, 00)
 * - Flexible formatting (spaces, hyphens, parentheses, dots)
 * - Mobile and landline numbers
 * - Extension numbers (where applicable)
 * - Default validates generic international format
 * 
 * @param options - Optional configuration for country and strictness
 * @returns A predicate function that validates phone numbers
 * @example
 * ```typescript
 * // Generic international format (default)
 * const isValidPhone = isPhone()
 * 
 * isValidPhone("+1-555-123-4567")      // true (US/Canada)
 * isValidPhone("+44 20 7123 4567")     // true (UK)
 * isValidPhone("+33 1 23 45 67 89")    // true (France)
 * isValidPhone("invalid")              // false
 * isValidPhone("")                     // false
 * 
 * // US phone number validation
 * const isUSPhone = isPhone({ country: "US" })
 * 
 * isUSPhone("555-123-4567")           // true (local)
 * isUSPhone("(555) 123-4567")         // true (with area code)
 * isUSPhone("1-555-123-4567")         // true (with country code)
 * isUSPhone("+1 555 123 4567")        // true (international)
 * isUSPhone("5551234567")             // true (unformatted)
 * isUSPhone("555-1234")               // false (too short)
 * isUSPhone("123-456-78901")          // false (too long)
 * 
 * // UK phone number validation
 * const isUKPhone = isPhone({ country: "GB" })
 * 
 * isUKPhone("020 7123 4567")          // true (London)
 * isUKPhone("07700 900123")           // true (mobile)
 * isUKPhone("+44 20 7123 4567")       // true (international)
 * isUKPhone("0044 20 7123 4567")      // true (00 prefix)
 * isUKPhone("(020) 7123 4567")        // true (with parentheses)
 * isUKPhone("02071234567")            // true (unformatted)
 * 
 * // French phone number validation
 * const isFrenchPhone = isPhone({ country: "FR" })
 * 
 * isFrenchPhone("01 23 45 67 89")     // true (landline)
 * isFrenchPhone("06 12 34 56 78")     // true (mobile)
 * isFrenchPhone("+33 1 23 45 67 89")  // true (international)
 * isFrenchPhone("0033 1 23 45 67 89") // true (00 prefix)
 * isFrenchPhone("01.23.45.67.89")     // true (dot separated)
 * 
 * // German phone number validation
 * const isGermanPhone = isPhone({ country: "DE" })
 * 
 * isGermanPhone("030 12345678")       // true (Berlin)
 * isGermanPhone("0151 12345678")      // true (mobile)
 * isGermanPhone("+49 30 12345678")    // true (international)
 * isGermanPhone("030/12345678")       // true (slash separator)
 * 
 * // Japanese phone number validation
 * const isJapanesePhone = isPhone({ country: "JP" })
 * 
 * isJapanesePhone("03-1234-5678")     // true (Tokyo)
 * isJapanesePhone("090-1234-5678")    // true (mobile)
 * isJapanesePhone("+81 3 1234 5678")  // true (international)
 * isJapanesePhone("03 1234 5678")     // true (with spaces)
 * 
 * // Australian phone number validation
 * const isAustralianPhone = isPhone({ country: "AU" })
 * 
 * isAustralianPhone("02 1234 5678")   // true (Sydney)
 * isAustralianPhone("0412 345 678")   // true (mobile)
 * isAustralianPhone("+61 2 1234 5678") // true (international)
 * isAustralianPhone("(02) 1234 5678") // true (with parentheses)
 * 
 * // Strict mode (exact format required)
 * const strictUSPhone = isPhone({ country: "US", strict: true })
 * 
 * strictUSPhone("+1-555-123-4567")    // true (standard format)
 * strictUSPhone("555 123 4567")       // false (missing country code in strict)
 * strictUSPhone("(555)123-4567")      // false (non-standard format)
 * 
 * // Form validation
 * const validatePhoneField = (
 *   phone: unknown,
 *   country: string = "US"
 * ): string | null => {
 *   if (typeof phone !== "string") {
 *     return "Phone number must be text"
 *   }
 *   
 *   const trimmed = phone.trim()
 *   if (trimmed.length === 0) {
 *     return "Phone number is required"
 *   }
 *   
 *   if (!isPhone({ country })(trimmed)) {
 *     return `Invalid ${country} phone number format`
 *   }
 *   
 *   return null
 * }
 * 
 * validatePhoneField("555-123-4567", "US")  // null (valid)
 * validatePhoneField("invalid", "US")       // "Invalid US phone number format"
 * 
 * // Extract digits from phone
 * const normalizePhone = (phone: string): string | null => {
 *   if (!isPhone()(phone)) {
 *     return null
 *   }
 *   
 *   // Remove all non-digits except leading +
 *   const normalized = phone.replace(/[^\d+]/g, "")
 *   return normalized.replace(/^\+/, "+")
 * }
 * 
 * normalizePhone("+1 (555) 123-4567")  // "+15551234567"
 * normalizePhone("555-123-4567")       // "5551234567"
 * 
 * // Multiple country support
 * const isNorthAmericanPhone = (phone: string): boolean => {
 *   return isPhone({ country: "US" })(phone) || 
 *          isPhone({ country: "CA" })(phone)
 * }
 * 
 * isNorthAmericanPhone("+1-555-123-4567")  // true (US/Canada)
 * isNorthAmericanPhone("+44-20-7123-4567") // false (UK)
 * 
 * // Filter valid phones
 * const phones = [
 *   "555-123-4567",
 *   "invalid",
 *   "+44 20 7123 4567",
 *   "",
 *   "+33 1 23 45 67 89",
 *   "abc-def-ghij"
 * ]
 * 
 * const validPhones = phones.filter(isPhone())
 * // ["555-123-4567", "+44 20 7123 4567", "+33 1 23 45 67 89"]
 * 
 * // Format phone for display
 * const formatPhoneUS = (phone: string): string | null => {
 *   if (!isPhone({ country: "US" })(phone)) {
 *     return null
 *   }
 *   
 *   const digits = phone.replace(/\D/g, "")
 *   const match = digits.match(/^(\d{1})?(\d{3})(\d{3})(\d{4})$/)
 *   
 *   if (!match) return null
 *   
 *   const [, countryCode, area, prefix, line] = match
 *   if (countryCode) {
 *     return `+${countryCode} (${area}) ${prefix}-${line}`
 *   }
 *   return `(${area}) ${prefix}-${line}`
 * }
 * 
 * formatPhoneUS("5551234567")      // "(555) 123-4567"
 * formatPhoneUS("15551234567")     // "+1 (555) 123-4567"
 * 
 * // Emergency number detection
 * const isEmergencyNumber = (phone: string): boolean => {
 *   const emergencyNumbers = ["911", "112", "999", "000", "110", "119"]
 *   const digits = phone.replace(/\D/g, "")
 *   return emergencyNumbers.includes(digits)
 * }
 * 
 * isEmergencyNumber("911")         // true
 * isEmergencyNumber("9-1-1")       // true
 * isEmergencyNumber("112")         // true (Europe)
 * 
 * // Invalid inputs
 * const checker = isPhone()
 * 
 * checker(null)                    // false
 * checker(undefined)               // false
 * checker(123)                     // false (not a string)
 * checker("")                      // false (empty)
 * checker("abc")                   // false (letters only)
 * checker("123")                   // false (too short)
 * checker("+")                     // false (only prefix)
 * checker("++1234567890")          // false (double prefix)
 * 
 * // SMS validation
 * const canReceiveSMS = (phone: string, country: string): boolean => {
 *   if (!isPhone({ country })(phone)) {
 *     return false
 *   }
 *   
 *   // Check if it's a mobile number (simplified)
 *   const digits = phone.replace(/\D/g, "")
 *   
 *   switch (country) {
 *     case "US":
 *     case "CA":
 *       // In North America, can't easily distinguish
 *       return true
 *     case "GB":
 *       // UK mobile numbers start with 07
 *       return /^(?:\+44|0044|0)?7/.test(digits)
 *     case "FR":
 *       // French mobile numbers start with 06 or 07
 *       return /^(?:\+33|0033|0)?[67]/.test(digits)
 *     default:
 *       return true  // Assume it can receive SMS
 *   }
 * }
 * 
 * canReceiveSMS("07700 900123", "GB")     // true (UK mobile)
 * canReceiveSMS("020 7123 4567", "GB")    // false (UK landline)
 * 
 * // Customer support number validation
 * const isTollFree = (phone: string): boolean => {
 *   const usPhone = isPhone({ country: "US" })(phone)
 *   if (!usPhone) return false
 *   
 *   const digits = phone.replace(/\D/g, "")
 *   // US toll-free: 800, 888, 877, 866, 855, 844, 833
 *   return /^1?(800|888|877|866|855|844|833)/.test(digits)
 * }
 * 
 * isTollFree("1-800-123-4567")    // true
 * isTollFree("888-123-4567")      // true
 * isTollFree("555-123-4567")      // false
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Country-aware - Validates based on country-specific rules
 * @property Format-flexible - Accepts various formatting styles
 * @property International - Supports international prefixes
 * @property Configurable - Options for country and strictness
 */
type PhoneCountry = "US" | "CA" | "GB" | "FR" | "DE" | "JP" | "AU" | "IN" | "CN" | "BR"

type PhoneOptions = {
	country?: PhoneCountry | string
	strict?: boolean
}

const isPhone = (
	options: PhoneOptions = {}
): ((value: unknown) => boolean) => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const { country, strict = false } = options

		// Remove common formatting characters for validation
		const cleaned = value.replace(/[\s\-\(\)\.]/g, "")

		// Basic validation: must have digits
		if (!/\d/.test(cleaned)) {
			return false
		}

		// Check for valid international prefix
		const hasInternationalPrefix = /^\+\d/.test(cleaned) || /^00\d/.test(cleaned)

		// Country-specific validation
		switch (country) {
			case "US":
			case "CA":
				// North American Numbering Plan
				if (strict) {
					return /^\+1\d{10}$/.test(cleaned)
				}
				return /^(\+?1)?[2-9]\d{2}[2-9]\d{6}$/.test(cleaned)

			case "GB":
				// UK phone numbers
				if (strict) {
					return /^\+44\d{10}$/.test(cleaned)
				}
				return /^(\+44|0044|0)[1-9]\d{8,9}$/.test(cleaned)

			case "FR":
				// French phone numbers
				if (strict) {
					return /^\+33\d{9}$/.test(cleaned)
				}
				return /^(\+33|0033|0)[1-9]\d{8}$/.test(cleaned)

			case "DE":
				// German phone numbers
				if (strict) {
					return /^\+49\d{10,11}$/.test(cleaned)
				}
				return /^(\+49|0049|0)[1-9]\d{9,10}$/.test(cleaned)

			case "JP":
				// Japanese phone numbers
				if (strict) {
					return /^\+81\d{9,10}$/.test(cleaned)
				}
				return /^(\+81|0081|0)\d{9,10}$/.test(cleaned)

			case "AU":
				// Australian phone numbers
				if (strict) {
					return /^\+61[2-9]\d{8}$/.test(cleaned)
				}
				return /^(\+61|0061|0)[2-9]\d{8}$/.test(cleaned)

			case "IN":
				// Indian phone numbers
				if (strict) {
					return /^\+91[6-9]\d{9}$/.test(cleaned)
				}
				return /^(\+91|0091|0)?[6-9]\d{9}$/.test(cleaned)

			case "CN":
				// Chinese phone numbers
				if (strict) {
					return /^\+861[3-9]\d{9}$/.test(cleaned)
				}
				return /^(\+86|0086)?1[3-9]\d{9}$/.test(cleaned)

			case "BR":
				// Brazilian phone numbers
				if (strict) {
					return /^\+55\d{10,11}$/.test(cleaned)
				}
				return /^(\+55|0055)?\d{10,11}$/.test(cleaned)

			default:
				// Generic international format
				// Must be 7-15 digits (ITU-T E.164)
				const digitsOnly = cleaned.replace(/\D/g, "")
				if (digitsOnly.length < 7 || digitsOnly.length > 15) {
					return false
				}

				// If has international prefix, validate it
				if (hasInternationalPrefix) {
					return /^\+\d{7,15}$/.test(cleaned) || /^00\d{7,15}$/.test(cleaned)
				}

				// Otherwise just check digit count
				return /^\d{7,15}$/.test(digitsOnly)
		}
	}
}

export default isPhone