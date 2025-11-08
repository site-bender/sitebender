import type { Result } from "../../../types/fp/result/index.ts"

import ok from "../../../monads/result/ok/index.ts"
import error from "../../../monads/result/error/index.ts"
import _createRangeError from "../../_createRangeError/index.ts"

//++ Private helper that checks if a value is between min (inclusive) and max (exclusive), returning a Result
export default function _checkRangeAsResult<E>(min: number) {
	return function checkRangeAsResultWithMin(max: number) {
		return function checkRangeAsResultWithMinAndMax(
			value: number,
		): Result<E, boolean> {
			const isInRange = value >= min && value < max

			if (isInRange) {
				return ok(true)
			}

			const validationError = _createRangeError<E>(min)(max)(value)("minInclusive")

			return error(validationError)
		}
	}
}
