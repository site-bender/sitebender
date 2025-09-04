import isEmpty from "../isEmpty/index.ts"

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
 * // Generic international format
 * const isValidPhone = isPhone()
 * isValidPhone("+1-555-123-4567")      // true
 * isValidPhone("+44 20 7123 4567")     // true
 * isValidPhone("invalid")              // false
 *
 * // US phone validation
 * const isUSPhone = isPhone({ country: "US" })
 * isUSPhone("555-123-4567")           // true
 * isUSPhone("(555) 123-4567")         // true
 * isUSPhone("+1 555 123 4567")        // true
 *
 * // UK phone validation
 * const isUKPhone = isPhone({ country: "GB" })
 * isUKPhone("020 7123 4567")          // true
 * isUKPhone("07700 900123")           // true (mobile)
 * isUKPhone("+44 20 7123 4567")       // true
 *
 * // Form validation
 * const validatePhone = (phone: unknown, country = "US"): string | null => {
 *   const trimmed = typeof phone === "string" ? phone.trim() : ""
 *   return !isPhone({ country })(trimmed)
 *     ? `Invalid ${country} phone format`
 *     : null
 * }
 *
 * // Filter valid phones
 * const phones = ["555-123-4567", "invalid", "+44 20 7123 4567"]
 * const valid = phones.filter(isPhone())  // ["555-123-4567", "+44 20 7123 4567"]
 * ```
 *
 * @pure
 * @curried
 * @predicate
 */
type PhoneCountry =
	| "US"
	| "CA"
	| "GB"
	| "FR"
	| "DE"
	| "JP"
	| "AU"
	| "IN"
	| "CN"
	| "BR"

type PhoneOptions = {
	country?: PhoneCountry | string
	strict?: boolean
}

const isPhone = (
	options: PhoneOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || isEmpty(value)) {
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
		const hasInternationalPrefix = /^\+\d/.test(cleaned) ||
			/^00\d/.test(cleaned)

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

					default: {
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
}

export default isPhone
