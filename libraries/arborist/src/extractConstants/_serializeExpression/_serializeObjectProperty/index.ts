import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { ConstantExtractionError } from "../../types/errors/index.ts"

import _serializeExpression from "../index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import createError from "@sitebender/artificer/errors/createError/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Serialize an object property node to string (key: value format)
//++ Handles KeyValueProperty nodes from object literals
//++ Returns Result with serialized property or error for invalid structure
//++
//++ @param prop - Object property node
//++ @returns Result<ConstantExtractionError, string>
export default function _serializeObjectProperty(
	prop: unknown,
): Result<ConstantExtractionError, string> {
	const propObj = prop as Record<string, unknown>
	const propType = propObj.type as string | undefined

	if (!propType) {
		const baseError = createError("extractConstants")([])(
			"Object property has no type",
		)("INVALID_ARGUMENT")
		const { context: _unused, ...baseErrorFields } = baseError
		return error({ ...baseErrorFields, kind: "UnsupportedExpressionType" })
	}

	if (isEqual(propType)("KeyValueProperty")) {
		const keyResult = _serializeExpression(propObj.key)

		if (keyResult._tag === "Error") {
			return keyResult
		}

		const valueResult = _serializeExpression(propObj.value)

		if (valueResult._tag === "Error") {
			return valueResult
		}

		return ok(`${keyResult.value}: ${valueResult.value}`)
	}

	// Skip non-KeyValueProperty nodes (e.g., spread properties)
	return ok("")
}
