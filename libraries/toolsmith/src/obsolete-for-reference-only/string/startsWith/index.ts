//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const startsWith = (searchString: string) => (str: string): boolean =>
	str.startsWith(searchString)

export default startsWith
