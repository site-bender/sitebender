//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const clear = <K = unknown, V = unknown>(): Map<K, V> => {
	return new Map<K, V>()
}

export default clear
