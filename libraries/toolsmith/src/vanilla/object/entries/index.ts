import type { Value } from "../../../types/index.ts"

import isNullish from "../../validation/isNullish/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const entries = <T extends Record<string, Value>>(
	obj: T | null | undefined,
): Array<[keyof T & string, T[keyof T]]> => {
	if (isNullish(obj)) {
		return []
	}

	// Handle primitives
	if (typeof obj !== "object" && typeof obj !== "function") {
		// Strings are special - they return [index, char] pairs
		if (typeof obj === "string") {
			return Array.from(obj, (char, i) => [String(i), char]) as Array<
				[keyof T & string, T[keyof T]]
			>
		}
		return []
	}

	return Object.entries(obj) as Array<[keyof T & string, T[keyof T]]>
}

export default entries
