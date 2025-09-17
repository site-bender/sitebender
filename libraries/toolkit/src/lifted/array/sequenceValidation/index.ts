import type { Validation } from "../../../types/Validation/index.ts"
import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"

import reduce from "../../../vanilla/array/reduce/index.ts"
import isNotEmpty from "../../../vanilla/array/isNotEmpty/index.ts"
import valid from "../../../monads/validation/valid/index.ts"
import invalid from "../../../monads/validation/invalid/index.ts"

import accumulateValidations from "./accumulateValidations/index.ts"

//++ Sequences an array of Validations into a Validation of array, accumulating all errors
export default function sequenceValidation<E, T>(
	validations: Array<Validation<E, T>>,
): Validation<E, Array<T>> {
	const result = reduce<
		Validation<E, T>,
		{ values: Array<T>; errors: Array<E> }
	>(
		accumulateValidations,
	)({ values: [], errors: [] })(validations)

	if (isNotEmpty(result.errors)) {
		const [firstError, ...restErrors] = result.errors

		return invalid([firstError, ...restErrors] as NonEmptyArray<E>)
	}

	return valid(result.values)
}

//?? [EXAMPLE] sequenceValidation([valid(1), valid(2), valid(3)]) // valid([1, 2, 3])
//?? [EXAMPLE] sequenceValidation([valid(1), invalid(["error1"]), invalid(["error2"])]) // invalid(["error1", "error2"])
