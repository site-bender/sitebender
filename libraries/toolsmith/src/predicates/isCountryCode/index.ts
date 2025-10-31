import type { CountryCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid ISO 3166-1 alpha-2 country code
//++ Validates 2 uppercase letters (US, GB, FR, DE, JP, etc.)
export default function isCountryCode(value: unknown): value is CountryCode {
	if (typeof value !== "string") {
		return false
	}

	if (value.length !== 2) {
		return false
	}

	const normalized = value.toLocaleUpperCase()

	//++ [EXCEPTION] Using regex for ISO 3166-1 alpha-2 validation
	return /^[A-Z]{2}$/.test(normalized)
}
