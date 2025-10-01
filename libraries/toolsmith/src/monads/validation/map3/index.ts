import type { Validation } from "../../../types/Validation/index.ts"

import isValid from "../isValid/index.ts"
import success from "../success/index.ts"

//++ Applies a curried ternary function to three Validation values
//++ Accumulates errors from all Invalid Validations
export default function map3<A, B, C, D, E>(
	fn: (a: A) => (b: B) => (c: C) => D,
) {
	return function applyToFirstValidation(
		validationA: Validation<E, A>,
	) {
		return function applyToSecondValidation(
			validationB: Validation<E, B>,
		) {
			return function applyToThirdValidation(
				validationC: Validation<E, C>,
			): Validation<E, D> {
				if (isValid(validationA)) {
					if (isValid(validationB)) {
						if (isValid(validationC)) {
							return success(
								fn(validationA.value)(validationB.value)(validationC.value),
							)
						}

						return validationC
					}

					if (isValid(validationC)) {
						return validationB
					}

					return {
						_tag: "Failure",
						errors: [...validationB.errors, ...validationC.errors],
					}
				}

				if (isValid(validationB)) {
					if (isValid(validationC)) {
						return validationA
					}

					return {
						_tag: "Failure",
						errors: [...validationA.errors, ...validationC.errors],
					}
				}

				if (isValid(validationC)) {
					return {
						_tag: "Failure",
						errors: [...validationA.errors, ...validationB.errors],
					}
				}

				return {
					_tag: "Failure",
					errors: [
						...validationA.errors,
						...validationB.errors,
						...validationC.errors,
					],
				}
			}
		}
	}
}
