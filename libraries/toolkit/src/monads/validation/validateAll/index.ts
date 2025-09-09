import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import Validation, { Invalid, Valid } from "../index.ts"

//++ Applies multiple validators to the same value, accumulating all errors
export default function validateAll<T>(
	value: T,
	validators: NonEmptyArray<(value: T) => Validation<T>>,
): Validation<T> {
	const errors: Array<ValidationError> = []

	for (const validator of validators) {
		const result = validator(value)
		if (result.isInvalid()) {
			errors.push(...result.errors)
		}
	}

	if (errors.length > 0) {
		return new Invalid(errors as NonEmptyArray<ValidationError>)
	}

	return new Valid(value)
}