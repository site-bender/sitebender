import type {
	Validation,
	ValidationError,
} from "../../../types/fp/validation/index.ts"
import success from "../../../monads/validation/success/index.ts"
import _cartesianProductArray from "../_cartesianProductArray/index.ts"

//++ Private helper: generates cartesian product and wraps result in Validation monad
export default function _cartesianProductToValidation<T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _cartesianProductToValidationWithFirstArray(
		array2: ReadonlyArray<U>,
	): Validation<ValidationError, ReadonlyArray<[T, U]>> {
		const product = _cartesianProductArray<T, U>(array1)(array2)
		return success<ReadonlyArray<[T, U]>>(product)
	}
}
