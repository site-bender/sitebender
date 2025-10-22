import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

import integer from "@sitebender/toolsmith/newtypes/numericTypes/integer/index.ts"

//++ Adds two Integer values
//++ Returns Result with error if the result cannot be represented as a safe Integer
export default function addInteger(
	augend: Integer,
): (addend: Integer) => Result<ValidationError, Integer> {
	return function addToAugend(
		addend: Integer,
	): Result<ValidationError, Integer> {
		const result = augend + addend

		return integer(result)
	}
}
