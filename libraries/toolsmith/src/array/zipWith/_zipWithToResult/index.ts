import type { Result, ValidationError } from "../../../types/fp/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import _zipWithArray from "../_zipWithArray/index.ts"

//++ Private helper: Result monad path for zipWith
//++ Transforms successful Result, passes through errors unchanged
export default function _zipWithToResult<T, U, V>(
	fn: (a: T) => (b: U) => V,
) {
	return function zipWithWithFunctionToResult(
		array1: ReadonlyArray<T>,
	) {
		return function zipWithWithFirstArrayToResult(
			array2: ReadonlyArray<U>,
		): Result<ValidationError, ReadonlyArray<V>> {
			const result = _zipWithArray(fn)(array1)(array2)
			return ok(result)
		}
	}
}
