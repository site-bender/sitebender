import type { Result } from "../../types/fp/result/index.ts"
import type { ValidationError } from "../../types/fp/validation/index.ts"
import type { ErrorNode } from "../../types/index.ts"

import error from "../../monads/result/error/index.ts"
import ok from "../../monads/result/ok/index.ts"
import isErrorNode from "../../predicates/isErrorNode/index.ts"

/*++
 + Gets the code from an ErrorNode with runtime validation
 + Returns Result monad for safety against type assertion bypasses
 + Protects against: {} as ErrorNode, any escapes, JSON parsing, etc.
 + Used when extracting error codes for logging, debugging, error handling
 */
export default function getErrorCode(
	node: ErrorNode,
): Result<ValidationError, string> {
	/*++
	 + [EXCEPTION] Runtime validation despite TypeScript types
	 + Defends against type assertions, any escapes, external data
	 */
	if (!isErrorNode(node)) {
		return error({
			code: "INVALID_ERROR_NODE",
			field: "code",
			messages: ["Node is not an ErrorNode"],
			received: node,
			expected: "ErrorNode with _tag='error'",
			suggestion: "Provide a valid ErrorNode",
			severity: "requirement",
		})
	}

	/*++
	 + [EXCEPTION] Property check approved for validating code exists
	 */
	if (!("code" in node)) {
		return error({
			code: "MISSING_ERROR_CODE",
			field: "code",
			messages: ["ErrorNode missing code property"],
			received: node,
			expected: "ErrorNode with code",
			suggestion: "Add code property to ErrorNode",
			severity: "requirement",
		})
	}

	const errorCode = node.code

	/*++
	 + [EXCEPTION] typeof operator approved for runtime type checking
	 */
	if (typeof errorCode !== "string") {
		return error({
			code: "INVALID_ERROR_CODE_TYPE",
			field: "code",
			messages: ["code must be a string"],
			received: errorCode,
			expected: "string",
			suggestion: "Set code to a string value",
			severity: "requirement",
		})
	}

	return ok(errorCode)
}
