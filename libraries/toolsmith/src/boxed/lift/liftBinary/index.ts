import type { Result } from "../../../types/fp/result/index.ts"
import type { Validation } from "../../../types/Validation/index.ts"

import error from "../../../monads/result/error/index.ts"
import failure from "../../../monads/validation/failure/index.ts"
import isOk from "../../../monads/result/isOk/index.ts"
import isResult from "../../../monads/result/isResult/index.ts"
import isValid from "../../../monads/validation/isValid/index.ts"
import isValidation from "../../../monads/validation/isValidation/index.ts"
import ok from "../../../monads/result/ok/index.ts"
import resultMap2 from "../../../monads/result/map2/index.ts"
import success from "../../../monads/validation/success/index.ts"
import validationMap2 from "../../../monads/validation/map2/index.ts"

//++ Lifts a curried binary function to work with Result/Validation monads
//++ If either argument is Validation, returns Validation
//++ Otherwise defaults to Result
//++ Handles null returns from vanilla functions by converting to Error/Failure
export default function liftBinary<A, B, C, E>(
	fn: (a: A) => ((b: B) => C | null) | null,
) {
	// Wrap fn to handle null returns at both curry stages
	const safeFn = (a: A) => {
		const partialResult = fn(a)
		if (partialResult === null) {
			return (_b: B) => null as C
		}
		return (b: B) => {
			const result = partialResult(b)
			return result as C
		}
	}

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

				const result = validationMap2(safeFn as (a: A) => (b: B) => C)(aVal as Validation<E, A>)(bVal as Validation<E, B>)

				// Check if result is Success(null) and convert to Failure
				if (isValid(result) && result.value === null) {
					return failure(["Null return from function" as unknown as E]) as Validation<E, C>
				}

				return result as Validation<E, C>
			}

			// Otherwise use Result (either both Result or both plain)
			const aResult = isResult(ma) ? ma : ok(ma as A)
			const bResult = isResult(mb) ? mb : ok(mb as B)
			const result = resultMap2(safeFn as (a: A) => (b: B) => C)(aResult as Result<E, A>)(bResult as Result<E, B>)

			// Check if result is Ok(null) and convert to Error
			if (isOk(result) && result.value === null) {
				return error("Null return from function" as unknown as E)
			}

			return result as Result<E, C>
		}
	}
}
