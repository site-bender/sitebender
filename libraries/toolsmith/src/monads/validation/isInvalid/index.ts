import type { Failure, Validation } from "../../../types/Validation/index.ts"

//++ Checks if a validation is a failure
export default function isInvalid<E, A>(
	validation: Validation<E, A>,
): validation is Failure<E> {
	return validation._tag === "Failure"
}

//?? [EXAMPLE] isInvalid(invalid(["error"])) // true
//?? [EXAMPLE] isInvalid(valid(42)) // false

//?? [EXAMPLE] isInvalid(invalid([{field: "age", messages: ["error"]}])) // true
//?? [EXAMPLE] isInvalid(valid("hello")) // false

/*??
 | [EXAMPLE]
 | const v1 = invalid(["error message"])
 | if (isInvalid(v1)) {
 |   console.log(v1.errors) // TypeScript knows v1.errors exists
 |   // ["error message"]
 | }
 |
 | const v2 = valid(42)
 | if (isInvalid(v2)) {
 |   console.log(v2.errors) // This branch won't execute
 | } else {
 |   console.log(v2.value) // TypeScript knows v2.value exists
 |   // 42
 | }
 |
 | // Type guard narrows the type
 | function getErrors(v: Validation<string, number>): string[] {
 |   if (isInvalid(v)) {
 |     // v is Invalid<string> here
 |     return v.errors
 |   } else {
 |     // v is Valid<number> here
 |     return []
 |   }
 | }
 |
 | // Use with filter to get only failures
 | const validations = [valid(1), invalid(["e1"]), invalid(["e2"])]
 | const failures = validations.filter(isInvalid)
 | // TypeScript knows: Array<Invalid<string>>
 |
 | // Early return pattern
 | function process(v: Validation<Error, Data>) {
 |   if (isInvalid(v)) {
 |     logErrors(v.errors)
 |     return
 |   }
 |   // v is Valid<Data> here
 |   processData(v.value)
 | }
 |
 | [PRO] Type guard provides type narrowing in TypeScript
 | [PRO] Enables safe access to .errors property
 | [PRO] Useful for error-first handling patterns
 | [PRO] Works with array methods like filter, partition, etc.
 |
 | [GOTCHA] Must import Invalid type for TypeScript narrowing
 | [GOTCHA] Opposite of isValid - use one consistently
 | [GOTCHA] Type guard only works in same scope/closure
 */
