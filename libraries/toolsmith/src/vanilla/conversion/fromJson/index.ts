import isNonEmptyString from "../../validation/isNonEmptyString/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function fromJson(json: unknown): unknown {
	// Handle valid string input first (positive logic)
	if (isNonEmptyString(json)) {
		try {
			// TypeScript now knows json is a string
			return JSON.parse(json)
		} catch {
			// Return null for any parsing errors
			return null
		}
	}

	return null
}
