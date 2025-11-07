//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const reduce = <K, V, R>(
	reducer: (accumulator: R, value: V, key: K, map: Map<K, V>) => R,
) =>
(initial: R) =>
(map: Map<K, V>): R => {
	return Array.from(map.entries()).reduce(
		(accumulator, [key, value]) => reducer(accumulator, value, key, map),
		initial,
	)
}

export default reduce
