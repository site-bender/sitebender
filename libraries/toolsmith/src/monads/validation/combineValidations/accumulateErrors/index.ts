import type ValidationError from "../../../../types/ValidationError/index.ts"
import type { ValidationResult } from "../../../../types/ValidationResult/index.ts"

import isValid from "../../isValid/index.ts"

type AccumulatorState<T> = {
	errors: Array<ValidationError>
	lastValidValue: T | undefined
}

//++ Accumulates errors from validation results while tracking last valid value
export default function accumulateErrors<T>(
	acc: AccumulatorState<T>,
	validation: ValidationResult<T>,
): AccumulatorState<T> {
	if (isValid(validation)) {
		return {
			...acc,
			lastValidValue: validation.value,
		}
	}

	return {
		...acc,
		errors: [...acc.errors, ...validation.errors],
	}
}

//?? [EXAMPLE] accumulateErrors({errors: [], lastValidValue: undefined}, valid(42)) // {errors: [], lastValidValue: 42}
//?? [EXAMPLE] accumulateErrors({errors: [], lastValidValue: undefined}, invalid([{field: "x", messages: ["error"]}]))
//?? // {errors: [{field: "x", messages: ["error"]}], lastValidValue: undefined}

//?? [EXAMPLE] accumulateErrors({errors: [{field: "y", messages: ["existing"]}], lastValidValue: 10}, invalid([{field: "x", messages: ["new"]}]))
//?? // {errors: [{field: "y", messages: ["existing"]}, {field: "x", messages: ["new"]}], lastValidValue: 10}

/*??
 | [EXAMPLE]
 | const initial = {errors: [], lastValidValue: undefined}
 | const step1 = accumulateErrors(initial, valid(10))
 | // {errors: [], lastValidValue: 10}
 | const step2 = accumulateErrors(step1, invalid([{field: "age", messages: ["too young"]}]))
 | // {errors: [{field: "age", messages: ["too young"]}], lastValidValue: 10}
 | const step3 = accumulateErrors(step2, valid(20))
 | // {errors: [{field: "age", messages: ["too young"]}], lastValidValue: 20} - newer valid value
 | const step4 = accumulateErrors(step3, invalid([{field: "name", messages: ["required"]}]))
 | // {errors: [{field: "age", messages: ["too young"]}, {field: "name", messages: ["required"]}], lastValidValue: 20}
 |
 | // Used with reduce to process multiple validation results
 | const validations = [valid(1), invalid([{field: "x", messages: ["error1"]}]), valid(2), invalid([{field: "y", messages: ["error2"]}])]
 | const result = reduce(accumulateErrors)(initial)(validations)
 | // {errors: [{field: "x", messages: ["error1"]}, {field: "y", messages: ["error2"]}], lastValidValue: 2}
 |
 | [PRO] Accumulates all errors from invalid validations
 | [PRO] Tracks the most recent valid value encountered
 | [PRO] Preserves error order and structure
 | [PRO] Works seamlessly with reduce function
 | [PRO] Pure function with no side effects
 |
 | [GOTCHA] Last valid value wins, not first
 | [GOTCHA] Spreads error arrays, flattening nested structures
 */
