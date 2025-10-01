import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const filter = <T>(
	predicate: (value: T) => boolean,
) =>
(
	set: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set()
	}

	return new Set(Array.from(set).filter(predicate))
}

export default filter
