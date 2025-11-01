import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Validation } from "../../../types/fp/validation/index.ts"

import map from "../../../array/map/index.ts"

//++ Maps a function over the errors in an Invalid, preserving Valid state
export default function mapErrors<E, F>(fn: (error: E) => F) {
	return function applyMapErrors<A>(
		validation: Validation<E, A>,
	): Validation<F, A> {
		//++ [EXCEPTION] === operator and property access permitted in Toolsmith for performance - provides Validation monad tag checking
		if (validation._tag === "Failure") {
			//++ [EXCEPTION] Array destructuring permitted in Toolsmith for performance - provides NonEmptyArray element extraction
			// NonEmptyArray is guaranteed since Invalid always has at least one error
			const [firstError, ...restErrors] = validation.errors
			const transformedFirst = fn(firstError)
			const transformedRest = map(fn)(restErrors)

			return {
				_tag: "Failure",
				errors: [transformedFirst, ...transformedRest] as NonEmptyArray<F>,
			}
		}

		return validation
	}
}
