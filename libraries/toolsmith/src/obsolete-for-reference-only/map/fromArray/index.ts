//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const fromArray = <K, V>(
	entries: Array<[K, V]>,
): Map<K, V> => {
	return new Map(entries)
}

export default fromArray
