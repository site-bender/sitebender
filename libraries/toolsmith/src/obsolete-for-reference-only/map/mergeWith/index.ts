//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const mergeWith = <K, V>(
	mergeFn: (existingValue: V, incomingValue: V) => V,
) =>
(...maps: Array<Map<K, V>>): Map<K, V> =>
	maps.reduce((acc, map) => {
		const entries = Array.from(map).map(([key, value]): [K, V] => [
			key,
			acc.has(key) ? mergeFn(acc.get(key)!, value) : value,
		])
		return new Map([...acc, ...entries])
	}, new Map<K, V>())

export default mergeWith
