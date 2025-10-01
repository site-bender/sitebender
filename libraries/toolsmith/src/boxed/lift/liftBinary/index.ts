import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import isOk from "../../../monads/result/isOk/index.ts"
import isResult from "../../../monads/result/isResult/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import resultMap2 from "../../../monads/result/map2/index.ts"
import success from "../../../monads/validation/success/index.ts"
import validationMap2 from "../../../monads/validation/map2/index.ts"

//++ Lifts a curried binary function to work with Result/Validation monads
//++ If either argument is Validation, returns Validation
//++ Otherwise defaults to Result
export default function liftBinary<A, B, C, E>(fn: (a: A) => (b: B) => C) {
	return function liftedOuter(
		ma: A | Result<E, A> | Validation<E, A>,
	) {
		return function liftedInner(
			mb: B | Result<E, B> | Validation<E, B>,
		): Result<E, C> | Validation<E, C> {
			// If EITHER argument is Validation, use Validation
			if (isValidation(ma) || isValidation(mb)) {
				// Extract value from Result if needed, otherwise wrap plain value
				const aVal = isValidation(ma)
					? ma
					: isResult(ma)
						? (isOk(ma) ? success(ma.value) : { _tag: "Failure" as const, errors: [ma.error] as [E] })
						: success(ma as A)

				const bVal = isValidation(mb)
					? mb
					: isResult(mb)
						? (isOk(mb) ? success(mb.value) : { _tag: "Failure" as const, errors: [mb.error] as [E] })
						: success(mb as B)

				return validationMap2(fn)(aVal as Validation<E, A>)(bVal as Validation<E, B>) as Validation<E, C>
			}

			// Otherwise use Result (either both Result or both plain)
			const aResult = isResult(ma) ? ma : ok(ma as A)
			const bResult = isResult(mb) ? mb : ok(mb as B)
			return resultMap2(fn)(aResult as Result<E, A>)(bResult as Result<E, B>) as Result<E, C>
		}
	}
}
