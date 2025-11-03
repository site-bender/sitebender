//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const splitEvery = (n: number) => (str: string): Array<string> => {
	if (n <= 0 || str.length === 0) return []

	// Use recursion to build chunks array
	const buildChunks = (remaining: string): Array<string> => {
		if (remaining.length === 0) return []

		const chunk = remaining.slice(0, n)
		const rest = remaining.slice(n)

		return [chunk, ...buildChunks(rest)]
	}

	return buildChunks(str)
}

export default splitEvery
