import type { Validation } from "../../../../types/Validation/index.ts"

import isValid from "../../../../monads/validation/isValid/index.ts"

//++ Accumulates validations and all their errors
export default function accumulateValidations<E, T>(
	accumulator: { values: Array<T>; errors: Array<E> },
	current: Validation<E, T>,
): { values: Array<T>; errors: Array<E> } {
	if (isValid(current)) {
		return {
			values: [...accumulator.values, current.value],
			errors: accumulator.errors,
		}
	}

	return {
		values: accumulator.values,
		errors: [...accumulator.errors, ...current.errors],
	}
}
