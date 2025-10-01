import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const first = <T>(
	tuple: ReadonlyArray<T> | null | undefined,
): T | null => {
	if (isNullish(tuple) || !Array.isArray(tuple) || tuple.length === 0) {
		return null
	}

	return tuple[0]
}

export default first
