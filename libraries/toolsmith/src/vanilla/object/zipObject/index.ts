import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const zipObject = <K extends string | symbol, V extends Value>(
	keys: Array<K>,
) =>
(
	values: Array<V>,
): Record<K, V> => {
	const length = Math.min(keys.length, values.length)

	return keys.slice(0, length).reduce((acc, key, index) => ({
		...acc,
		[key]: values[index],
	}), {} as Record<K, V>)
}

export default zipObject
