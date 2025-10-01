import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const reject = <T extends Record<string | symbol, Value>>(
	predicate: (value: Value, key: string | symbol) => boolean,
) =>
(
	obj: T,
): Partial<T> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {}
	}

	// Filter entries where predicate returns false
	return Object.fromEntries(
		Object.entries(obj).filter(([key, value]) => !predicate(value, key)),
	) as Partial<T>
}

export default reject
