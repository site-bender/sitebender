import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Validation } from "../../../types/validation/index.ts"

import map from "../../../vanilla/array/map/index.ts"
import failure from "../failure/index.ts"
import success from "../success/index.ts"

//++ Maps functions over both Invalid and Valid values
export default function bimap<E, F>(onInvalid: (error: E) => F) {
	return function withValid<A, B>(onValid: (value: A) => B) {
		return function applyBimap(
			validation: Validation<E, A>,
		): Validation<F, B> {
			if (validation._tag === "Failure") {
				// NonEmptyArray is guaranteed since Invalid always has at least one error
				const [firstError, ...restErrors] = validation.errors
				const transformedFirst = onInvalid(firstError)
				const transformedRest = map(onInvalid)(restErrors)

				return failure(
					[transformedFirst, ...transformedRest] as NonEmptyArray<F>,
				)
			}

			return success(onValid(validation.value))
		}
	}
}
