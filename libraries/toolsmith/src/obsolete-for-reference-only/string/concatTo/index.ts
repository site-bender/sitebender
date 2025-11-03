//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const concatTo = (toAppend: string) => (baseString: string): string =>
	baseString.concat(toAppend)

export default concatTo
