import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import isOk from "../../../monads/result/isOk/index.ts"
import isResult from "../../../monads/result/isResult/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import resultMap4 from "../../../monads/result/map4/index.ts"
import success from "../../../monads/validation/success/index.ts"
import validationMap4 from "../../../monads/validation/map4/index.ts"

//++ Lifts a curried quaternary function to work with Result/Validation monads
//++ If any argument is Validation, returns Validation
//++ Otherwise defaults to Result
export default function liftQuaternary<A, B, C, D, E, F>(
	fn: (a: A) => (b: B) => (c: C) => (d: D) => E,
) {
	return function liftedFirst(
		ma: A | Result<F, A> | Validation<F[], A>,
	) {
		return function liftedSecond(
			mb: B | Result<F, B> | Validation<F[], B>,
		) {
			return function liftedThird(
				mc: C | Result<F, C> | Validation<F[], C>,
			) {
				return function liftedFourth(
					md: D | Result<F, D> | Validation<F[], D>,
				): Result<F, E> | Validation<F[], E> {
					// If ANY argument is Validation, use Validation
					if (
						isValidation(ma) || isValidation(mb) || isValidation(mc) ||
						isValidation(md)
					) {
						const aVal = isValidation(ma)
							? ma
							: isResult(ma)
								? (isOk(ma) ? success(ma.value) : { _tag: "Failure" as const, errors: [ma.error] as [F] })
								: success(ma as A)

						const bVal = isValidation(mb)
							? mb
							: isResult(mb)
								? (isOk(mb) ? success(mb.value) : { _tag: "Failure" as const, errors: [mb.error] as [F] })
								: success(mb as B)

						const cVal = isValidation(mc)
							? mc
							: isResult(mc)
								? (isOk(mc) ? success(mc.value) : { _tag: "Failure" as const, errors: [mc.error] as [F] })
								: success(mc as C)

						const dVal = isValidation(md)
							? md
							: isResult(md)
								? (isOk(md) ? success(md.value) : { _tag: "Failure" as const, errors: [md.error] as [F] })
								: success(md as D)

						return validationMap4(fn)(aVal as Validation<F, A>)(bVal as Validation<F, B>)(cVal as Validation<F, C>)(dVal as Validation<F, D>) as Validation<F[], E>
					}

					// Otherwise use Result (all Result or all plain)
					const aResult = isResult(ma) ? ma : ok(ma as A)
					const bResult = isResult(mb) ? mb : ok(mb as B)
					const cResult = isResult(mc) ? mc : ok(mc as C)
					const dResult = isResult(md) ? md : ok(md as D)
					return resultMap4(fn)(aResult as Result<F, A>)(bResult as Result<F, B>)(cResult as Result<F, C>)(dResult as Result<F, D>) as Result<F, E>
				}
			}
		}
	}
}
