import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toArray = <T>(
	set: Set<T> | null | undefined,
): Array<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return []
	}

	// Using Array.from for optimal performance
	return Array.from(set)
}

export default toArray
