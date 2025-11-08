import type { Validation } from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _flattenArray from "../_flattenArray/index.ts"

//++ [PRIVATE] Flattens array and wraps in Validation monad (accumulator)
export default function _flattenToValidation<E, T, D extends number = 1>(
	depth: D = 1 as D,
) {
	return function _flattenToValidationWithDepth(
		array: ReadonlyArray<T>,
	): Validation<E, Array<T extends ReadonlyArray<infer U> ? U : T>> {
		return success(_flattenArray<T>(depth)(array))
	}
}
