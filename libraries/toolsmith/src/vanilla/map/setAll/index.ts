//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const setAll =
	<K, V>(entries: Iterable<[K, V]>) => (map: Map<K, V>): Map<K, V> =>
		new Map([...map, ...entries])

export default setAll
