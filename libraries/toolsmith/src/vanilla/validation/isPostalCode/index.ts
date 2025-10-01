//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type PostalCountry =
	| "US"
	| "CA"
	| "GB"
	| "DE"
	| "FR"
	| "JP"
	| "AU"
	| "NL"
	| "IT"
	| "ES"
	| "SE"
	| "BE"
	| "AT"
	| "DK"
	| "FI"
	| "NO"
	| "CH"
	| "BR"
	| "MX"
	| "IN"
	| "CN"

type PostalCodeOptions = {
	country?: PostalCountry | string
}

const isPostalCode = (
	options: PostalCodeOptions = {},
): (value: unknown) => boolean => {
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
				return /^\d{5}(-\d{4})?$/.test(trimmed) ||
					/^\d{9}$/.test(trimmed)

			case "CA": {
				// Canadian postal codes: A1A 1A1 format
				const caPattern = /^[ABCEGHJ-NPRSTVXY]\d[A-Z]\s?\d[A-Z]\d$/i
				return caPattern.test(trimmed) ||
					caPattern.test(trimmed.replace("-", ""))
			}

			case "GB": {
				// UK postcodes: complex format
				// Outward code + Inward code
				const ukPattern = /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})$/i
				return ukPattern.test(trimmed)
			}

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

			default: {
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
}

export default isPostalCode
