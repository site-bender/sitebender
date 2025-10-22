import type { Validation } from "../../../types/fp/validation/index.ts"

import isValid from "../isValid/index.ts"
import success from "../success/index.ts"

//++ Applies a curried quaternary function to four Validation values
//++ Accumulates errors from all Invalid Validations
export default function map4<A, B, C, D, E, F>(
	fn: (a: A) => (b: B) => (c: C) => (d: D) => E,
) {
	return function applyToFirstValidation(
		validationA: Validation<F, A>,
	) {
		return function applyToSecondValidation(
			validationB: Validation<F, B>,
		) {
			return function applyToThirdValidation(
				validationC: Validation<F, C>,
			) {
				return function applyToFourthValidation(
					validationD: Validation<F, D>,
				): Validation<F, E> {
					const aValid = isValid(validationA)
					const bValid = isValid(validationB)
					const cValid = isValid(validationC)
					const dValid = isValid(validationD)

					if (aValid && bValid && cValid && dValid) {
						return success(
							fn(validationA.value)(validationB.value)(validationC.value)(
								validationD.value,
							),
						)
					}

					const errors: Array<F> = []

					if (aValid === false) {
						errors.push(...validationA.errors)
					}

					if (bValid === false) {
						errors.push(...validationB.errors)
					}

					if (cValid === false) {
						errors.push(...validationC.errors)
					}

					if (dValid === false) {
						errors.push(...validationD.errors)
					}

					return {
						_tag: "Failure",
						errors: errors as [F, ...Array<F>],
					}
				}
			}
		}
	}
}
