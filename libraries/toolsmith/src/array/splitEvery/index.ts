import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _splitEveryArray from "./_splitEveryArray/index.ts"
import _splitEveryToResult from "./_splitEveryToResult/index.ts"
import _splitEveryToValidation from "./_splitEveryToValidation/index.ts"

//++ Splits array into fixed-size chunks (similar to chunk but different API)
//++ Pattern: three-path overloaded function for plain arrays, Result monads, and Validation monads
export default function splitEvery<T>(chunkSize: number) {
	//++ [OVERLOAD 1] Plain array path
	function splitEveryWithSize(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>>

	//++ [OVERLOAD 2] Result monad path (fail-fast error handling)
	function splitEveryWithSize(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ [OVERLOAD 3] Validation monad path (accumulate errors)
	function splitEveryWithSize(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ Implementation with type dispatch
	function splitEveryWithSize(array: unknown) {
		if (isArray<T>(array)) {
			return _splitEveryArray(chunkSize)(array)
		}

		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_splitEveryToResult(chunkSize))(array)
		}

		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_splitEveryToValidation(chunkSize))(array)
		}

		return array
	}

	return splitEveryWithSize
}
