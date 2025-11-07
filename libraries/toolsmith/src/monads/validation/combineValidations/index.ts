import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../../types/fp/validation/index.ts"
import type { ValidationResult } from "../../../types/fp/validation/index.ts"

import reduce from "../../../array/reduce/index.ts"
import failure from "../failure/index.ts"
import isValid from "../isValid/index.ts"
import success from "../success/index.ts"
import accumulateErrors from "./accumulateErrors/index.ts"

//++ Combines multiple validation results, accumulating all errors
export default function combineValidations<T>(
	validations: NonEmptyArray<ValidationResult<T>>,
): ValidationResult<T> {
	const result = reduce(accumulateErrors)({
		errors: [] as Array<ValidationError>,
		lastValidValue: undefined as T | undefined,
	})(validations)

	//++ [EXCEPTION] .length property and > operator permitted in Toolsmith for performance - provides error count checking
	if (result.errors.length > 0) {
		//++ [EXCEPTION] Array destructuring permitted in Toolsmith for performance - provides NonEmptyArray construction
		// We know errors is non-empty if length > 0
		const [firstError, ...restErrors] = result.errors

		return failure(
			[firstError, ...restErrors] as NonEmptyArray<ValidationError>,
		)
	}

	//++ [EXCEPTION] !== operator permitted in Toolsmith for performance - provides undefined checking
	// Since we have NonEmptyArray, we must have at least one validation
	// If no errors, at least one must be valid
	if (result.lastValidValue !== undefined) {
		return success(result.lastValidValue)
	}

	//++ [EXCEPTION] Array destructuring permitted in Toolsmith for performance - provides first element extraction
	// Check the first validation - if it's valid, use it
	const [firstValidation] = validations
	if (isValid(firstValidation)) {
		return firstValidation
	}

	// This should be unreachable with proper NonEmptyArray
	// but TypeScript needs exhaustive handling
	return failure([{
		field: "validation",
		messages: ["No valid value found"],
	}] as NonEmptyArray<ValidationError>)
}
