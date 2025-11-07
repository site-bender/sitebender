//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const map = <K, V, R>(
	fn: (value: V, key: K) => R,
) =>
(map: Map<K, V>): Map<K, R> =>
	new Map(
		Array.from(map).map(([key, value]) => [key, fn(value, key)]),
	)

export default map
