//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const has = <K, V>(key: K) => (map: Map<K, V>): boolean => {
	return map.has(key)
}

export default has
