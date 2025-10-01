import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const invertBy = <R extends Value>(
	fn: (keys: Array<string | symbol>) => R,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): Record<string, R> => {
	// Handle null/undefined
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Get all keys including symbols
	const allKeys = [
		...Object.keys(obj),
		...Object.getOwnPropertySymbols(obj),
	]

	// Group keys by their stringified values
	const groups = allKeys.reduce<Record<string, Array<string | symbol>>>(
		(acc, key) => {
			const value = obj[key]
			const valueKey = String(value)
			return {
				...acc,
				[valueKey]: [...(acc[valueKey] || []), key],
			}
		},
		{},
	)

	// Apply the grouping function to each group
	return Object.entries(groups).reduce<Record<string, R>>(
		(acc, [valueKey, keys]) => ({
			...acc,
			[valueKey]: fn(keys),
		}),
		{},
	)
}

export default invertBy
