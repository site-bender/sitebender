import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/ValidationError/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import integer from "@sitebender/toolsmith/newtypes/numericTypes/integer/index.ts"

//++ Divides two Integer values
//++ Returns Result with error if divisor is zero or result cannot be represented as a safe Integer
export default function divideInteger(
	dividend: Integer,
): (divisor: Integer) => Result<ValidationError, Integer> {
	return function divideWithDividend(
		divisor: Integer,
	): Result<ValidationError, Integer> {
		const result = Math.floor(dividend / divisor)

		return integer(result)
	}
}
