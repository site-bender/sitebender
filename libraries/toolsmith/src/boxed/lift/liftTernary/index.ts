import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import error from "../../../monads/result/error/index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isResult from "../../../monads/result/isResult/index.ts"
import resultMap3 from "../../../monads/result/map3/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import isValid from "../../../monads/validation/isValid/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import validationMap3 from "../../../monads/validation/map3/index.ts"
import success from "../../../monads/validation/success/index.ts"

//++ Lifts a curried ternary function to work with Result/Validation monads
//++ If any argument is Validation, returns Validation
//++ Otherwise defaults to Result
//++ Handles null returns from vanilla functions by converting to Error/Failure
export default function liftTernary<A, B, C, D, E>(
	fn: (a: A) => ((b: B) => ((c: C) => D | null) | null) | null,
) {
	return function liftedFirst(
		ma: A | Result<E, A> | Validation<E, A>,
	) {
		return function liftedSecond(
			mb: B | Result<E, B> | Validation<E, B>,
		) {
			return function liftedThird(
				mc: C | Result<E, C> | Validation<E, C>,
			): Result<E, D> | Validation<E, D> {
				// If ANY argument is Validation, use Validation
				if (isValidation(ma) || isValidation(mb) || isValidation(mc)) {
					// Extract value from Result if needed, otherwise wrap plain value
					const aVal = isValidation(ma)
						? ma
						: isResult(ma)
						? (isOk(ma)
							? success(ma.value)
							: { _tag: "Failure" as const, errors: [ma.error] as [E] })
						: success(ma as A)

					const bVal = isValidation(mb)
						? mb
						: isResult(mb)
						? (isOk(mb)
							? success(mb.value)
							: { _tag: "Failure" as const, errors: [mb.error] as [E] })
						: success(mb as B)

					const cVal = isValidation(mc)
						? mc
						: isResult(mc)
						? (isOk(mc)
							? success(mc.value)
							: { _tag: "Failure" as const, errors: [mc.error] as [E] })
						: success(mc as C)

					const result = validationMap3(fn as (a: A) => (b: B) => (c: C) => D)(
						aVal as Validation<E, A>,
					)(bVal as Validation<E, B>)(cVal as Validation<E, C>)

					// Check if result is Success(null) and convert to Failure
					if (isValid(result) && result.value === null) {
						return failure([
							"Null return from function" as unknown as E,
						]) as Validation<E, D>
					}

					return result as Validation<E, D>
				}

				// Otherwise use Result (all Result or all plain)
				const aResult = isResult(ma) ? ma : ok(ma as A)
				const bResult = isResult(mb) ? mb : ok(mb as B)
				const cResult = isResult(mc) ? mc : ok(mc as C)
				const result = resultMap3(fn as (a: A) => (b: B) => (c: C) => D)(
					aResult as Result<E, A>,
				)(bResult as Result<E, B>)(cResult as Result<E, C>)

				// Check if result is Ok(null) and convert to Error
				if (isOk(result) && result.value === null) {
					return error("Null return from function" as unknown as E)
				}

				return result as Result<E, D>
			}
		}
	}
}
