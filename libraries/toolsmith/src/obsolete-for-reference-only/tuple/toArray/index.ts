import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toArray = <T>(
	tuple: ReadonlyArray<T> | null | undefined,
): Array<T> => {
	if (isNullish(tuple) || !Array.isArray(tuple)) {
		return []
	}

	return [...tuple]
}

export default toArray
