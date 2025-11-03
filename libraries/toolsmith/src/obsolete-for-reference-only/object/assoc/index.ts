import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const assoc = <K extends string | symbol, V extends Value>(
	key: K,
) =>
(
	value: V,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): T & Record<K, V> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return { [key]: value } as T & Record<K, V>
	}

	// Create shallow clone with new/updated property
	return {
		...obj,
		[key]: value,
	} as T & Record<K, V>
}

export default assoc
