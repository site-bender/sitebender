import type { Result, ValidationError } from "../../../types/fp/index.ts"
import _takeLastWhileArray from "../_takeLastWhileArray/index.ts"
import ok from "../../../monads/result/ok/index.ts"

//++ Monadic wrapper for Result path
//++ Takes plain array, returns Result-wrapped array
export default function _takeLastWhileToResult<T>(
	predicate: (item: T, index: number, array: ReadonlyArray<T>) => boolean,
) {
	return function _takeLastWhileToResultWithPredicate(
		array: ReadonlyArray<T>,
	): Result<ValidationError, ReadonlyArray<T>> {
		return ok(_takeLastWhileArray(predicate)(array))
	}
}
