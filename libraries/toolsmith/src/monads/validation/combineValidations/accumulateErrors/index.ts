import type {
	ValidationError,
	ValidationResult,
} from "../../../../types/fp/validation/index.ts"

import isValid from "../../isValid/index.ts"

type AccumulatorState<T> = {
	errors: Array<ValidationError>
	lastValidValue: T | undefined
}

//++ Accumulates errors from validation results while tracking last valid value
export default function accumulateErrors<T>(
	acc: AccumulatorState<T>,
	validation: ValidationResult<T>,
): AccumulatorState<T> {
	if (isValid(validation)) {
		return {
			...acc,
			lastValidValue: validation.value,
		}
	}

	return {
		...acc,
		errors: [...acc.errors, ...validation.errors],
	}
}
