import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const props = <K extends Array<string | symbol>>(
	keys: K,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Array<Value | undefined> => {
	// Handle null/undefined objects
	if (isNullish(obj)) {
		return keys.map(() => undefined)
	}

	// Extract each property value
	return keys.map((key) => obj[key])
}

export default props
