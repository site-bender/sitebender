//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const intersection =
	<K, V, V2>(second: Map<K, V2>) => (first: Map<K, V>): Map<K, V> =>
		new Map(
			Array.from(first).filter(([key]) => second.has(key)),
		)

export default intersection
