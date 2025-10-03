import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { Validation } from "@sitebender/toolsmith/types/Validation/index.ts"

import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isResult from "@sitebender/toolsmith/monads/result/isResult/index.ts"
import resultMap2 from "@sitebender/toolsmith/monads/result/map2/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isValidation from "@sitebender/toolsmith/monads/validation/isValidation/index.ts"
import validationMap2 from "@sitebender/toolsmith/monads/validation/map2/index.ts"
import success from "@sitebender/toolsmith/monads/validation/success/index.ts"

//++ Type-safe version of liftBinary with explicit type assertions
//++ This version passes TypeScript strict checks at the cost of some verbosity
export default function liftBinary<A, B, C, E>(fn: (a: A) => (b: B) => C) {
	return function liftedOuter(
		ma: A | Result<E, A> | Validation<E[], A>,
	) {
		return function liftedInner(
			mb: B | Result<E, B> | Validation<E[], B>,
		): Result<E, C> | Validation<E[], C> {
			// If EITHER argument is Validation, use Validation
			if (isValidation(ma) || isValidation(mb)) {
				// Extract value from Result if needed, otherwise wrap plain value
				const aVal = isValidation(ma)
					? ma
					: isResult(ma)
					? (isOk(ma)
						? success(ma.value)
						: { _tag: "Invalid" as const, errors: [ma.error] as [E] })
					: success(ma as A)

				const bVal = isValidation(mb)
					? mb
					: isResult(mb)
					? (isOk(mb)
						? success(mb.value)
						: { _tag: "Invalid" as const, errors: [mb.error] as [E] })
					: success(mb as B)

				return validationMap2(fn)(aVal as Validation<E, A>)(
					bVal as Validation<E, B>,
				) as Validation<E[], C>
			}

			// Otherwise use Result (either both Result or both plain)
			const aResult = isResult(ma) ? ma : ok(ma as A)
			const bResult = isResult(mb) ? mb : ok(mb as B)
			return resultMap2(fn)(aResult as Result<E, A>)(
				bResult as Result<E, B>,
			) as Result<E, C>
		}
	}
}
