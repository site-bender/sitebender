//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const deleteKey = <K, V>(key: K) => (map: Map<K, V>): Map<K, V> => {
	const newMap = new Map(map)
	newMap.delete(key)
	return newMap
}

export default deleteKey
