import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { EightDecimalPlaces } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeEightDecimalPlaces from "@sitebender/toolsmith/newtypes/numericTypes/eightDecimalPlaces/unsafeEightDecimalPlaces/index.ts"

//++ Smart constructor that validates and creates an EightDecimalPlaces value - returns Result with helpful error on failure
//++ Commonly used for cryptocurrency amounts (e.g., Bitcoin satoshis)
export default function eightDecimalPlaces(
	n: number,
): Result<ValidationError, EightDecimalPlaces> {
	if (!Number.isFinite(n)) {
		return error({
			code: "EIGHT_DECIMAL_PLACES_NOT_FINITE",
			field: "eightDecimalPlaces",
			messages: [
				"The system needs a finite number with at most 8 decimal places.",
			],
			received: n,
			expected: "Finite number with at most 8 decimal places",
			suggestion:
				"Use a finite number like 0.12345678 or 0.00000001. Infinity and NaN are not valid. For exact arithmetic with 8 decimal places.",
			severity: "requirement",
		})
	}

	const SCALE_FACTOR = 100000000
	const scaled = Math.round(n * SCALE_FACTOR)
	const reconstructed = scaled / SCALE_FACTOR

	if (Math.abs(n - reconstructed) > Number.EPSILON) {
		return error({
			code: "EIGHT_DECIMAL_PLACES_PRECISION_EXCEEDED",
			field: "eightDecimalPlaces",
			messages: [
				"The system needs a number with at most 8 decimal places.",
			],
			received: n,
			expected: "Number with at most 8 decimal places",
			suggestion:
				"Use a number with at most 8 decimal places (e.g., 0.12345678, 1.00000001, 0.00000001 for 1 satoshi). For more precision, consider using a string-based decimal library.",
			severity: "requirement",
		})
	}

	return ok(unsafeEightDecimalPlaces(n))
}
