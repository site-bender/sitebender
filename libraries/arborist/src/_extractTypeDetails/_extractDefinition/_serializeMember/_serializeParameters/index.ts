import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../../../../types/errors/index.ts"
import type { SwcFnParam } from "../../../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _serializeParameter from "../../_serializeParameter/index.ts"

//++ Reducer function to serialize parameters into array of strings
//++ Handles Result from _serializeParameter with fail-fast error propagation
//++ Note: This function is NOT curried because it's designed for use with reduce
//++
//++ @param accResult - Accumulated Result of serialized parameters
//++ @param param - Current parameter to serialize
//++ @returns Result<TypeExtractionError, ReadonlyArray<string>>
export default function _serializeParameters(
	accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
	param: SwcFnParam,
): Result<TypeExtractionError, ReadonlyArray<string>> {
	if (accResult._tag === "Error") {
		return accResult
	}

	const paramResult = _serializeParameter(param)

	if (paramResult._tag === "Error") {
		return paramResult
	}

	return ok([...accResult.value, paramResult.value])
}
