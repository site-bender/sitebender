import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const keys = <T extends object>(
	obj: T | null | undefined,
): Array<keyof T & string> => {
	if (isNullish(obj)) {
		return []
	}

	// Handle primitives
	if (typeof obj !== "object" && typeof obj !== "function") {
		// Strings are special - they have enumerable indices
		if (typeof obj === "string") {
			return Array.from(
				{ length: (obj as string).length },
				(_, i) => String(i),
			) as Array<keyof T & string>
		}
		return []
	}

	return Object.keys(obj) as Array<keyof T & string>
}

export default keys
