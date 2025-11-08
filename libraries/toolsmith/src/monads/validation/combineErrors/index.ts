import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"

import reduce from "../../../array/reduce/index.ts"
import groupByField from "./groupByField/index.ts"

//++ Combines validation errors using semigroup principles, grouping messages by field
export default function combineErrors<E>(
	errors1: NonEmptyArray<E>,
) {
	return function withSecondErrors(
		errors2: NonEmptyArray<E>,
	): NonEmptyArray<E> {
		//++ [EXCEPTION] Array destructuring and spread operator permitted in Toolsmith for performance - provides validation error combining
		// We know both inputs are non-empty, so result will be non-empty
		const [first1, ...rest1] = errors1
		const [first2, ...rest2] = errors2
		const allErrors = [first1, ...rest1, first2, ...rest2]

		// Group messages by field using reduce
		const fieldMap = reduce(groupByField)({} as Record<string, Array<string>>)(
			allErrors,
		)

		//++ [EXCEPTION] Object.keys() permitted in Toolsmith for performance - provides field extraction for error grouping
		// Convert back to structured format
		const fields = Object.keys(fieldMap)

		//++ [EXCEPTION] Array destructuring permitted in Toolsmith for performance - provides NonEmptyArray construction
		// We know we have at least one field since we started with non-empty inputs
		const [firstField, ...restFields] = fields
		const firstError: E = {
			field: firstField,
			messages: fieldMap[firstField],
		} as E

		//++ [EXCEPTION] .map() method permitted in Toolsmith for performance - provides error transformation
		const restErrors = restFields.map(
			function buildError(field: string): E {
				return {
					field,
					messages: fieldMap[field],
				} as E
			},
		)

		return [firstError, ...restErrors]
	}
}
