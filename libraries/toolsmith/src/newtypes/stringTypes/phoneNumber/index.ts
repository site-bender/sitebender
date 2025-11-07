import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { PhoneNumber } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafePhoneNumber from "@sitebender/toolsmith/newtypes/stringTypes/phoneNumber/unsafePhoneNumber/index.ts"
import isPhoneNumber from "@sitebender/toolsmith/predicates/isPhoneNumber/index.ts"

//++ Smart constructor that validates and creates a PhoneNumber value
//++ Validates international phone numbers in E.164 format: +[country code][number]
//++ Examples: +1234567890, +441234567890, +861234567890
export default function phoneNumber(
	value: string,
): Result<ValidationError, PhoneNumber> {
	if (!isPhoneNumber(value)) {
		return error({
			code: "PHONE_NUMBER_INVALID",
			field: "phoneNumber",
			messages: ["The system needs a valid phone number in E.164 format."],
			received: value,
			expected: "E.164 format: +[country code][number] (7-17 total characters)",
			suggestion:
				"Provide a phone number like '+1234567890', '+441234567890', or '+861234567890'",
			severity: "requirement",
		})
	}

	return ok(unsafePhoneNumber(value))
}

//++ Export the PhoneNumber branded type
export type { PhoneNumber }
