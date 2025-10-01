import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const mapKeys = <T extends Record<string | symbol, Value>>(
	fn: (key: string | symbol) => string | symbol,
) =>
(
	obj: T,
): Record<string | symbol, Value> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	return [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	].reduce(
		(acc, key) => ({ ...acc, [fn(key)]: obj[key] }),
		{} as Record<string | symbol, Value>,
	)
}

export default mapKeys
