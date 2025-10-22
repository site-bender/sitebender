import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import error from "../../../monads/result/error/index.ts"
import _createRangeError from "../../_createRangeError/index.ts"

//++ Private helper that checks if a value is between min and max (inclusive), returning a Result
export default function _checkRangeAsResult(min: number) {
	return function checkRangeAsResultWithMin(max: number) {
		return function checkRangeAsResultWithMinAndMax(
			value: number,
		): Result<ValidationError, boolean> {
			const isInRange = value >= min && value <= max

			if (isInRange) {
				return ok(true)
			}

			const validationError = _createRangeError(min)(max)(value)("inclusive")

			return error(validationError)
		}
	}
}
