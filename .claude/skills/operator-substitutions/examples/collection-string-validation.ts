import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import isNotEmpty from "@sitebender/toolsmith/string/isNotEmpty/index.ts"

/*++
 + Example: Using string isNotEmpty instead of .length checks
 + Demonstrates readable string validation with happy path first
 */
export default function validateUsername(
	username: string,
): Result<ValidationError, string> {
	/*++
	 + Happy path first: check if username has content
	 + Reads as: "if is not empty username"
	 + Compare to: if (username.length > 0) or if (username !== "")
	 */
	if (isNotEmpty(username)) {
		return ok(username)
	}

	// Sad path: username is empty
	return error({
		code: "USERNAME_REQUIRED",
		field: "username",
		messages: ["Username is required"],
		received: username as never,
		expected: "non-empty string",
		suggestion: "Provide a username",
		severity: "requirement",
	})
}
