//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const groupBy = <K, V, G>(
	keyFn: (value: V, key: K) => G,
) =>
(map: Map<K, V>): Map<G, Map<K, V>> => {
	return [...map.entries()].reduce((groups, [key, value]) => {
		const groupKey = keyFn(value, key)
		const existing = groups.get(groupKey) || new Map<K, V>()
		existing.set(key, value)
		groups.set(groupKey, existing)
		return groups
	}, new Map<G, Map<K, V>>())
}

export default groupBy
