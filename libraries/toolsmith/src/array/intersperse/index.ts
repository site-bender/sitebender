import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _intersperseArray from "./_intersperseArray/index.ts"
import _intersperseToResult from "./_intersperseToResult/index.ts"
import _intersperseToValidation from "./_intersperseToValidation/index.ts"

//++ Inserts a separator element between all array elements
export default function intersperse<E, T, U>(separator: U) {
	function intersperseWithSeparator(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T | U>

	function intersperseWithSeparator(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<T | U>>

	function intersperseWithSeparator(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<T | U>>

	function intersperseWithSeparator(
		array:
			| ReadonlyArray<T>
			| Result<E, ReadonlyArray<T>>
			| Validation<E, ReadonlyArray<T>>,
	) {
		if (isArray<T>(array)) {
			return _intersperseArray(separator)(array)
		}
		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_intersperseToResult(separator))(array)
		}
		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_intersperseToValidation(separator))(array)
		}
		return array
	}

	return intersperseWithSeparator
}
