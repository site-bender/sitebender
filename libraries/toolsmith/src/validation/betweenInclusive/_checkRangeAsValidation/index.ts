import type { Validation, ValidationError } from "../../../types/fp/validation/index.ts"

import success from "../../../monads/validation/success/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import _createRangeError from "../../_createRangeError/index.ts"

//++ Private helper that checks if a value is between min and max (inclusive), returning a Validation
export default function _checkRangeAsValidation(min: number) {
	return function checkRangeAsValidationWithMin(max: number) {
		return function checkRangeAsValidationWithMinAndMax(
			value: number,
		): Validation<ValidationError, boolean> {
			const isInRange = value >= min && value <= max

			if (isInRange) {
				return success(true)
			}

			const validationError = _createRangeError(min)(max)(value)("inclusive")

			return failure([validationError])
		}
	}
}
