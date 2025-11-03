//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const fromObject = <V>(obj: Record<string, V>): Map<string, V> => {
	return new Map(Object.entries(obj))
}

export default fromObject
