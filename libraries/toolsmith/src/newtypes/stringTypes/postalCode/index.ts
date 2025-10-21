import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { PostalCode } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafePostalCode from "@sitebender/toolsmith/newtypes/stringTypes/postalCode/unsafePostalCode/index.ts"
import isPostalCode from "@sitebender/toolsmith/newtypes/stringTypes/postalCode/_isPostalCode/index.ts"

//++ Smart constructor that validates and creates a PostalCode value
//++ Validates US ZIP code formats: 12345 or 12345-6789
export default function postalCode(
	value: string,
): Result<ValidationError, PostalCode> {
	if (!isPostalCode(value)) {
		return error({
			code: "POSTAL_CODE_INVALID",
			field: "postalCode",
			messages: ["The system needs a valid US ZIP code."],
			received: value,
			expected: "5-digit ZIP code (12345) or 9-digit ZIP+4 code (12345-6789)",
			suggestion: "Provide a valid US ZIP code like '90210' or '90210-1234'",
			severity: "requirement",
		})
	}

	return ok(unsafePostalCode()(value))
}

//++ Export the PostalCode branded type
export type { PostalCode }
