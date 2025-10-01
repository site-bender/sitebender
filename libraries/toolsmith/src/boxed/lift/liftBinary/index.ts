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
						? (isOk(ma) ? success(ma.value) : { _tag: "Failure" as const, errors: [ma.error] as [E] })
						: success(ma as A)

				const bVal = isValidation(mb)
					? mb
					: isResult(mb)
						? (isOk(mb) ? success(mb.value) : { _tag: "Failure" as const, errors: [mb.error] as [E] })
						: success(mb as B)

				return validationMap2(fn)(aVal as Validation<E, A>)(bVal as Validation<E, B>) as Validation<E[], C>
			}

			// Otherwise use Result (either both Result or both plain)
			const aResult = isResult(ma) ? ma : ok(ma as A)
			const bResult = isResult(mb) ? mb : ok(mb as B)
			return resultMap2(fn)(aResult as Result<E, A>)(bResult as Result<E, B>) as Result<E, C>
		}
	}
}

//?? [EXAMPLE] const add = liftBinary((a: number) => (b: number) => a + b)
//?? [EXAMPLE] add(5)(10) // Result.Ok(15)
//?? [EXAMPLE] add(ok(5))(success(10)) // Validation.Valid(15) - Validation wins

/*??
 | [EXAMPLE]
 | import vanillaAdd from "@toolsmith/vanilla/math/add"
 |
 | const boxedAdd = liftBinary(vanillaAdd)
 |
 | // Plain values default to Result
 | boxedAdd(3)(4) // {_tag: "Ok", value: 7}
 |
 | // Result + Result = Result
 | boxedAdd(ok(3))(ok(4)) // {_tag: "Ok", value: 7}
 | boxedAdd(error("bad"))(ok(4)) // {_tag: "Error", error: "bad"}
 |
 | // Validation + anything = Validation (Validation "infects")
 | boxedAdd(success(3))(4) // {_tag: "Valid", value: 7}
 | boxedAdd(ok(3))(success(4)) // {_tag: "Valid", value: 7}
 | boxedAdd(failure(["e1"]))(success(4)) // {_tag: "Invalid", errors: ["e1"]}
 |
 | // Both failures accumulate errors
 | boxedAdd(failure(["e1"]))(failure(["e2"]))
 | // {_tag: "Invalid", errors: ["e1", "e2"]}
 |
 | // Composition works naturally
 | const result = pipe(
 |   success(10),
 |   boxedAdd(5),      // Validation propagates
 |   boxedMultiply(2)  // Still Validation
 | )
 |
 | [PRO] Validation "wins" - accumulating behavior when needed
 | [PRO] Result is the sensible default for plain values
 | [PRO] No extra parameters at call site
 | [PRO] Type propagation is automatic
 |
 | [GOTCHA] Mixing Result and Validation converts to Validation
 | [GOTCHA] Can't force Result if Validation is present
 */
