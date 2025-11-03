//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const entries = <K, V>(map: Map<K, V>): Array<[K, V]> => {
	return Array.from(map.entries())
}

export default entries
