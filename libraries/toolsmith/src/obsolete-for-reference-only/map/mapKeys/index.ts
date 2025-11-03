//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const mapKeys = <K, V, NK>(
	fn: (key: K, value: V) => NK,
) =>
(map: Map<K, V>): Map<NK, V> =>
	new Map(
		Array.from(map).map(([key, value]) => [fn(key, value), value]),
	)

export default mapKeys
