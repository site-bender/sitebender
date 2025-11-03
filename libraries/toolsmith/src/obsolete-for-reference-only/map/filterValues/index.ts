//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const filterValues = <K, V>(
	predicate: (value: V) => boolean,
) =>
(map: Map<K, V>): Map<K, V> => {
	return new Map(
		[...map.entries()].filter(([, value]) => predicate(value)),
	)
}

export default filterValues
