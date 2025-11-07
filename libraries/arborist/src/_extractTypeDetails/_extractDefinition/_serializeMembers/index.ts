import type { Result } from "@sitebender/toolsmith/types/result/index.ts"
import type { TypeExtractionError } from "../../../types/errors/index.ts"
import type { TsTypeElement } from "../../../types/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import _serializeMember from "../_serializeMember/index.ts"

//++ Reducer function to serialize interface members into array of strings
//++ Filters out empty serializations
//++ Handles Result from _serializeMember with fail-fast error propagation
//++ Note: This function is NOT curried because it's designed for use with reduce
//++
//++ @param accResult - Accumulated Result of serialized members
//++ @param member - Current member to serialize
//++ @returns Result<TypeExtractionError, ReadonlyArray<string>>
export default function _serializeMembers(
	accResult: Result<TypeExtractionError, ReadonlyArray<string>>,
	member: TsTypeElement,
): Result<TypeExtractionError, ReadonlyArray<string>> {
	if (accResult._tag === "Error") {
		return accResult
	}

	const serializedResult = _serializeMember(member)

	if (serializedResult._tag === "Error") {
		return serializedResult
	}

	// Skip empty strings (non-supported member types)
	if (serializedResult.value === "") {
		return accResult
	}

	return ok([...accResult.value, serializedResult.value])
}
