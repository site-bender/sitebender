//++ Example: Chaining Results for sequential operations
//++ Demonstrates fail-fast chaining - short-circuits on first error

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import chain from "@sitebender/toolsmith/monads/result/chain/index.ts"

type UserId = string & { readonly __brand: "UserId" }
type User = { readonly id: UserId; readonly name: string; readonly active: boolean }
type ProcessedUser = { readonly id: UserId; readonly displayName: string }

//++ Processes user data through multiple sequential operations
//++ Each step depends on previous step succeeding
//++ Short-circuits on first error
export default function processUserData(
	id: string,
): Result<ValidationError, ProcessedUser> {
	//++ Step 1: Parse and validate user ID
	const userIdResult = _parseUserId(id)

	//++ Step 2: Fetch user data (only if step 1 succeeded)
	//++ chain unwraps Ok value and passes to next function
	//++ If Error, skips this step and passes Error through
	const userResult = chain(_fetchUser)(userIdResult)

	//++ Step 3: Validate user is active (only if step 2 succeeded)
	const validatedResult = chain(_validateUserActive)(userResult)

	//++ Step 4: Transform to processed format (only if step 3 succeeded)
	const processedResult = chain(_transformToProcessed)(validatedResult)

	return processedResult
}

//++ Helper: Parse user ID from string
function _parseUserId(id: string): Result<ValidationError, UserId> {
	const uuidPattern =
		/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

	if (uuidPattern.test(id)) {
		return ok(id as UserId)
	}

	return error({
		code: "USER_ID_INVALID_FORMAT",
		field: "userId",
		messages: ["The system needs a valid UUID user ID."],
		received: id,
		expected: "UUID format (8-4-4-4-12 hexadecimal)",
		suggestion: "Provide a valid UUID like 550e8400-e29b-41d4-a716-446655440000",
		severity: "requirement",
		examples: ["550e8400-e29b-41d4-a716-446655440000"],
	})
}

//++ Helper: Fetch user from database (simulated)
function _fetchUser(userId: UserId): Result<ValidationError, User> {
	//++ [IO] In real implementation, this would query database
	//++ For demo, simulate database lookup
	const mockDatabase: Record<string, User> = {
		"550e8400-e29b-41d4-a716-446655440000": {
			id: "550e8400-e29b-41d4-a716-446655440000" as UserId,
			name: "John Doe",
			active: true,
		},
	}

	const user = mockDatabase[userId]

	if (user) {
		return ok(user)
	}

	return error({
		code: "USER_NOT_FOUND",
		field: "userId",
		messages: ["The system could not find a user with that ID."],
		received: userId,
		expected: "Existing user ID",
		suggestion: "Check that the user ID is correct and the user exists",
		severity: "requirement",
	})
}

//++ Helper: Validate user is active
function _validateUserActive(user: User): Result<ValidationError, User> {
	if (user.active) {
		return ok(user)
	}

	return error({
		code: "USER_NOT_ACTIVE",
		field: "userId",
		messages: ["The system cannot process inactive users."],
		received: user.id,
		expected: "Active user",
		suggestion: "Activate the user account first",
		severity: "requirement",
	})
}

//++ Helper: Transform to processed format
function _transformToProcessed(
	user: User,
): Result<ValidationError, ProcessedUser> {
	return ok({
		id: user.id,
		displayName: user.name.toUpperCase(),
	})
}

//++ Usage examples:

//++ Success case: valid ID, user exists, is active
const success1 = processUserData("550e8400-e29b-41d4-a716-446655440000")
// success1 = Ok {
//   _tag: "Ok",
//   value: { id: "550e8400...", displayName: "JOHN DOE" }
// }

//++ Error case: invalid UUID (fails at step 1, skips steps 2-4)
const error1 = processUserData("not-a-uuid")
// error1 = Error {
//   _tag: "Error",
//   error: { code: "USER_ID_INVALID_FORMAT", ... }
// }
// Steps 2-4 never executed

//++ Error case: valid UUID but user not found (fails at step 2, skips steps 3-4)
const error2 = processUserData("123e4567-e89b-12d3-a456-426614174000")
// error2 = Error {
//   _tag: "Error",
//   error: { code: "USER_NOT_FOUND", ... }
// }
// Steps 3-4 never executed

//++ This demonstrates fail-fast behavior:
//++ Each operation only runs if previous operation succeeded
//++ First error short-circuits the entire chain
//++ Compare with Validation monad which would collect all errors
