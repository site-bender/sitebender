import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const values = <T extends Record<string, Value>>(
	obj: T | null | undefined,
): Array<T[keyof T]> => {
	if (isNullish(obj)) {
		return []
	}

	// Handle primitives
	if (typeof obj !== "object" && typeof obj !== "function") {
		// Strings are special - they return characters
		if (typeof obj === "string") {
			return Array.from(obj) as Array<T[keyof T]>
		}
		return []
	}

	return Object.values(obj) as Array<T[keyof T]>
}

export default values
