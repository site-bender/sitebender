//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const get = <K, V>(key: K) => (map: Map<K, V>): V | undefined => {
	return map.get(key)
}

export default get
