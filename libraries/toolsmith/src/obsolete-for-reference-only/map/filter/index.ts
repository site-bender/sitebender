//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const filter = <K, V>(
	predicate: (value: V, key: K) => boolean,
) =>
(map: Map<K, V>): Map<K, V> => {
	return new Map(
		[...map.entries()].filter(([key, value]) => predicate(value, key)),
	)
}

export default filter
