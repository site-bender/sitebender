//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const frequency = <K, V>(map: Map<K, V>): Map<V, number> => {
	return [...map.values()].reduce((freq, value) => {
		freq.set(value, (freq.get(value) ?? 0) + 1)
		return freq
	}, new Map<V, number>())
}

export default frequency
