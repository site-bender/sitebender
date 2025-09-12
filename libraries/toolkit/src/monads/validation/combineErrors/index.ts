import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"

import reduce from "../../../vanilla/array/reduce/index.ts"
import groupByField from "./groupByField/index.ts"

//++ Combines validation errors using semigroup principles, grouping messages by field
export default function combineErrors(
	errors1: NonEmptyArray<ValidationError>,
) {
	return function withSecondErrors(
		errors2: NonEmptyArray<ValidationError>,
	): NonEmptyArray<ValidationError> {
		// We know both inputs are non-empty, so result will be non-empty
		const [first1, ...rest1] = errors1
		const [first2, ...rest2] = errors2
		const allErrors = [first1, ...rest1, first2, ...rest2]

		// Group messages by field using reduce
		const fieldMap = reduce(groupByField)({} as Record<string, Array<string>>)(
			allErrors,
		)

		// Convert back to structured format
		const fields = Object.keys(fieldMap)

		// We know we have at least one field since we started with non-empty inputs
		const [firstField, ...restFields] = fields
		const firstError: ValidationError = {
			field: firstField,
			messages: fieldMap[firstField],
		}

		const restErrors = restFields.map(
			function buildError(field: string): ValidationError {
				return {
					field,
					messages: fieldMap[field],
				}
			},
		)

		return [firstError, ...restErrors]
	}
}

//?? [EXAMPLE] combineErrors([{field: "age", messages: ["too young"]}])([{field: "age", messages: ["not adult"]}])
//?? // [{field: "age", messages: ["too young", "not adult"]}]

//?? [EXAMPLE] combineErrors([{field: "age", messages: ["too young"]}])([{field: "name", messages: ["required"]}])
//?? // [{field: "age", messages: ["too young"]}, {field: "name", messages: ["required"]}]

/*??
 | [EXAMPLE]
 | const ageError = [{field: "age", messages: ["must be 18+"]}]
 | const emailError = [{field: "email", messages: ["invalid format"]}]
 | const nameError = [{field: "name", messages: ["required"]}]
 |
 | const combined1 = combineErrors(ageError)(emailError)
 | // [{field: "age", messages: ["must be 18+"]}, {field: "email", messages: ["invalid format"]}]
 |
 | const duplicateAge = [{field: "age", messages: ["too young"]}]
 | const combined2 = combineErrors(ageError)(duplicateAge)
 | // [{field: "age", messages: ["must be 18+", "too young"]}]
 |
 | [PRO] Accumulates all error messages for the same field
 | [PRO] Preserves field grouping for better error reporting
 | [PRO] Follows semigroup laws (associative operation)
 |
 | [GOTCHA] Field order in output depends on JavaScript's Object.keys ordering
 | [GOTCHA] Messages are concatenated, not deduplicated
 */
