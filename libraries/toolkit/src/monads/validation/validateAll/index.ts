import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"
import type { ValidationResult } from "../../../types/ValidationResult/index.ts"

import reduce from "../../../vanilla/array/reduce/index.ts"
import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"
import accumulateErrors from "./accumulateErrors/index.ts"

//++ Applies multiple validators to the same value, accumulating all errors
export default function validateAll<T>(
	validators: NonEmptyArray<(value: T) => ValidationResult<T>>,
) {
	return function applyValidators(value: T): ValidationResult<T> {
		const errors = reduce(accumulateErrors(value))(
			[] as Array<ValidationError>,
		)(validators)

		if (errors.length > 0) {
			// We know errors is non-empty if length > 0
			const [firstError, ...restErrors] = errors

			return invalid(
				[firstError, ...restErrors] as NonEmptyArray<ValidationError>,
			)
		}

		return valid(value)
	}
}
