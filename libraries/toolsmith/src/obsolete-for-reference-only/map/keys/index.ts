//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const keys = <K, V>(map: Map<K, V>): Array<K> => {
	return Array.from(map.keys())
}

export default keys
