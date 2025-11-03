import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toPairs = <T extends Record<string | symbol, Value>>(
	obj: T,
): Array<[string | symbol, Value]> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return []
	}

	// Get string keys
	const stringPairs = Object.entries(obj) as Array<[string, Value]>

	// Get symbol keys and their values
	const symbolPairs = Object.getOwnPropertySymbols(obj)
		.map((sym) => [sym, obj[sym]] as [symbol, Value])

	// Combine string and symbol pairs
	return [...stringPairs, ...symbolPairs]
}

export default toPairs
