import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"
import type { ValidationResult } from "../../../types/ValidationResult/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"

//++ Creates a validation function from a predicate and error factory
export default function createValidator<T>(
	predicate: (value: T) => boolean,
) {
	return function withErrorFactory(
		createError: (value: T) => ValidationError,
	) {
		return function validate(value: T): ValidationResult<T> {
			if (predicate(value)) {
				return valid(value)
			}

			const error = createError(value)

			return invalid([error] as NonEmptyArray<ValidationError>)
		}
	}
}
