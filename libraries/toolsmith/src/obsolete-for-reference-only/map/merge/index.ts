//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const merge = <K, V>(...maps: Array<Map<K, V>>): Map<K, V> =>
	maps.reduce((acc, map) => new Map([...acc, ...map]), new Map<K, V>())

export default merge
