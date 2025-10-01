import type { Success, Validation } from "../../../types/Validation/index.ts"

//++ Checks if a validation is successful
export default function isValid<E, A>(
	validation: Validation<E, A>,
): validation is Success<A> {
	return validation._tag === "Success"
}

//?? [EXAMPLE] isValid(valid(42)) // true
//?? [EXAMPLE] isValid(invalid(["error"])) // false

//?? [EXAMPLE] isValid(valid("hello")) // true
//?? [EXAMPLE] isValid(invalid([{field: "age", messages: ["error"]}])) // false

/*??
 | [EXAMPLE]
 | const v1 = valid(100)
 | if (isValid(v1)) {
 |   console.log(v1.value) // TypeScript knows v1.value exists
 |   // 100
 | }
 |
 | const v2 = invalid(["error"])
 | if (isValid(v2)) {
 |   console.log(v2.value) // This branch won't execute
 | } else {
 |   console.log(v2.errors) // TypeScript knows v2.errors exists
 |   // ["error"]
 | }
 |
 | // Type guard narrows the type
 | function processValidation(v: Validation<string, number>) {
 |   if (isValid(v)) {
 |     // v is Valid<number> here
 |     return v.value * 2
 |   } else {
 |     // v is Invalid<string> here
 |     return 0
 |   }
 | }
 |
 | // Use with filter
 | const validations = [valid(1), invalid(["e"]), valid(2)]
 | const onlyValid = validations.filter(isValid)
 | // TypeScript knows: Array<Valid<number>>
 |
 | [PRO] Type guard provides type narrowing in TypeScript
 | [PRO] Enables safe access to .value property
 | [PRO] Works with array methods like filter, find, etc.
 | [PRO] Simple boolean check for control flow
 |
 | [GOTCHA] Must import Valid type for TypeScript narrowing
 | [GOTCHA] Opposite of isInvalid - use one consistently
 | [GOTCHA] Type guard only works in same scope/closure
 */
