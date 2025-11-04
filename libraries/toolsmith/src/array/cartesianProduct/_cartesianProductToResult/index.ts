import type { Result } from "../../../types/fp/result/index.ts"
import type { ValidationError } from "../../../types/fp/validation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _cartesianProductArray from "../_cartesianProductArray/index.ts"

//++ Private helper: generates cartesian product and wraps result in Result monad
export default function _cartesianProductToResult<T, U>(
	array1: ReadonlyArray<T>,
) {
	return function _cartesianProductToResultWithFirstArray(
		array2: ReadonlyArray<U>,
	): Result<ValidationError, ReadonlyArray<[T, U]>> {
		const product = _cartesianProductArray<T, U>(array1)(array2)
		return ok<ReadonlyArray<[T, U]>>(product)
	}
}
