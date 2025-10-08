import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/validation/index.ts"
import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeUuid from "@sitebender/toolsmith/newtypes/stringTypes/uuid/unsafeUuid/index.ts"
import _validateUuidFormat from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_validateUuidFormat/index.ts"
import _normalizeUuid from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_normalizeUuid/index.ts"

//++ Smart constructor that validates and creates a Uuid value
//++ Validates RFC 4122 format (8-4-4-4-12), normalizes to canonical lowercase form
//++ Accepts all UUID versions (v1, v4, v5, etc.)
export default function uuid(
	value: string,
): Result<ValidationError, Uuid> {
	const formatResult = _validateUuidFormat(value)
	if (formatResult._tag === "Error") {
		return formatResult
	}

	const normalized = _normalizeUuid(value)
	return ok(unsafeUuid(normalized))
}
