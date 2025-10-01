//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const frequency = <T>(set: Set<T>): Map<T, number> => {
	return new Map(Array.from(set).map((item) => [item, 1]))
}

export default frequency
