//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const difference =
	<K, V, V2>(subtrahend: Map<K, V2>) => (minuend: Map<K, V>): Map<K, V> => {
		return new Map(
			[...minuend.entries()].filter(([key]) => !subtrahend.has(key)),
		)
	}

export default difference
