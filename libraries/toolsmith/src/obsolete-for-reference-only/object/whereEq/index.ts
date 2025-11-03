import type { Value } from "../../../types/index.ts"

import isEmpty from "../../validation/isEmpty/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const whereEq = <S extends Record<string, Value>>(
	spec: S,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): boolean => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		// Check if spec is empty
		return isEmpty(spec)
	}

	// Check each property in the spec
	return Object.keys(spec).every((key) => obj[key] === spec[key])
}

export default whereEq
