import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ConstantExtractionError } from "../../types/errors/index.ts"

import _serializeExpression from "../index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ Serialize an array element node to string
//++ Handles null elements (holes in arrays) and ExpressionStatement wrappers
//++ Returns Result with serialized element or empty string for null elements
//++
//++ @param elem - Array element node
//++ @returns Result<ConstantExtractionError, string>
export default function _serializeArrayElement(
	elem: unknown,
): Result<ConstantExtractionError, string> {
	if (!elem) {
		// Null element (array hole)
		return ok("")
	}

	const elemObj = elem as Record<string, unknown>

	// Handle ExpressionStatement wrapper
	if (elemObj.expression) {
		return _serializeExpression(elemObj.expression)
	}

	return _serializeExpression(elemObj)
}
