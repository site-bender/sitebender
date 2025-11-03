//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const values = <K, V>(map: Map<K, V>): Array<V> => {
	return Array.from(map.values())
}

export default values
