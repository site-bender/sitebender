//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const clear = <T>(
	_set: Set<T> | null | undefined,
): Set<T> => {
	// Always return a new empty Set
	// The input is only used for type inference
	return new Set<T>()
}

export default clear
