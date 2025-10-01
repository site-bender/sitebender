import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const equals = <T extends { equals(other: T): boolean }>(
	first: T | null | undefined,
) =>
(
	second: T | null | undefined,
): boolean => {
	if (isNullish(first) || isNullish(second)) {
		return false
	}

	// Check if both have equals method and are same type
	if (typeof first.equals !== "function") {
		return false
	}

	try {
		// Use Temporal's built-in equals method
		return first.equals(second)
	} catch {
		// Type mismatch or other error
		return false
	}
}

export default equals
