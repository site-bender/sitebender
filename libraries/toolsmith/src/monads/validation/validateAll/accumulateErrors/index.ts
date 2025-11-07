import type ValidationError from "../../../../types/fp/validation/index.ts"
import type { ValidationResult } from "../../../../types/fp/validation/index.ts"

import isInvalid from "../../isInvalid/index.ts"

//++ Accumulates errors from validator functions applied to a value
export default function accumulateErrors<T>(value: T) {
	return function withValue(
		acc: Array<ValidationError>,
		validator: (value: T) => ValidationResult<T>,
	): Array<ValidationError> {
		const result = validator(value)
		if (isInvalid(result)) {
			return [...acc, ...result.errors]
		}

		return acc
	}
}
