import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _cartesianProductArray from "./_cartesianProductArray/index.ts"
import _cartesianProductToResult from "./_cartesianProductToResult/index.ts"
import _cartesianProductToValidation from "./_cartesianProductToValidation/index.ts"

//++ Generates all possible pairs from two arrays (cartesian product)
export default function cartesianProduct<E, T, U>(
	array1: ReadonlyArray<T>,
) {
	function cartesianProductWithFirstArray(
		array2: ReadonlyArray<U>,
	): ReadonlyArray<[T, U]>

	function cartesianProductWithFirstArray(
		array2: Result<E, ReadonlyArray<U>>,
	): Result<E, ReadonlyArray<[T, U]>>

	function cartesianProductWithFirstArray(
		array2: Validation<E, ReadonlyArray<U>>,
	): Validation<E, ReadonlyArray<[T, U]>>

	function cartesianProductWithFirstArray(array2: unknown) {
		if (isArray<U>(array2)) {
			return _cartesianProductArray(array1)(array2)
		}
		if (isOk<ReadonlyArray<U>>(array2)) {
			return chainResults(_cartesianProductToResult(array1))(array2)
		}
		if (isSuccess<ReadonlyArray<U>>(array2)) {
			return chainValidations(_cartesianProductToValidation(array1))(array2)
		}
		return array2
	}

	return cartesianProductWithFirstArray
}
