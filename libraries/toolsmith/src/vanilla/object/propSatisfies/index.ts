import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const propSatisfies = <V>(
	predicate: (value: V) => boolean,
) =>
<K extends string | symbol>(
	key: K,
) =>
<T extends Record<K, unknown>>(
	obj: T,
): boolean => {
	// Handle null/undefined objects
	if (isNullish(obj)) {
		return false
	}

	// Check if property exists
	if (
		!Object.prototype.hasOwnProperty.call(
			obj as object,
			key as string | symbol,
		)
	) {
		return false
	}

	// Test the property value with the predicate
	try {
		return predicate((obj as Record<string | symbol, unknown>)[key] as V)
	} catch {
		// If predicate throws, return false
		return false
	}
}

export default propSatisfies
