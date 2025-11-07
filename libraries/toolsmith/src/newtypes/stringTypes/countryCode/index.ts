import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { CountryCode } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeCountryCode from "@sitebender/toolsmith/newtypes/stringTypes/countryCode/unsafeCountryCode/index.ts"

//++ Smart constructor that validates and creates a CountryCode value
//++ Validates ISO 3166-1 alpha-2 format: 2 uppercase letters (US, GB, FR, etc.)
export default function countryCode(
	value: string,
): Result<ValidationError, CountryCode> {
	//++ [EXCEPTION] .length and !== permitted in Toolsmith for performance - provides CountryCode validation wrapper
	if (value.length !== 2) {
		return error({
			code: "COUNTRY_CODE_INVALID_LENGTH",
			field: "countryCode",
			messages: ["The system needs a 2-letter country code."],
			received: value,
			expected: "2 uppercase letters (ISO 3166-1 alpha-2)",
			suggestion: "Provide a valid country code like 'US', 'GB', 'FR', or 'DE'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] .toLocaleUpperCase(), .test(), and ! permitted in Toolsmith for performance - provides CountryCode validation wrapper
	const normalized = value.toLocaleUpperCase()
	const isValid = /^[A-Z]{2}$/.test(normalized)

	if (!isValid) {
		return error({
			code: "COUNTRY_CODE_INVALID_FORMAT",
			field: "countryCode",
			messages: ["The system needs a country code with only letters."],
			received: value,
			expected: "2 uppercase letters (A-Z)",
			suggestion: "Provide a valid ISO 3166-1 alpha-2 country code",
			severity: "requirement",
		})
	}

	return ok(unsafeCountryCode(normalized))
}

//++ Export the CountryCode branded type
export type { CountryCode }
