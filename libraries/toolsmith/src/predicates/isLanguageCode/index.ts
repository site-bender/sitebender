import type { LanguageCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid ISO 639-1 language code
//++ Validates 2 lowercase letters (en, fr, de, es, ja, etc.)
export default function isLanguageCode(value: unknown): value is LanguageCode {
	if (typeof value !== "string") {
		return false
	}

	if (value.length !== 2) {
		return false
	}

	const normalized = value.toLocaleLowerCase()

	//++ [EXCEPTION] Using regex for ISO 639-1 validation
	return /^[a-z]{2}$/.test(normalized)
}
