import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"
import type { ValidationResult } from "../../../types/fp/validation/index.ts"

import failure from "../failure/index.ts"
import success from "../success/index.ts"

//++ Creates a validation function from a predicate and error factory
export default function createValidator<T>(
	predicate: (value: T) => boolean,
) {
	return function withErrorFactory(
		createError: (value: T) => ValidationError,
	) {
		return function validate(value: T): ValidationResult<T> {
			if (predicate(value)) {
				return success(value)
			}

			const error = createError(value)

			return failure([error] as NonEmptyArray<ValidationError>)
		}
	}
}
