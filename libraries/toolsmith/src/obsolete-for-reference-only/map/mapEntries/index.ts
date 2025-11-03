//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const mapEntries = <K, V, NK, NV>(
	fn: (entry: [K, V]) => [NK, NV],
) =>
(map: Map<K, V>): Map<NK, NV> =>
	new Map(
		Array.from(map).map(fn),
	)

export default mapEntries
