import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import Validation, { Invalid, Valid } from "../index.ts"

//++ Creates a validation function from a predicate and error factory
export default function createValidator<T>(
	predicate: (value: T) => boolean,
	createError: (value: T) => ValidationError,
) {
	return function validate(value: T): Validation<T> {
		if (predicate(value)) {
			return new Valid(value)
		}

		const error = createError(value)
		return new Invalid([error] as NonEmptyArray<ValidationError>)
	}
}