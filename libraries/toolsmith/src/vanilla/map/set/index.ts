//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const set = <K, V>(key: K) => (value: V) => (map: Map<K, V>): Map<K, V> =>
	new Map([...map, [key, value]])

export default set
