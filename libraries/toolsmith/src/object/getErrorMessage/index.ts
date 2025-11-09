import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { ErrorNode } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import isErrorNode from "../../predicates/isErrorNode/index.ts"

/*++
 + Gets the message from an ErrorNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as ErrorNode, any escapes, JSON parsing, etc.
 + Used when extracting error messages for logging, debugging, user feedback
 */
export default function getErrorMessage(
	node: ErrorNode,
): Result<ValidationError, string> {
	/*++
	 + [EXCEPTION] Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (!isErrorNode(node)) {
		return error({
			code: "INVALID_ERROR_NODE",
			field: "message",
			messages: ["Node is not an ErrorNode"],
			received: node,
			expected: "ErrorNode with _tag='error'",
			suggestion: "Provide a valid ErrorNode",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Property check approved for validating message exists
	 */
	if (!("message" in node)) {
		return error({
			code: "MISSING_ERROR_MESSAGE",
			field: "message",
			messages: ["ErrorNode missing message property"],
			received: node,
			expected: "ErrorNode with message",
			suggestion: "Add message property to ErrorNode",
			severity: "requirement",
		})
	}

	const errorMessage = node.message

	/*++
	 + [EXCEPTION] typeof operator approved for runtime type checking
	 */
	if (typeof errorMessage !== "string") {
		return error({
			code: "INVALID_ERROR_MESSAGE_TYPE",
			field: "message",
			messages: ["message must be a string"],
			received: errorMessage,
			expected: "string",
			suggestion: "Set message to a string value",
			severity: "requirement",
		})
	}

	return ok(errorMessage)
}
