import type { Value } from "../../../types/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const objOf = <K extends string | symbol, V extends Value>(
	key: K,
) =>
(
	value: V,
): Record<K, V> => ({
	[key]: value,
} as Record<K, V>)

export default objOf
