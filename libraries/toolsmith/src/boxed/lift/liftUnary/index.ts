import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import error from "../../../monads/result/error/index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isResult from "../../../monads/result/isResult/index.ts"
import resultMap from "../../../monads/result/map/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import isValid from "../../../monads/validation/isValid/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import validationMap from "../../../monads/validation/map/index.ts"

//++ Lifts a unary function to work with Result/Validation monads
//++ Defaults to Result if given plain values
//++ Handles null returns from vanilla functions by converting to Error/Failure
export default function liftUnary<A, B, E>(fn: (a: A) => B | null) {
	return function lifted(
		ma: A | Result<E, A> | Validation<E, A>,
	): Result<E, B> | Validation<E, B> {
		// If input is Validation, use Validation
		if (isValidation(ma)) {
			const result = validationMap(fn as (a: A) => B)(ma)
			if (isValid(result) && result.value === null) {
				return failure(["Null return from function" as unknown as E])
			}
			return result
		}

		// If input is Result, use Result
		if (isResult(ma)) {
			const result = resultMap(fn as (a: A) => B)(ma)
			if (isOk(result) && result.value === null) {
				return error("Null return from function" as unknown as E)
			}
			return result
		}

		// Plain value - default to Result
		const result = fn(ma)
		if (result === null) {
			return error("Null return from function" as unknown as E)
		}
		return ok(result)
	}
}
