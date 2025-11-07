import type { NonEmptyArray } from "../../../../src/types/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

//++ Folds a validation to a single value by handling both cases
export default function fold<A, B>(onValid: (value: A) => B) {
	return function withInsuccess<E>(
		onInvalid: (errors: NonEmptyArray<E>) => B,
	) {
		return function applyFold(
			validation: Validation<E, A>,
		): B {
			//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Validation monad tag checking
			if (validation._tag === "Failure") {
				return onInvalid(validation.errors)
			}

			return onValid(validation.value)
		}
	}
}
