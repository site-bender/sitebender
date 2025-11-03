//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const endsWith = (searchString: string) => (str: string): boolean =>
	str.endsWith(searchString)

export default endsWith
