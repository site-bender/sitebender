/**
 * Validates postal codes for various countries
 * 
 * Checks whether a string is a valid postal code (ZIP code) according to
 * the specified country's format. Each country has different postal code
 * formats, lengths, and validation rules. Accepts codes with or without
 * spaces and hyphens where applicable. Returns false for non-string values,
 * empty strings, or invalid formats.
 * 
 * Postal code validation rules:
 * - Country-specific formats and patterns
 * - Optional spaces and hyphens in formatted codes
 * - Case-insensitive for countries with letters
 * - Validates structure, not existence
 * - Default validates generic alphanumeric format
 * 
 * @param options - Configuration for country-specific validation
 * @returns A predicate function that validates postal codes
 * @example
 * ```typescript
 * // US ZIP code validation
 * const isUSZip = isPostalCode({ country: "US" })
 * 
 * isUSZip("12345")              // true (5-digit)
 * isUSZip("12345-6789")         // true (ZIP+4)
 * isUSZip("123456789")          // true (9-digit)
 * isUSZip("1234")               // false (too short)
 * isUSZip("12345-67")           // false (invalid ZIP+4)
 * isUSZip("ABCDE")              // false (letters not allowed)
 * 
 * // Canadian postal code validation
 * const isCanadianPostal = isPostalCode({ country: "CA" })
 * 
 * isCanadianPostal("K1A 0B1")   // true (with space)
 * isCanadianPostal("K1A0B1")    // true (without space)
 * isCanadianPostal("k1a 0b1")   // true (lowercase)
 * isCanadianPostal("K1A-0B1")   // true (with hyphen)
 * isCanadianPostal("D1A 0B1")   // false (D not valid first letter)
 * isCanadianPostal("K1A 0B")    // false (incomplete)
 * 
 * // UK postcode validation
 * const isUKPostcode = isPostalCode({ country: "GB" })
 * 
 * isUKPostcode("SW1A 1AA")      // true (London)
 * isUKPostcode("EC1A 1BB")      // true (London)
 * isUKPostcode("M1 1AE")        // true (Manchester)
 * isUKPostcode("B33 8TH")       // true (Birmingham)
 * isUKPostcode("CR2 6XH")       // true (Croydon)
 * isUKPostcode("DN55 1PT")      // true (Doncaster)
 * isUKPostcode("sw1a1aa")       // true (no space, lowercase)
 * isUKPostcode("SW1A1AAA")      // false (too long)
 * 
 * // German postal code validation
 * const isGermanPostal = isPostalCode({ country: "DE" })
 * 
 * isGermanPostal("10115")       // true (Berlin)
 * isGermanPostal("80331")       // true (Munich)
 * isGermanPostal("01067")       // true (Dresden)
 * isGermanPostal("1234")        // false (too short)
 * isGermanPostal("123456")      // false (too long)
 * isGermanPostal("ABCDE")       // false (letters not allowed)
 * 
 * // French postal code validation
 * const isFrenchPostal = isPostalCode({ country: "FR" })
 * 
 * isFrenchPostal("75001")       // true (Paris)
 * isFrenchPostal("13001")       // true (Marseille)
 * isFrenchPostal("69001")       // true (Lyon)
 * isFrenchPostal("1234")        // false (too short)
 * isFrenchPostal("123456")      // false (too long)
 * 
 * // Japanese postal code validation
 * const isJapanesePostal = isPostalCode({ country: "JP" })
 * 
 * isJapanesePostal("100-0001")  // true (with hyphen)
 * isJapanesePostal("1000001")   // true (without hyphen)
 * isJapanesePostal("〒100-0001") // false (with postal mark)
 * isJapanesePostal("100-001")   // false (incomplete)
 * 
 * // Australian postcode validation
 * const isAustralianPostcode = isPostalCode({ country: "AU" })
 * 
 * isAustralianPostcode("2000")  // true (Sydney)
 * isAustralianPostcode("3000")  // true (Melbourne)
 * isAustralianPostcode("4000")  // true (Brisbane)
 * isAustralianPostcode("200")   // false (too short)
 * isAustralianPostcode("20000") // false (too long)
 * 
 * // Dutch postcode validation
 * const isDutchPostcode = isPostalCode({ country: "NL" })
 * 
 * isDutchPostcode("1234 AB")    // true (with space)
 * isDutchPostcode("1234AB")     // true (without space)
 * isDutchPostcode("1234ab")     // true (lowercase)
 * isDutchPostcode("1234 ABC")   // false (too many letters)
 * isDutchPostcode("123 AB")     // false (too few digits)
 * 
 * // Generic validation (default)
 * const isValidPostal = isPostalCode()
 * 
 * isValidPostal("12345")        // true
 * isValidPostal("A1B 2C3")      // true
 * isValidPostal("SW1A 1AA")     // true
 * isValidPostal("")             // false
 * isValidPostal("!@#$%")        // false
 * 
 * // Form validation
 * const validatePostalCode = (
 *   postal: unknown,
 *   country: string
 * ): string | null => {
 *   if (typeof postal !== "string") {
 *     return "Postal code must be text"
 *   }
 *   
 *   const trimmed = postal.trim()
 *   if (trimmed.length === 0) {
 *     return "Postal code is required"
 *   }
 *   
 *   if (!isPostalCode({ country })(trimmed)) {
 *     return `Invalid ${country} postal code format`
 *   }
 *   
 *   return null
 * }
 * 
 * validatePostalCode("12345", "US")     // null (valid)
 * validatePostalCode("ABCDE", "US")     // "Invalid US postal code format"
 * 
 * // Normalize postal code
 * const normalizePostalCode = (
 *   postal: string,
 *   country: string
 * ): string | null => {
 *   if (!isPostalCode({ country })(postal)) {
 *     return null
 *   }
 *   
 *   const cleaned = postal.replace(/[\s-]/g, "").toUpperCase()
 *   
 *   // Format based on country
 *   switch (country) {
 *     case "US":
 *       if (cleaned.length === 9) {
 *         return cleaned.slice(0, 5) + "-" + cleaned.slice(5)
 *       }
 *       return cleaned
 *     case "CA":
 *       return cleaned.slice(0, 3) + " " + cleaned.slice(3)
 *     case "GB":
 *       const ukMatch = cleaned.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)(\d[A-Z]{2})$/)
 *       if (ukMatch) {
 *         return ukMatch[1] + " " + ukMatch[2]
 *       }
 *       return cleaned
 *     case "JP":
 *       return cleaned.slice(0, 3) + "-" + cleaned.slice(3)
 *     case "NL":
 *       return cleaned.slice(0, 4) + " " + cleaned.slice(4)
 *     default:
 *       return cleaned
 *   }
 * }
 * 
 * normalizePostalCode("12345-6789", "US")  // "12345-6789"
 * normalizePostalCode("123456789", "US")   // "12345-6789"
 * normalizePostalCode("k1a0b1", "CA")      // "K1A 0B1"
 * normalizePostalCode("sw1a1aa", "GB")     // "SW1A 1AA"
 * 
 * // Batch validation
 * const postalCodes = [
 *   "12345",
 *   "K1A 0B1",
 *   "SW1A 1AA",
 *   "invalid",
 *   "75001",
 *   ""
 * ]
 * 
 * const validUS = postalCodes.filter(isPostalCode({ country: "US" }))
 * // ["12345"]
 * 
 * const validGeneric = postalCodes.filter(isPostalCode())
 * // ["12345", "K1A 0B1", "SW1A 1AA", "75001"]
 * 
 * // Extract postal code from address
 * const extractPostalCode = (
 *   address: string,
 *   country: string
 * ): string | null => {
 *   // Simple extraction (real implementation would be more complex)
 *   const patterns: Record<string, RegExp> = {
 *     US: /\b\d{5}(-\d{4})?\b/,
 *     CA: /\b[A-Z]\d[A-Z]\s?\d[A-Z]\d\b/i,
 *     GB: /\b[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}\b/i,
 *     DE: /\b\d{5}\b/,
 *     FR: /\b\d{5}\b/,
 *     JP: /\b\d{3}-?\d{4}\b/
 *   }
 *   
 *   const pattern = patterns[country]
 *   if (!pattern) return null
 *   
 *   const match = address.match(pattern)
 *   if (!match) return null
 *   
 *   const postal = match[0]
 *   return isPostalCode({ country })(postal) ? postal : null
 * }
 * 
 * extractPostalCode("123 Main St, City, ST 12345", "US")  // "12345"
 * extractPostalCode("10 Downing St, London SW1A 1AA", "GB")  // "SW1A 1AA"
 * 
 * // Invalid inputs
 * const checker = isPostalCode()
 * 
 * checker(null)                 // false
 * checker(undefined)            // false
 * checker(123)                  // false (not a string)
 * checker("")                   // false (empty)
 * checker("    ")               // false (whitespace only)
 * checker("!@#$%")              // false (special chars only)
 * 
 * // Regional validation
 * const isEuropeanPostal = (postal: string): boolean => {
 *   const euCountries = ["DE", "FR", "IT", "ES", "NL", "BE", "AT", "SE", "DK", "FI"]
 *   
 *   return euCountries.some(country => 
 *     isPostalCode({ country })(postal)
 *   )
 * }
 * 
 * isEuropeanPostal("10115")     // true (German)
 * isEuropeanPostal("75001")     // true (French)
 * isEuropeanPostal("12345")     // true (could be German)
 * isEuropeanPostal("K1A 0B1")   // false (Canadian)
 * 
 * // Shipping zone detection
 * const getShippingZone = (postal: string): string | null => {
 *   if (!isPostalCode({ country: "US" })(postal)) {
 *     return null
 *   }
 *   
 *   const firstDigit = postal[0]
 *   const zones: Record<string, string> = {
 *     "0": "Northeast",
 *     "1": "Northeast",
 *     "2": "Mid-Atlantic",
 *     "3": "Southeast",
 *     "4": "Midwest",
 *     "5": "Midwest",
 *     "6": "Southwest",
 *     "7": "Southwest",
 *     "8": "Mountain",
 *     "9": "Pacific"
 *   }
 *   
 *   return zones[firstDigit] || null
 * }
 * 
 * getShippingZone("12345")      // "Northeast"
 * getShippingZone("90210")      // "Pacific"
 * getShippingZone("60601")      // "Southwest"
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Country-aware - Validates based on country-specific formats
 * @property Format-flexible - Accepts various formatting styles
 * @property Case-insensitive - For countries with letters in postal codes
 * @property Structural - Validates format, not actual existence
 */
type PostalCountry = "US" | "CA" | "GB" | "DE" | "FR" | "JP" | "AU" | "NL" | "IT" | "ES" | "SE" | "BE" | "AT" | "DK" | "FI" | "NO" | "CH" | "BR" | "MX" | "IN" | "CN"

type PostalCodeOptions = {
	country?: PostalCountry | string
}

const isPostalCode = (
	options: PostalCodeOptions = {}
): ((value: unknown) => boolean) => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		const { country } = options
		const trimmed = value.trim()

		// Country-specific validation
		switch (country) {
			case "US":
				// US ZIP codes: 5 digits or 5+4 digits
				return /^\d{5}(-\d{4})?$/.test(trimmed) || /^\d{9}$/.test(trimmed)

			case "CA":
				// Canadian postal codes: A1A 1A1 format
				const caPattern = /^[ABCEGHJ-NPRSTVXY]\d[A-Z]\s?\d[A-Z]\d$/i
				return caPattern.test(trimmed) || caPattern.test(trimmed.replace("-", ""))

			case "GB":
				// UK postcodes: complex format
				// Outward code + Inward code
				const ukPattern = /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})$/i
				return ukPattern.test(trimmed)

			case "DE":
				// German postal codes: 5 digits
				return /^\d{5}$/.test(trimmed)

			case "FR":
				// French postal codes: 5 digits
				return /^\d{5}$/.test(trimmed)

			case "JP":
				// Japanese postal codes: 3 digits - 4 digits
				return /^\d{3}-?\d{4}$/.test(trimmed)

			case "AU":
				// Australian postcodes: 4 digits
				return /^\d{4}$/.test(trimmed)

			case "NL":
				// Dutch postcodes: 4 digits + 2 letters
				return /^\d{4}\s?[A-Z]{2}$/i.test(trimmed)

			case "IT":
				// Italian postal codes: 5 digits
				return /^\d{5}$/.test(trimmed)

			case "ES":
				// Spanish postal codes: 5 digits
				return /^\d{5}$/.test(trimmed)

			case "SE":
				// Swedish postal codes: 5 digits (can have space after 3rd)
				return /^\d{3}\s?\d{2}$/.test(trimmed)

			case "BE":
				// Belgian postal codes: 4 digits
				return /^\d{4}$/.test(trimmed)

			case "AT":
				// Austrian postal codes: 4 digits
				return /^\d{4}$/.test(trimmed)

			case "DK":
				// Danish postal codes: 4 digits
				return /^\d{4}$/.test(trimmed)

			case "FI":
				// Finnish postal codes: 5 digits
				return /^\d{5}$/.test(trimmed)

			case "NO":
				// Norwegian postal codes: 4 digits
				return /^\d{4}$/.test(trimmed)

			case "CH":
				// Swiss postal codes: 4 digits
				return /^\d{4}$/.test(trimmed)

			case "BR":
				// Brazilian postal codes: 5 digits - 3 digits
				return /^\d{5}-?\d{3}$/.test(trimmed)

			case "MX":
				// Mexican postal codes: 5 digits
				return /^\d{5}$/.test(trimmed)

			case "IN":
				// Indian postal codes: 6 digits (PIN codes)
				return /^\d{6}$/.test(trimmed)

			case "CN":
				// Chinese postal codes: 6 digits
				return /^\d{6}$/.test(trimmed)

			default:
				// Generic validation: alphanumeric with optional spaces/hyphens
				// 3-10 characters after removing spaces and hyphens
				const cleaned = trimmed.replace(/[\s-]/g, "")
				if (cleaned.length < 3 || cleaned.length > 10) {
					return false
				}
				return /^[A-Z0-9]+$/i.test(cleaned)
		}
	}
}

export default isPostalCode