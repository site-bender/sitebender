import type { Result } from "../../types/fp/result/index.ts"
import type { Validation } from "../../types/fp/validation/index.ts"
import isOk from "../../monads/result/isOk/index.ts"
import isSuccess from "../../monads/validation/isSuccess/index.ts"
import chainResults from "../../monads/result/chain/index.ts"
import chainValidations from "../../monads/validation/chain/index.ts"
import isArray from "../../predicates/isArray/index.ts"
import _chunkArray from "./_chunkArray/index.ts"
import _chunkToResult from "./_chunkToResult/index.ts"
import _chunkToValidation from "./_chunkToValidation/index.ts"

//++ Splits an array into fixed-size chunks
//++ Pattern: three-path overloaded function for plain arrays, Result monads, and Validation monads
export default function chunk<E, T>(size: number) {
	//++ [OVERLOAD 1] Plain array path
	function chunkWithSize(
		array: ReadonlyArray<T>,
	): ReadonlyArray<ReadonlyArray<T>>

	//++ [OVERLOAD 2] Result monad path (fail-fast error handling)
	function chunkWithSize(
		array: Result<E, ReadonlyArray<T>>,
	): Result<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ [OVERLOAD 3] Validation monad path (accumulate errors)
	function chunkWithSize(
		array: Validation<E, ReadonlyArray<T>>,
	): Validation<E, ReadonlyArray<ReadonlyArray<T>>>

	//++ Implementation with type dispatch
	function chunkWithSize(array: unknown) {
		if (isArray<T>(array)) {
			return _chunkArray(size)(array)
		}

		if (isOk<ReadonlyArray<T>>(array)) {
			return chainResults(_chunkToResult(size))(array)
		}

		if (isSuccess<ReadonlyArray<T>>(array)) {
			return chainValidations(_chunkToValidation(size))(array)
		}

		return array
	}

	return chunkWithSize
}
