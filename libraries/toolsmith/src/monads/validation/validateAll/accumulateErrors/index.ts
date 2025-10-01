import type ValidationError from "../../../../types/ValidationError/index.ts"
import type { ValidationResult } from "../../../../types/ValidationResult/index.ts"

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
