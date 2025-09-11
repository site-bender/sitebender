import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"
import type { ValidationResult } from "../../../types/ValidationResult/index.ts"

import invalid from "../invalid/index.ts"
import valid from "../valid/index.ts"

//++ Creates a validation function from a predicate and error factory
export default function createValidator<T>(
	predicate: (value: T) => boolean,
) {
	return function withErrorFactory(
		createError: (value: T) => ValidationError,
	) {
		return function validate(value: T): ValidationResult<T> {
			if (predicate(value)) {
				return valid(value)
			}

			const error = createError(value)

			return invalid([error] as NonEmptyArray<ValidationError>)
		}
	}
}

//?? [EXAMPLE] createValidator((x: number) => x >= 18)((x) => ({field: "age", messages: [`${x} is too young`]}))(21) // valid(21)
//?? [EXAMPLE] createValidator((x: number) => x >= 18)((x) => ({field: "age", messages: [`${x} is too young`]}))(16)
//?? // invalid([{field: "age", messages: ["16 is too young"]}])

/*??
 | [EXAMPLE]
 | // Create reusable validators
 | const isPositive = createValidator((n: number) => n > 0)
 | const positiveNumber = isPositive((n) => ({
 |   field: "number",
 |   messages: [`${n} must be positive`]
 | }))
 |
 | positiveNumber(5)   // valid(5)
 | positiveNumber(-3)  // invalid([{field: "number", messages: ["-3 must be positive"]}])
 |
 | // Email validator
 | const isEmail = createValidator((s: string) => s.includes("@"))
 | const emailValidator = isEmail((s) => ({
 |   field: "email",
 |   messages: [`"${s}" is not a valid email`]
 | }))
 |
 | emailValidator("user@example.com")  // valid("user@example.com")
 | emailValidator("notanemail")        // invalid([{field: "email", messages: ["\"notanemail\" is not a valid email"]}])
 |
 | // Compose validators
 | const validators = [
 |   createValidator((x: number) => x >= 0)((x) => ({field: "value", messages: [`${x} must be non-negative`]})),
 |   createValidator((x: number) => x <= 100)((x) => ({field: "value", messages: [`${x} must be <= 100`]}))
 | ]
 |
 | [PRO] Separates validation logic from error message creation
 | [PRO] Creates reusable, composable validators
 | [PRO] Type-safe with proper error structure
 |
 | [GOTCHA] Error factory is called only when validation fails
 | [GOTCHA] Returns the original value when valid, not a transformed one
 */
