import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ConstantExtractionError } from "../../types/errors/index.ts"

import _serializeExpression from "../index.ts"

//++ Serialize a call expression argument node to string
//++ Handles ExpressionStatement wrappers and spread arguments
//++ Returns Result with serialized argument or error for invalid structure
//++
//++ @param arg - Call argument node
//++ @returns Result<ConstantExtractionError, string>
export default function _serializeCallArgument(
	arg: unknown,
): Result<ConstantExtractionError, string> {
	const argObj = arg as Record<string, unknown>

	// Handle ExpressionStatement wrapper
	if (argObj.expression) {
		return _serializeExpression(argObj.expression)
	}

	return _serializeExpression(argObj)
}
