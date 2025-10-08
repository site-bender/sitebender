import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Validation } from "../../../types/validation/index.ts"

//++ Folds a validation to a single value by handling both cases
export default function fold<A, B>(onValid: (value: A) => B) {
	return function withInvalid<E>(
		onInvalid: (errors: NonEmptyArray<E>) => B,
	) {
		return function applyFold(
			validation: Validation<E, A>,
		): B {
			if (validation._tag === "Failure") {
				return onInvalid(validation.errors)
			}

			return onValid(validation.value)
		}
	}
}
