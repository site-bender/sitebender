import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const has = <T>(
	element: T,
) =>
(
	set: Set<T> | null | undefined,
): boolean => {
	if (isNullish(set) || !(set instanceof Set)) {
		return false
	}

	return set.has(element)
}

export default has
