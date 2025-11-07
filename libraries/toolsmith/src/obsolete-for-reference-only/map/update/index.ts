//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const update =
	<K, V>(key: K) =>
	(updater: (value: V | undefined) => V) =>
	(map: Map<K, V>): Map<K, V> => {
		const result = new Map(map)
		const newValue = updater(map.get(key))
		result.set(key, newValue)
		return result
	}

export default update
