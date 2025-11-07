import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _flattenArray from "../_flattenArray/index.ts"

//++ [PRIVATE] Flattens array and wraps in Validation monad (accumulator)
export default function _flattenToValidation<T, D extends number = 1>(
	depth: D = 1 as D,
) {
	return function _flattenToValidationWithDepth(
		array: ReadonlyArray<T>,
	): Validation<
		ValidationError,
		Array<T extends ReadonlyArray<infer U> ? U : T>
	> {
		return success(flattenArray<T>(depth)(array))
	}
}
