import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const pick = <T extends Record<string, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(obj: T): Pick<T, K> => {
	// Handle null/undefined gracefully
	if (!obj || typeof obj !== "object") {
		return {} as Pick<T, K>
	}

	// Build result with only specified keys using reduce
	return keys.reduce((acc, key) => {
		if (Object.prototype.hasOwnProperty.call(obj, key as string)) {
			return {
				...acc,
				[key as string]: obj[key],
			}
		}
		return acc
	}, {} as Pick<T, K>)
}

export default pick
