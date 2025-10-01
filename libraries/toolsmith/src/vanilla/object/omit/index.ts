import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const omit = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(obj: T): Omit<T, K> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {} as Omit<T, K>
	}

	return Object.entries(obj).reduce(
		(acc, [key, value]) =>
			!keys.includes(key as K) &&
				Object.prototype.hasOwnProperty.call(obj, key)
				? { ...acc, [key]: value }
				: acc,
		{} as Omit<T, K>,
	)
}

export default omit
