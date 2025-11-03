//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const partition = <K, V>(
	predicate: (value: V, key: K) => boolean,
) =>
(map: Map<K, V>): [Map<K, V>, Map<K, V>] => {
	const entries = Array.from(map)
	return [
		new Map(entries.filter(([key, value]) => predicate(value, key))),
		new Map(entries.filter(([key, value]) => !predicate(value, key))),
	]
}

export default partition
