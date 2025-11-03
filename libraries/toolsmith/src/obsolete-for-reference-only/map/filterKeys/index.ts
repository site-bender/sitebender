//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const filterKeys = <K, V>(
	predicate: (key: K) => boolean,
) =>
(map: Map<K, V>): Map<K, V> => {
	return new Map(
		[...map.entries()].filter(([key]) => predicate(key)),
	)
}

export default filterKeys
