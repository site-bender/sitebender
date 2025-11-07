import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const map = <T, U>(fn: (value: T) => U) =>
(
	set: Set<T> | null | undefined,
): Set<U> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set<U>()
	}
	// Functional, no loops: map values during Array.from and build a new Set
	return new Set<U>(Array.from(set, fn))
}

export default map
