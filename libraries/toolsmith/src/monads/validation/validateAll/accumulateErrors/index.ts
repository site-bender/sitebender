import type ValidationError from "../../../../types/ValidationError/index.ts"
import type { ValidationResult } from "../../../../types/ValidationResult/index.ts"

import isInvalid from "../../isInvalid/index.ts"

//++ Accumulates errors from validator functions applied to a value
export default function accumulateErrors<T>(value: T) {
	return function withValue(
		acc: Array<ValidationError>,
		validator: (value: T) => ValidationResult<T>,
	): Array<ValidationError> {
		const result = validator(value)
		if (isInvalid(result)) {
			return [...acc, ...result.errors]
		}

		return acc
	}
}

//?? [EXAMPLE] accumulateErrors(42)([], v => valid(42)) // []
//?? [EXAMPLE] accumulateErrors(42)([], v => invalid([{field: "x", messages: ["error"]}]))
//?? // [{field: "x", messages: ["error"]}]

//?? [EXAMPLE] accumulateErrors(42)([{field: "y", messages: ["existing"]}], v => invalid([{field: "x", messages: ["new"]}]))
//?? // [{field: "y", messages: ["existing"]}, {field: "x", messages: ["new"]}]

/*??
 | [EXAMPLE]
 | const validateAge = (age: number) => age >= 18 ? valid(age) : invalid([{field: "age", messages: ["too young"]}])
 | const validateEven = (n: number) => n % 2 === 0 ? valid(n) : invalid([{field: "number", messages: ["must be even"]}])
 |
 | const accumulateForValue = accumulateErrors(21)
 | const initial: Array<ValidationError> = []
 | const step1 = accumulateForValue(initial, validateAge)    // [] - passes age validation
 | const step2 = accumulateForValue(step1, validateEven)     // [{field: "number", messages: ["must be even"]}]
 |
 | // Used with reduce to process multiple validators
 | const validators = [validateAge, validateEven]
 | const allErrors = reduce(accumulateErrors(17))([])(validators)
 | // [{field: "age", messages: ["too young"]}, {field: "number", messages: ["must be even"]}]
 |
 | [PRO] Accumulates all errors from multiple validators
 | [PRO] Applies validator to value and extracts errors automatically
 | [PRO] Ignores valid results (perfect for error collection)
 | [PRO] Works seamlessly with reduce function
 | [PRO] Curried design allows reuse for same value
 |
 | [GOTCHA] Value is captured in closure, not passed per validator
 | [GOTCHA] Spreads error arrays, flattening nested structures
 */
