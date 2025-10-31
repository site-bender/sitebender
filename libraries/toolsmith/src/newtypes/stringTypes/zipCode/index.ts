import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { ZipCode } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeZipCode from "@sitebender/toolsmith/newtypes/stringTypes/zipCode/unsafeZipCode/index.ts"
import isZipCode from "@sitebender/toolsmith/predicates/isZipCode/index.ts"

//++ Smart constructor that validates and creates a ZipCode value
//++ Validates US ZIP code formats: 12345 or 12345-6789
export default function zipCode(
	value: string,
): Result<ValidationError, ZipCode> {
	if (!isZipCode(value)) {
		return error({
			code: "ZIP_CODE_INVALID",
			field: "zipCode",
			messages: ["The system needs a valid US ZIP code."],
			received: value,
			expected: "5-digit ZIP code (12345) or 9-digit ZIP+4 code (12345-6789)",
			suggestion: "Provide a valid US ZIP code like '90210' or '90210-1234'",
			severity: "requirement",
		})
	}

	return ok(unsafeZipCode(value))
}

//++ Export the ZipCode branded type
export type { ZipCode }
