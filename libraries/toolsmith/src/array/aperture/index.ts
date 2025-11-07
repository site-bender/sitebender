import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _apertureArray from "./_apertureArray/index.ts"
import _apertureToResult from "./_apertureToResult/index.ts"
import _apertureToValidation from "./_apertureToValidation/index.ts"

//++ Creates sliding windows of consecutive elements
//++ Pattern: three-path overloaded function for plain arrays, Result monads, and Validation monads
export default function aperture<E, T>(width: number) {
	//++ [OVERLOAD 1] Plain array path
	function apertureWithWidth(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>>

	//++ [OVERLOAD 2] Result monad path (fail-fast error handling)
	function apertureWithWidth(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ [OVERLOAD 3] Validation monad path (accumulate errors)
	function apertureWithWidth(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ Implementation with type dispatch
	function apertureWithWidth(array: unknown) {
		if (isArray<T>(array)) {
			return _apertureArray(width)(array)
		}

		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_apertureToResult(width))(array)
		}

		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_apertureToValidation(width))(array)
		}

		return array
	}

	return apertureWithWidth
}
