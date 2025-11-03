import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const propEq = <K extends string | symbol, V>(
	key: K,
) =>
(
	value: V,
) =>
<T extends Record<K, unknown>>(
	obj: T,
): boolean => {
	// Handle null/undefined objects
	if (isNullish(obj)) {
		return undefined === value
	}

	// Strict equality check
	return (obj as Record<string | symbol, unknown>)[key] === value
}

export default propEq
