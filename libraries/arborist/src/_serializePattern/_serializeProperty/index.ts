import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { FunctionExtractionError } from "../../types/errors/index.ts"

import _serializePattern from "../index.ts"
import isEqual from "@sitebender/toolsmith/predicates/isEqual/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Serialize a property pattern (used in object destructuring)
//++ Returns Result with serialized property or error if structure is invalid
//++
//++ @param prop - Property pattern node
//++ @returns Result<FunctionExtractionError, string>
//++
//++ Error kinds:
//++ - UnsupportedPatternType: property is not a KeyValuePatternProperty
export default function _serializeProperty(
	prop: unknown,
): Result<FunctionExtractionError, string> {
	const propObj = prop as Record<string, unknown>

	if (isEqual(propObj.type)("KeyValuePatternProperty")) {
		const keyResult = _serializePattern(propObj.key)

		if (keyResult._tag === "Error") {
			return keyResult
		}

		const valueResult = _serializePattern(propObj.value)

		if (valueResult._tag === "Error") {
			return valueResult
		}

		return ok(`${keyResult.value}: ${valueResult.value}`)
	}

	return error({
		operation: "extractFunctions",
		kind: "UnsupportedPatternType",
		message: `Expected KeyValuePatternProperty but got ${String(propObj.type)}`,
		code: "INVALID_ARGUMENT",
		args: [],
		timestamp: Date.now(),
	} as FunctionExtractionError)
}
