//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const frequency = <T>(obj: Record<string, T>): Map<T, number> => {
	return Object.values(obj).reduce((freq, value) => {
		freq.set(value, (freq.get(value) ?? 0) + 1)
		return freq
	}, new Map<T, number>())
}

export default frequency
