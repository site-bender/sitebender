import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"
import isEmpty from "@sitebender/toolsmith/string/isEmpty/index.ts"
import isNotEmpty from "@sitebender/toolsmith/string/isNotEmpty/index.ts"
import isEmptyArray from "@sitebender/toolsmith/array/isEmpty/index.ts"

// For this example only: actual type would be in a types folder and imported
type UserData = {
	username: string
	email: string
	roles: ReadonlyArray<string>
}

/*++
 + Example: Comprehensive validation using multiple operator substitutions
 + Demonstrates how these patterns work together for readable validation logic
 */
export default function validateUserData(
	data: UserData,
): Result<ValidationError, UserData> {
	/*++
	 + Using `isEmpty` instead of .length === 0
	 + Reads clearly: "if is empty username"
	 */
	if (isEmpty(data.username)) {
		return error({
			code: "USERNAME_REQUIRED",
			field: "username",
			messages: ["Username cannot be empty"],
			received: data.username as never,
			expected: "non-empty string",
			suggestion: "Provide a username",
			severity: "requirement",
		})
	}

	/*++
	 + Using `isEmpty` for email validation
	 + Clear intent without checking .length
	 */
	if (isEmpty(data.email)) {
		return error({
			code: "EMAIL_REQUIRED",
			field: "email",
			messages: ["Email cannot be empty"],
			received: data.email as never,
			expected: "non-empty string",
			suggestion: "Provide an email address",
			severity: "requirement",
		})
	}

	/*++
	 + Using `isEmptyArray` instead of .length === 0
	 + Reads as: "if is empty roles array"
	 */
	if (isEmptyArray(data.roles)) {
		return error({
			code: "ROLES_REQUIRED",
			field: "roles",
			messages: ["User must have at least one role"],
			received: data.roles as never,
			expected: "non-empty array",
			suggestion: "Assign at least one role",
			severity: "requirement",
		})
	}

	/*++
	 + Using `and` to combine boolean conditions
	 + Reads as: "username is not empty and email is not empty"
	 */
	const hasRequiredFields = and(
		isNotEmpty(data.username),
	)(
		isNotEmpty(data.email),
	)

	/*++
	 + Using `not` instead of ! operator
	 + Reads as: "if not has required fields"
	 */
	if (not(hasRequiredFields)) {
		return error({
			code: "MISSING_FIELDS",
			field: "data",
			messages: ["Required fields are missing"],
			received: data as never,
			expected: "complete user data",
			suggestion: "Provide username and email",
			severity: "requirement",
		})
	}

	// Happy path: all validations passed
	return ok(data)
}
