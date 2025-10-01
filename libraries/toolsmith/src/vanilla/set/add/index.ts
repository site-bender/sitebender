import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const add = <T>(
	element: T,
) =>
(
	set: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set([element])
	}

	// Create new Set from original and add element
	const result = new Set(set)
	result.add(element)
	return result
}

export default add
