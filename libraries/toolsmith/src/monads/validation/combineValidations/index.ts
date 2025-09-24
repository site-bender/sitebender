import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/ValidationError/index.ts"
import type { ValidationResult } from "../../../types/ValidationResult/index.ts"

import reduce from "../../../vanilla/array/reduce/index.ts"
import invalid from "../invalid/index.ts"
import isValid from "../isValid/index.ts"
import valid from "../valid/index.ts"
import accumulateErrors from "./accumulateErrors/index.ts"

//++ Combines multiple validation results, accumulating all errors
export default function combineValidations<T>(
	validations: NonEmptyArray<ValidationResult<T>>,
): ValidationResult<T> {
	const result = reduce(accumulateErrors)({
		errors: [] as Array<ValidationError>,
		lastValidValue: undefined as T | undefined,
	})(validations)

	if (result.errors.length > 0) {
		// We know errors is non-empty if length > 0
		const [firstError, ...restErrors] = result.errors

		return invalid(
			[firstError, ...restErrors] as NonEmptyArray<ValidationError>,
		)
	}

	// Since we have NonEmptyArray, we must have at least one validation
	// If no errors, at least one must be valid
	if (result.lastValidValue !== undefined) {
		return valid(result.lastValidValue)
	}

	// Check the first validation - if it's valid, use it
	const [firstValidation] = validations
	if (isValid(firstValidation)) {
		return firstValidation
	}

	// This should be unreachable with proper NonEmptyArray
	// but TypeScript needs exhaustive handling
	return invalid([{
		field: "validation",
		messages: ["No valid value found"],
	}] as NonEmptyArray<ValidationError>)
}

//?? [EXAMPLE] combineValidations([valid(42), valid(100)]) // valid(100) - last valid wins
//?? [EXAMPLE] combineValidations([invalid([{field: "x", messages: ["error"]}]), valid(42)]) // valid(42)
//?? [EXAMPLE] combineValidations([invalid([{field: "x", messages: ["e1"]}]), invalid([{field: "y", messages: ["e2"]}])])
//?? // invalid([{field: "x", messages: ["e1"]}, {field: "y", messages: ["e2"]}])

/*??
 | [EXAMPLE]
 | const validations = [
 |   valid(10),
 |   invalid([{field: "age", messages: ["too young"]}]),
 |   valid(20),
 |   invalid([{field: "name", messages: ["required"]}])
 | ]
 |
 | combineValidations(validations)
 | // invalid([
 | //   {field: "age", messages: ["too young"]},
 | //   {field: "name", messages: ["required"]}
 | // ])
 |
 | const allValid = [valid(1), valid(2), valid(3)]
 | combineValidations(allValid)  // valid(3) - last one wins
 |
 | [PRO] Accumulates all errors from multiple validations
 | [PRO] Useful for combining multiple field validations
 | [PRO] Returns last valid value if any validations succeed
 |
 | [GOTCHA] Last valid value wins, not first
 | [GOTCHA] All errors are accumulated, even if some validations pass
 */
