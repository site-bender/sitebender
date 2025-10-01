import type { Value } from "../../../types/index.ts"

import pick from "../pick/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const project = <T extends Record<string | symbol, Value>, K extends keyof T>(
	keys: Array<K>,
) =>
(
	array: Array<T>,
): Array<Pick<T, K>> => {
	// Handle null/undefined array
	if (!array || !Array.isArray(array)) {
		return []
	}

	// Apply pick to each element
	const pickKeys = pick(keys.map(String))
	return array.map((item) => pickKeys(item) as Pick<T, K>)
}

export default project
