import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { LanguageCode } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeLanguageCode from "@sitebender/toolsmith/newtypes/stringTypes/languageCode/unsafeLanguageCode/index.ts"

//++ Smart constructor that validates and creates a LanguageCode value
//++ Validates ISO 639-1 format: 2 lowercase letters (en, fr, de, etc.)
export default function languageCode(
	value: string,
): Result<ValidationError, LanguageCode> {
	//++ [EXCEPTION] .length and !== permitted in Toolsmith for performance - provides LanguageCode validation wrapper
	if (value.length !== 2) {
		return error({
			code: "LANGUAGE_CODE_INVALID_LENGTH",
			field: "languageCode",
			messages: ["The system needs a 2-letter language code."],
			received: value,
			expected: "2 lowercase letters (ISO 639-1)",
			suggestion:
				"Provide a valid language code like 'en', 'fr', 'de', or 'es'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .toLocaleLowerCase(), .test(), and ! permitted in Toolsmith for performance - provides LanguageCode validation wrapper
	const normalized = value.toLocaleLowerCase()
	const isValid = /^[a-z]{2}$/.test(normalized)

	if (!isValid) {
		return error({
			code: "LANGUAGE_CODE_INVALID_FORMAT",
			field: "languageCode",
			messages: ["The system needs a language code with only letters."],
			received: value,
			expected: "2 lowercase letters (a-z)",
			suggestion: "Provide a valid ISO 639-1 language code",
			severity: "requirement",
		})
	}

	return ok(unsafeLanguageCode(normalized))
}

//++ Export the LanguageCode branded type
export type { LanguageCode }
