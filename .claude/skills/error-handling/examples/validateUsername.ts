//++ Example: Sequential validation with early returns
//++ Demonstrates fail-fast pattern - stops at first error

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Branded type for valid usernames
type Username = string & { readonly __brand: "Username" }

//++ Validates username with multiple sequential checks
//++ Returns Result - stops at first validation error
export default function validateUsername(
	username: string,
): Result<ValidationError, Username> {
	//++ Check 1: Non-empty (early return if fails)
	if (username.length === 0) {
		return error({
			code: "USERNAME_EMPTY",
			field: "username",
			messages: ["The system needs a username."],
			received: username,
			expected: "Non-empty string",
			suggestion: "Provide a username",
			severity: "requirement",
		})
	}

	//++ Check 2: Minimum length (early return if fails)
	if (username.length < 3) {
		return error({
			code: "USERNAME_TOO_SHORT",
			field: "username",
			messages: ["The system needs a username at least 3 characters long."],
			received: username,
			expected: "At least 3 characters",
			suggestion: `Add ${3 - username.length} more characters`,
			severity: "requirement",
			constraints: {
				minLength: 3,
			},
		})
	}

	//++ Check 3: Maximum length (early return if fails)
	if (username.length > 20) {
		return error({
			code: "USERNAME_TOO_LONG",
			field: "username",
			messages: ["The system needs a username no more than 20 characters long."],
			received: username,
			expected: "At most 20 characters",
			suggestion: `Remove ${username.length - 20} characters`,
			severity: "requirement",
			constraints: {
				maxLength: 20,
			},
		})
	}

	//++ Check 4: Valid characters (early return if fails)
	const validPattern = /^[a-zA-Z0-9_-]+$/
	if (!validPattern.test(username)) {
		return error({
			code: "USERNAME_INVALID_CHARACTERS",
			field: "username",
			messages: [
				"The system needs a username with only letters, numbers, underscores, and hyphens.",
			],
			received: username,
			expected: "Letters, numbers, _, and - only",
			suggestion: "Remove any special characters or spaces",
			severity: "requirement",
			examples: ["john_doe", "user-123", "Alice_2024"],
		})
	}

	//++ All checks passed
	return ok(username as Username)
}

//++ Usage examples:

//++ Success case
const valid = validateUsername("john_doe")
// valid = Ok { _tag: "Ok", value: "john_doe" }

//++ Error case: empty (fails at check 1, doesn't run checks 2-4)
const empty = validateUsername("")
// empty = Error { _tag: "Error", error: { code: "USERNAME_EMPTY", ... } }

//++ Error case: too short (fails at check 2, doesn't run checks 3-4)
const tooShort = validateUsername("ab")
// tooShort = Error { _tag: "Error", error: { code: "USERNAME_TOO_SHORT", ... } }

//++ Error case: invalid characters (fails at check 4)
const invalid = validateUsername("john doe")
// invalid = Error { _tag: "Error", error: { code: "USERNAME_INVALID_CHARACTERS", ... } }
