import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const compare = <
	T extends {
		compare(other: T): number
	},
>(first: T | null | undefined) =>
(second: T | null | undefined): number | null => {
	if (isNullish(first) || isNullish(second)) {
		return null
	}

	// Ensure both parameters have a compare method
	if (typeof first.compare !== "function") {
		return null
	}

	try {
		// Use Temporal's built-in compare method
		return first.compare(second)
	} catch {
		return null
	}
}

export default compare
