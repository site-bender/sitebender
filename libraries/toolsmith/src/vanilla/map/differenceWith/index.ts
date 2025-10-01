//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const differenceWith = <K, V, K2, V2>(
	equalsFn: (a: K, b: K2) => boolean,
) =>
(subtrahend: Map<K2, V2>) =>
(minuend: Map<K, V>): Map<K, V> => {
	const subtrahendKeys = [...subtrahend.keys()]
	return new Map(
		[...minuend.entries()].filter(
			([key]) => !subtrahendKeys.some((sKey) => equalsFn(key, sKey)),
		),
	)
}

export default differenceWith
