import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const invert = <T extends Record<string | symbol, Value>>(
	obj: T,
): Record<string, string | symbol> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Swap keys and values using reduce
	return allKeys.reduce(
		(acc, key) => {
			const value = obj[key]
			// Convert value to string to use as key
			const newKey = String(value)
			return { ...acc, [newKey]: key }
		},
		{} as Record<string, string | symbol>,
	)
}

export default invert
