//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const get = <K, V>(key: K) => (map: Map<K, V>): V | null => {
	const value = map.get(key)

	return value === undefined ? null : value
}

export default get
