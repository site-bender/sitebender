import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const fromArray = <T>(
	array: ReadonlyArray<T> | null | undefined,
): Set<T> => {
	if (isNullish(array) || !Array.isArray(array)) {
		return new Set()
	}

	return new Set(array)
}

export default fromArray
