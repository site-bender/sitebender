import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Isbn10 } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeIsbn10 from "@sitebender/toolsmith/newtypes/stringTypes/isbn10/unsafeIsbn10/index.ts"
import isIsbn10 from "@sitebender/toolsmith/newtypes/stringTypes/isbn10/_isIsbn10/index.ts"

//++ Smart constructor that validates and creates an Isbn10 value
//++ Validates 10-digit format with valid ISBN-10 check digit algorithm
export default function isbn10(
	value: string,
): Result<ValidationError, Isbn10> {
	if (!isIsbn10(value)) {
		return error({
			code: "ISBN10_INVALID",
			field: "isbn10",
			messages: ["The system needs a valid ISBN-10 string."],
			received: value,
			expected: "10-digit string with valid ISBN-10 checksum (digits 0-9, X for check digit)",
			suggestion: "Provide a valid ISBN-10 like '0471958697' or '020161622X'",
			severity: "requirement",
		})
	}

	return ok(unsafeIsbn10()(value))
}
