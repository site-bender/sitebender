//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const intersectionWith = <K, V, K2, V2>(
	equalsFn: (a: K, b: K2) => boolean,
) =>
(second: Map<K2, V2>) =>
(first: Map<K, V>): Map<K, V> =>
	new Map(
		Array.from(first).filter(([key]) =>
			Array.from(second.keys()).some((secondKey) => equalsFn(key, secondKey))
		),
	)

export default intersectionWith
