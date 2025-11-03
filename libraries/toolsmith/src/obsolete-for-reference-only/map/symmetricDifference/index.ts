//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const symmetricDifference =
	<K, V>(map1: Map<K, V>) => (map2: Map<K, V>): Map<K, V> =>
		new Map([
			...Array.from(map1).filter(([key]) => !map2.has(key)),
			...Array.from(map2).filter(([key]) => !map1.has(key)),
		])

export default symmetricDifference
