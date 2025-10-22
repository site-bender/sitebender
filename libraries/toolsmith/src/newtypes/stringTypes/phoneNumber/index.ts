import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { PhoneNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafePhoneNumber from "@sitebender/toolsmith/newtypes/stringTypes/phoneNumber/unsafePhoneNumber/index.ts"
import isPhoneNumber from "@sitebender/toolsmith/newtypes/stringTypes/phoneNumber/_isPhoneNumber/index.ts"

//++ Smart constructor that validates and creates a PhoneNumber value
//++ Validates US phone number formats: 1234567890, (123) 456-7890, 123-456-7890, +1-123-456-7890
export default function phoneNumber(
	value: string,
): Result<ValidationError, PhoneNumber> {
	if (!isPhoneNumber(value)) {
		return error({
			code: "PHONE_NUMBER_INVALID",
			field: "phoneNumber",
			messages: ["The system needs a valid US phone number."],
			received: value,
			expected: "10-digit phone number in formats: 1234567890, (123) 456-7890, 123-456-7890, or +1-123-456-7890",
			suggestion: "Provide a valid US phone number like '5551234567', '(555) 123-4567', '555-123-4567', or '+1-555-123-4567'",
			severity: "requirement",
		})
	}

	return ok(unsafePhoneNumber()(value))
}

//++ Export the PhoneNumber branded type
export type { PhoneNumber }
