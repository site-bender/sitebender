import type { Validation } from "../../../types/Validation/index.ts"

//++ Returns the validation if Valid, otherwise returns an alternative validation
export default function orElse<E, A>(
	alternative: () => Validation<E, A>,
) {
	return function applyOrElse(validation: Validation<E, A>): Validation<E, A> {
		if (validation._tag === "Invalid") {
			return alternative()
		}

		return validation
	}
}

//?? [EXAMPLE] orElse(() => valid(0))(valid(42)) // valid(42)
//?? [EXAMPLE] orElse(() => valid(0))(invalid(["error"])) // valid(0)

//?? [EXAMPLE] orElse(() => invalid(["fallback error"]))(invalid(["original error"])) // invalid(["fallback error"])
//?? [EXAMPLE] orElse(() => valid("default"))(invalid([{field: "name", messages: ["required"]}])) // valid("default")

/*??
 | [EXAMPLE]
 | const primaryValidation = invalid([{field: "primary", messages: ["failed"]}])
 | const fallbackValidation = valid("fallback value")
 |
 | const result = orElse(() => fallbackValidation)(primaryValidation)
 | // valid("fallback value")
 |
 | // Chaining multiple fallbacks
 | const tryPrimary = invalid(["primary failed"])
 | const trySecondary = () => invalid(["secondary failed"])
 | const tryTertiary = () => valid("tertiary succeeded")
 |
 | const result2 = pipe(
 |   tryPrimary,
 |   orElse(trySecondary),
 |   orElse(tryTertiary)
 | )
 | // valid("tertiary succeeded")
 |
 | // Lazy evaluation of alternative
 | let sideEffectCount = 0
 | const expensiveAlternative = () => {
 |   sideEffectCount++
 |   return valid("computed")
 | }
 |
 | orElse(expensiveAlternative)(valid("already valid"))
 | // sideEffectCount remains 0 - alternative not evaluated
 |
 | orElse(expensiveAlternative)(invalid(["error"]))
 | // sideEffectCount becomes 1 - alternative evaluated
 |
 | [PRO] Provides fallback validation logic
 | [PRO] Alternative is lazily evaluated only when needed
 | [PRO] Can chain multiple fallback strategies
 | [PRO] Useful for retry logic or alternative data sources
 |
 | [GOTCHA] Alternative is a thunk (function) for lazy evaluation
 | [GOTCHA] Original error is discarded if alternative is used
 | [GOTCHA] Type of alternative must match original validation type
 */
