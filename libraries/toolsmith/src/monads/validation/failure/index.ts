import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Invalid, Validation } from "../../../types/Validation/index.ts"

//++ Creates a Failure validation containing errors
export default function failure<E, A = never>(
	errors: NonEmptyArray<E>,
): Validation<E, A> {
	return {
		_tag: "Failure" as const,
		errors,
	} as Invalid<E>
}

//?? [EXAMPLE] invalid(["error"]) // {_tag: "Failure", errors: ["error"]}
//?? [EXAMPLE] invalid(["error1", "error2"]) // {_tag: "Failure", errors: ["error1", "error2"]}
//?? [EXAMPLE] invalid([{field: "age", messages: ["required"]}])
//?? // {_tag: "Failure", errors: [{field: "age", messages: ["required"]}]}

/*??
 | [EXAMPLE]
 | const validationError = invalid([{
 |   field: "email",
 |   messages: ["invalid format", "domain not allowed"]
 | }])
 | // {_tag: "Failure", errors: [{field: "email", messages: [...]}]}
 |
 | // Multiple errors
 | const multipleErrors = invalid([
 |   {field: "age", messages: ["must be 18+"]},
 |   {field: "name", messages: ["required"]}
 | ])
 | // {_tag: "Failure", errors: [{...}, {...}]}
 |
 | // Simple string errors
 | const simpleError = invalid(["Something went wrong"])
 | // {_tag: "Failure", errors: ["Something went wrong"]}
 |
 | // Type must be NonEmptyArray - at least one error required
 | // invalid([]) // TypeScript error - empty array not allowed
 |
 | // Use with validation functions
 | const validateAge = (age: number) =>
 |   age >= 18
 |     ? valid(age)
 |     : invalid([{field: "age", messages: ["too young"]}])
 |
 | [PRO] Guarantees at least one error (NonEmptyArray)
 | [PRO] Can hold multiple errors for accumulation
 | [PRO] Type-safe error structure
 | [PRO] Integrates with all validation monad functions
 |
 | [GOTCHA] Requires NonEmptyArray - cannot create with empty array
 | [GOTCHA] Value type A must be specified or inferred from context
 | [GOTCHA] Errors are not automatically deduplicated
 */
