import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const modify = <K extends string | symbol, V extends Value, R extends Value>(
	prop: K,
) =>
(
	fn: (value: V) => R,
) =>
<T extends Record<string | symbol, Value>>(
	obj: T,
): T & Record<K, R> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return { [prop]: fn(undefined as unknown as V) } as T & Record<K, R>
	}

	// Get current value (may be undefined)
	const currentValue = obj[prop] as unknown as V

	// Apply transformation and create new object
	return {
		...obj,
		[prop]: fn(currentValue),
	} as T & Record<K, R>
}

export default modify
