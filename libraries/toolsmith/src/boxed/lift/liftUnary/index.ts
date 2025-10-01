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
		ma: A | Result<E, A> | Validation<E[], A>,
	): Result<E, B> | Validation<E[], B> {
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

//?? [EXAMPLE] const double = liftUnary((x: number) => x * 2)
//?? [EXAMPLE] double(5) // Result.Ok(10)
//?? [EXAMPLE] double(ok(5)) // Result.Ok(10)
//?? [EXAMPLE] double(success(5)) // Validation.Valid(10)

/*??
 | [EXAMPLE]
 | import square from "@toolsmith/vanilla/math/square"
 |
 | const boxedSquare = liftUnary(square)
 |
 | // Works with plain values (returns Result)
 | boxedSquare(4) // {_tag: "Ok", value: 16}
 |
 | // Works with Result
 | boxedSquare(ok(4)) // {_tag: "Ok", value: 16}
 | boxedSquare(error("failed")) // {_tag: "Error", error: "failed"}
 |
 | // Works with Validation
 | boxedSquare(success(4)) // {_tag: "Valid", value: 16}
 | boxedSquare(failure(["failed"])) // {_tag: "Invalid", errors: ["failed"]}
 |
 | // Type propagation is automatic
 | const result = pipe(
 |   ok(4),
 |   boxedSquare,  // Result stays Result
 |   boxedSquare   // Still Result
 | )
 |
 | [PRO] One function handles all monad types
 | [PRO] Defaults to Result for plain values
 | [PRO] Validation "infects" the computation
 | [PRO] No cognitive overhead at call site
 |
 | [GOTCHA] Return type depends on input type
 | [GOTCHA] Can't mix Result and Validation in same chain
 */
