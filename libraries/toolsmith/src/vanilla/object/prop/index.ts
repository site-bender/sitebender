import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const prop = <T extends Record<string | symbol, Value>, K extends keyof T>(
	key: K,
) =>
(
	obj: T,
): T[K] | undefined => {
	// Handle null/undefined objects
	if (isNullish(obj)) {
		return undefined
	}

	// Return the property value
	return obj[key]
}

export default prop
