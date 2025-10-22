import type { Validation } from "../../../types/fp/validation/index.ts"

import isValid from "../isValid/index.ts"
import success from "../success/index.ts"

//++ Applies a curried binary function to two Validation values
//++ Accumulates errors from both Validations if both are Invalid
export default function map2<A, B, C, E>(
	fn: (a: A) => (b: B) => C,
) {
	return function applyToFirstValidation(
		validationA: Validation<E, A>,
	) {
		return function applyToSecondValidation(
			validationB: Validation<E, B>,
		): Validation<E, C> {
			if (isValid(validationA)) {
				if (isValid(validationB)) {
					return success(fn(validationA.value)(validationB.value))
				}

				return validationB
			}

			if (isValid(validationB)) {
				return validationA
			}

			return {
				_tag: "Failure",
				errors: [...validationA.errors, ...validationB.errors],
			}
		}
	}
}
