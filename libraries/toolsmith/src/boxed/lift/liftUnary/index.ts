import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import isResult from "../../../monads/result/isResult/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import resultMap from "../../../monads/result/map/index.ts"
import validationMap from "../../../monads/validation/map/index.ts"

//++ Lifts a unary function to work with Result/Validation monads
//++ Defaults to Result if given plain values
export default function liftUnary<A, B, E>(fn: (a: A) => B) {
	return function lifted(
		ma: A | Result<E, A> | Validation<E, A>,
	): Result<E, B> | Validation<E, B> {
		// If input is Validation, use Validation
		if (isValidation(ma)) {
			return validationMap(fn)(ma)
		}

		// If input is Result, use Result
		if (isResult(ma)) {
			return resultMap(fn)(ma)
		}

		// Plain value - default to Result
		return ok(fn(ma))
	}
}
