import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

import _validateUuidFormat from "@sitebender/toolsmith/newtypes/stringTypes/uuid/_validateUuidFormat/index.ts"

//++ Type predicate that checks if a string is a valid UUID
export default function isUuid(value: string): value is Uuid {
	const result = _validateUuidFormat(value)
	return result._tag === "Ok"
}
