import type { Validation } from "../../../types/Validation/index.ts"

//++ Chains validation computations, short-circuiting on invalid
export default function chain<A, E, B>(fn: (value: A) => Validation<E, B>) {
	return function applyChain(
		validation: Validation<E, A>,
	): Validation<E, B> {
		if (validation._tag === "Failure") {
			return validation
		}

		return fn(validation.value)
	}
}

//?? [EXAMPLE] chain(n => n > 10 ? valid(n) : invalid(["too small"]))(valid(15)) // valid(15)
//?? [EXAMPLE] chain(n => n > 10 ? valid(n) : invalid(["too small"]))(valid(5)) // invalid(["too small"])
//?? [EXAMPLE] chain(n => valid(n * 2))(invalid(["error"])) // invalid(["error"]) - short-circuits

/*??
 | [EXAMPLE]
 | const validateAge = (age: number) =>
 |   age >= 18 ? valid(age) : invalid([{field: "age", messages: ["must be 18+"]}])
 |
 | const validateNotTooOld = (age: number) =>
 |   age <= 65 ? valid(age) : invalid([{field: "age", messages: ["must be 65 or under"]}])
 |
 | // Chain multiple validations
 | const result1 = chain(validateNotTooOld)(validateAge(25))
 | // valid(25) - passes both validations
 |
 | const result2 = chain(validateNotTooOld)(validateAge(15))
 | // invalid([{field: "age", messages: ["must be 18+"]}]) - fails first validation
 |
 | const result3 = chain(validateNotTooOld)(validateAge(70))
 | // invalid([{field: "age", messages: ["must be 65 or under"]}]) - passes first, fails second
 |
 | // Sequential dependent validations
 | const parseNumber = (s: string) => {
 |   const n = Number(s)
 |   return isNaN(n) ? invalid(["not a number"]) : valid(n)
 | }
 |
 | const checkPositive = (n: number) =>
 |   n > 0 ? valid(n) : invalid(["must be positive"])
 |
 | const pipeline = chain(checkPositive)(parseNumber("42"))
 | // valid(42)
 |
 | const pipeline2 = chain(checkPositive)(parseNumber("abc"))
 | // invalid(["not a number"]) - short-circuits, never checks positive
 |
 | [PRO] Enables sequential validation with dependency between steps
 | [PRO] Short-circuits on first failure (fail-fast semantics)
 | [PRO] Composes validation functions cleanly
 | [PRO] Follows monad laws for predictable behavior
 |
 | [GOTCHA] Only the first error is preserved in a chain
 | [GOTCHA] Later validations won't run if earlier ones fail
 | [GOTCHA] Use validateAll or combineValidations to accumulate all errors
 */
