import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Isbn13 } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeIsbn13 from "@sitebender/toolsmith/newtypes/stringTypes/isbn13/unsafeIsbn13/index.ts"
import _isIsbn13 from "@sitebender/toolsmith/newtypes/stringTypes/isbn13/_isIsbn13/index.ts"

//++ Smart constructor that validates and creates an Isbn13 value
//++ Validates 13-digit format with valid ISBN-13 check digit algorithm
export default function isbn13(
	value: string,
): Result<ValidationError, Isbn13> {
	if (!_isIsbn13(value)) {
		return error({
			code: "ISBN13_INVALID",
			field: "isbn13",
			messages: ["The system needs a valid ISBN-13 string."],
			received: value,
			expected: "13-digit string with valid ISBN-13 checksum (digits 0-9, starting with 978 or 979)",
			suggestion: "Provide a valid ISBN-13 like '9780306406157' or '9791234567890'",
			severity: "requirement",
		})
	}

	return ok(unsafeIsbn13()(value))
}

//++ Export the Isbn13 branded type
export type { Isbn13 }
