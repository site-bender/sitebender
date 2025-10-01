import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const deleteElement = <T>(
	element: T,
) =>
(
	set: Set<T> | null | undefined,
): Set<T> => {
	if (isNullish(set) || !(set instanceof Set)) {
		return new Set()
	}

	// Create new Set from original and delete element
	const result = new Set(set)
	result.delete(element)
	return result
}

// Note: Named 'deleteElement' instead of 'delete' because 'delete' is a reserved keyword
export default deleteElement
