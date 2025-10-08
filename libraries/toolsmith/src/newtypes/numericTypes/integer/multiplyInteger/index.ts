import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import integer from "@sitebender/toolsmith/newtypes/numericTypes/integer/index.ts"

//++ Multiplies two Integer values
//++ Returns Result with error if the result cannot be represented as a safe Integer
export default function multiplyInteger(
	multiplicand: Integer,
): (multiplier: Integer) => Result<ValidationError, Integer> {
	return function multiplyWithMultiplicand(
		multiplier: Integer,
	): Result<ValidationError, Integer> {
		const result = multiplicand * multiplier

		return integer(result)
	}
}
