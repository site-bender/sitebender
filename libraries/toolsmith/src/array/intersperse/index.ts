import type { Result } from "../../types/fp/result/index.ts"
import type {
	Validation,
	ValidationError,
} from "../../types/fp/validation/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import _intersperseArray from "./_intersperseArray/index.ts"
import _intersperseToResult from "./_intersperseToResult/index.ts"
import _intersperseToValidation from "./_intersperseToValidation/index.ts"

//++ Inserts a separator element between all array elements
export default function intersperse<T, U>(separator: U) {
	function intersperseWithSeparator(
		array: ReadonlyArray<T>,
	): ReadonlyArray<T | U>

	function intersperseWithSeparator(
		array: Result<ValidationError, ReadonlyArray<T>>,
	): Result<ValidationError, ReadonlyArray<T | U>>

	function intersperseWithSeparator(
		array: Validation<ValidationError, ReadonlyArray<T>>,
	): Validation<ValidationError, ReadonlyArray<T | U>>

	function intersperseWithSeparator(
		array:
			| ReadonlyArray<T>
			| Result<ValidationError, ReadonlyArray<T>>
			| Validation<ValidationError, ReadonlyArray<T>>,
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
