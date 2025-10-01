import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const pickBy = <T extends Record<string | symbol, Value>>(
	predicate: (value: Value, key: string | symbol) => boolean,
) =>
(
	obj: T,
): Partial<T> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Filter properties based on predicate using reduce (pure FP)
	return allKeys.reduce((acc, key) => {
		const value = obj[key as keyof T]
		return predicate(value, key) ? { ...acc, [key]: value } : acc
	}, {} as Partial<T>)
}

export default pickBy
