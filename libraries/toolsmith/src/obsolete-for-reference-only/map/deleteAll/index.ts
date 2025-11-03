//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const deleteAll = <K, V>(keys: Array<K>) => (map: Map<K, V>): Map<K, V> => {
	return keys.reduce((acc, key) => {
		const newMap = new Map(acc)
		newMap.delete(key)
		return newMap
	}, map)
}

export default deleteAll
