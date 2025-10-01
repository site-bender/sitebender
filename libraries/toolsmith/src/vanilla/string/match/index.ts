//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const match = (pattern: string | RegExp) => (str: string): Array<string> => {
	const regex = typeof pattern === "string" ? new RegExp(pattern, "g") : pattern
	const matches = str.match(regex)
	return matches ?? []
}

export default match
