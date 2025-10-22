import type { Result } from "../../types/fp/result/index.ts"
import type { Validation, ValidationError } from "../../types/fp/validation/index.ts"

import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chain from "../../monads/result/chain/index.ts"
import validationChain from "../../monads/validation/chain/index.ts"
import isNumber from "../isNumber/index.ts"
import _checkRangeAsResult from "./_checkRangeAsResult/index.ts"
import _checkRangeAsValidation from "./_checkRangeAsValidation/index.ts"

//++ Checks if a value is between min (exclusive) and max (inclusive): min < value <= max
export default function betweenMaxInclusive(min: number) {
	return function betweenMaxInclusiveWithMin(max: number) {
		//++ [OVERLOAD] Number validator: takes a number, returns a boolean
		function betweenMaxInclusiveWithMinMax(value: number): boolean

		//++ [OVERLOAD] Result validator: takes and returns a Result monad (fail fast)
		function betweenMaxInclusiveWithMinMax(
			value: Result<ValidationError, number>,
		): Result<ValidationError, boolean>

		//++ [OVERLOAD] Validation validator: takes and returns a Validation monad (accumulator)
		function betweenMaxInclusiveWithMinMax(
			value: Validation<ValidationError, number>,
		): Validation<ValidationError, boolean>

		//++ Implementation of the full curried function
		function betweenMaxInclusiveWithMinMax(
			value: number | Result<ValidationError, number> | Validation<ValidationError, number>,
		): boolean | Result<ValidationError, boolean> | Validation<ValidationError, boolean> {
			if (isNumber(value)) {
				return value > min && value <= max
			}

			if (isOk(value)) {
				return chain(_checkRangeAsResult(min)(max))(value)
			}

			if (isSuccess(value)) {
				return validationChain(_checkRangeAsValidation(min)(max))(value)
			}

			return false
		}

		return betweenMaxInclusiveWithMinMax
	}
}
