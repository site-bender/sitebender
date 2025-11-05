import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _zipAllArray from "../_zipAllArray/index.ts"

//++ Private helper: Result monad path for zipAll
//++ Transforms successful Result, passes through errors unchanged
export default function _zipAllToResult<T, U>(
	array2: ReadonlyArray<U>,
) {
	return function zipAllWithSecondArrayToResult(
		array1: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<[T | undefined, U | undefined]>> {
		const result = _zipAllArray(array2)(array1)
		return ok(result)
	}
}
