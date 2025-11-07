import type { CurrencyCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid ISO 4217 currency code
//++ Validates 3 uppercase letters (USD, EUR, GBP, JPY, etc.)
export default function isCurrencyCode(value: unknown): value is CurrencyCode {
	//++ [EXCEPTION] typeof, !==, .length, .toLocaleUpperCase(), and .test() permitted in Toolsmith for performance - provides ISO 4217 validation wrapper
	if (typeof value !== "string") {
		return false
	}

	if (value.length !== 3) {
		return false
	}

	const normalized = value.toLocaleUpperCase()

	//++ [EXCEPTION] Using regex for ISO 4217 validation
	return /^[A-Z]{3}$/.test(normalized)
}
