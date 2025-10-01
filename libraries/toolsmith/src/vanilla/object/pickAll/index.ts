import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const pickAll = <K extends string | symbol>(
	keys: Array<K>,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Record<K, Value | undefined> => {
	// Handle null/undefined gracefully
	const source = (!obj || typeof obj !== "object") ? {} : obj

	// Build result with all specified keys
	return keys.reduce((acc, key) => {
		// Always include the key, even if undefined
		return {
			...acc,
			[key]: source[key as keyof typeof source],
		}
	}, {} as Record<K, Value | undefined>)
}

export default pickAll
