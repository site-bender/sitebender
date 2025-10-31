import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { PostalCode } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafePostalCode from "@sitebender/toolsmith/newtypes/stringTypes/postalCode/unsafePostalCode/index.ts"

//++ Smart constructor that validates and creates a PostalCode value
//++ Generic international postal code: 3-10 alphanumeric characters with optional spaces and hyphens
//++ Works for UK (SW1A 1AA), Canada (K1A 0B1), Germany (10115), Japan (100-0001), etc.
export default function postalCode(
	value: string,
): Result<ValidationError, PostalCode> {
	const trimmed = value.trim()

	if (trimmed.length < 3) {
		return error({
			code: "POSTAL_CODE_TOO_SHORT",
			field: "postalCode",
			messages: ["The system needs a postal code with at least 3 characters."],
			received: value,
			expected: "3-10 characters (alphanumeric, spaces, hyphens)",
			suggestion: "Provide a valid postal code like 'SW1A 1AA', 'K1A 0B1', or '10115'",
			severity: "requirement",
		})
	}

	if (trimmed.length > 10) {
		return error({
			code: "POSTAL_CODE_TOO_LONG",
			field: "postalCode",
			messages: ["The system needs a postal code with at most 10 characters."],
			received: value,
			expected: "3-10 characters (alphanumeric, spaces, hyphens)",
			suggestion: "Provide a valid postal code like 'SW1A 1AA', 'K1A 0B1', or '10115'",
			severity: "requirement",
		})
	}

	//++ [EXCEPTION] Using regex for international postal code validation
	const isValid = /^[A-Z0-9\s-]+$/i.test(trimmed)

	if (!isValid) {
		return error({
			code: "POSTAL_CODE_INVALID_CHARACTERS",
			field: "postalCode",
			messages: ["The system needs a postal code with only letters, numbers, spaces, and hyphens."],
			received: value,
			expected: "Alphanumeric characters with optional spaces and hyphens",
			suggestion: "Provide a valid postal code using letters, numbers, spaces, and hyphens only",
			severity: "requirement",
		})
	}

	return ok(unsafePostalCode(trimmed))
}

//++ Export the PostalCode branded type
export type { PostalCode }
