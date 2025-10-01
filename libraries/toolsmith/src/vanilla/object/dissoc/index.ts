import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const dissoc = <K extends string | symbol>(
	key: K,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Omit<T, K> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {} as Omit<T, K>
	}

	// Create a shallow clone without the specified key
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	return allKeys
		.filter((k) => k !== key)
		.reduce(
			(acc, k) => ({ ...acc, [k]: obj[k] }),
			{} as Record<string | symbol, Value>,
		) as Omit<T, K>
}

export default dissoc
