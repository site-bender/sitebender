import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toPairsIn = <T extends Record<string | symbol, Value>>(
	obj: T,
): Array<[string | symbol, Value]> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return []
	}

	// Get all enumerable properties including inherited ones using recursive approach
	const getAllKeys = (o: unknown): Array<string> => {
		if (!o || o === Object.prototype) return []
		const obj = o as Record<string, unknown>
		const proto = Object.getPrototypeOf(obj)
		const protoKeys = proto ? getAllKeys(proto) : []
		const ownKeys = Object.keys(obj)
		return [...new Set([...ownKeys, ...protoKeys])]
	}

	const keys = getAllKeys(obj)

	// Map keys to pairs
	const pairs = keys.map((key) => [key, obj[key]] as [string, Value])

	// Get own symbol properties (symbols are not inherited)
	const symbolPairs = Object.getOwnPropertySymbols(obj)
		.map((sym) => [sym, obj[sym]] as [symbol, Value])

	// Combine regular and symbol pairs
	return [...pairs, ...symbolPairs]
}

export default toPairsIn
