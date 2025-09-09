import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import Validation, { Invalid, Valid } from "../index.ts"
import combineErrors from "../combineErrors/index.ts"

//++ Combines multiple validation results, accumulating all errors
export default function combineValidations<T>(
	validations: NonEmptyArray<Validation<T>>,
): Validation<T> {
	const errors: Array<ValidationError> = []
	let lastValidValue: T | null = null

	for (const validation of validations) {
		if (validation.isValid()) {
			lastValidValue = validation.value
		} else {
			errors.push(...validation.errors)
		}
	}

	if (errors.length > 0) {
		return new Invalid(errors as NonEmptyArray<ValidationError>)
	}

	if (lastValidValue !== null) {
		return new Valid(lastValidValue)
	}

	// This should never happen with NonEmptyArray, but TypeScript needs it
	throw new Error("No validations provided")
}