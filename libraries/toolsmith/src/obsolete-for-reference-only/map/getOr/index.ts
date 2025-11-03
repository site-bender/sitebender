//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const getOr = <K, V>(defaultValue: V) => (key: K) => (map: Map<K, V>): V => {
	return map.has(key) ? map.get(key)! : defaultValue
}

export default getOr
