//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const split = (separator: string | RegExp) => (str: string): Array<string> =>
	str.split(separator)

export default split
